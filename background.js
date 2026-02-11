// Initialize state
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.session.set({ tabsState: {} });
});

// Cache to prevent race conditions and duplicate triggers
// { [tabId]: "videoId" }
let processingVideoIds = {};

// Helper to extract Video ID from URL
function getVideoId(url) {
  try {
    if (!url || !url.includes("youtube.com/watch")) return null;
    const urlObj = new URL(url);
    return urlObj.searchParams.get("v");
  } catch (e) {
    return null;
  }
}

function sendMessageWithRetry(tabId, message, maxRetries = 10, interval = 500) {
  let retries = 0;
  function attempt() {
    chrome.tabs.sendMessage(tabId, message)
      .then(() => { }) // Success
      .catch((err) => {
        retries++;
        if (retries < maxRetries) {
          setTimeout(attempt, interval);
        }
      });
  }
  attempt();
}

// Function to handle navigation events
function handleNavigation(details) {
  if (details.frameId !== 0) return; // Main frame only

  const tabId = details.tabId;
  const currentVideoId = getVideoId(details.url);

  // If we are not on a video, we might want to clear the "processing" state 
  // so if we return to it properly it counts? 
  // But strictly, we only care if we move TO a video.

  if (!currentVideoId) {
    // User performed navigation to non-video page (e.g. Home).
    // We should update storage so the chain is broken.
    delete processingVideoIds[tabId];
    chrome.storage.session.get(["tabsState"], (result) => {
      let tabsState = result.tabsState || {};
      if (tabsState[tabId]) {
        delete tabsState[tabId];
        chrome.storage.session.set({ tabsState });
      }
    });
    return;
  }

  // RACE CONDITION GUARD:
  // If we have already started processing this specific video ID for this tab, 
  // ignore subsequent navigation events (like history updates) for the same ID.
  if (processingVideoIds[tabId] === currentVideoId) {
    return;
  }

  // Lock this ID immediately
  processingVideoIds[tabId] = currentVideoId;

  // Now check against persistent storage (the "PREVIOUS" video)
  chrome.storage.session.get(["tabsState"], (result) => {
    let tabsState = result.tabsState || {};
    let previousVideoId = tabsState[tabId];

    // LOGIC:
    // If we had a previous video recorded, AND it's different from current one... TRIGGER.
    // NOTE: This means the FIRST video you watch in a session is "free". 
    // The prompt says "everytime I watch a second youtube video in a row".
    if (previousVideoId && previousVideoId !== currentVideoId) {
      console.log(`Binge Trigger: ${previousVideoId} -> ${currentVideoId}`);
      sendMessageWithRetry(tabId, { action: "CHECK_CONFIRMATION" });
    }

    // Update persistent state
    tabsState[tabId] = currentVideoId;
    chrome.storage.session.set({ tabsState });
  });
}

// Listen for standard navigation
chrome.webNavigation.onCommitted.addListener(handleNavigation);

// Listen for History API updates (YouTube is a Single Page App, so it uses this heavily)
chrome.webNavigation.onHistoryStateUpdated.addListener(handleNavigation);

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "CLOSE_TAB" && sender.tab) {
    chrome.tabs.remove(sender.tab.id);
  }
});