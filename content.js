const quotes = [
    "\"Discipline is choosing between what you want now and what you want most.\"",
    "\"Your future self is watching you right now through memories. Make them proud.\"",
    "\"The cost of procrastination is the life you could have lived.\"",
    "\"Amateurs sit and wait for inspiration, the rest of us just get up and go to work.\"",
    "\"Is this video adding value to your life, or just passing time?\"",
    "\"You told yourself you'd do better today. Prove it.\"",
    "\"Success is the sum of small efforts, repeated day in and day out.\""
];

let overlayActive = false;
let forcePauseInterval = null;
let approvedVideoId = null; // Track which video ID the user has already approved

// Helper to extract Video ID from URL (client-side)
function getClientVideoId() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('v');
    } catch (e) {
        return null;
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "LOG") {
        console.log("[YT-Stopper-BG]", request.message);
    }

    if (request.action === "CHECK_CONFIRMATION") {
        const currentId = getClientVideoId();

        console.log(`[YT-Stopper] content received check. Current: ${currentId}, Approved: ${approvedVideoId}`);

        // CRITICAL FIX: If we already approved this specific video ID, ignore the check.
        if (currentId && approvedVideoId === currentId) {
            console.log("[YT-Stopper] Already approved this video. Ignoring.");
            return;
        }

        showOverlay();
    }
    // Return true for async response if needed (not needed strictly here but good practice)
    return true;
});

function showOverlay() {
    // 1. Check if overlay already exists
    if (document.getElementById('yt-stopper-overlay')) return;

    overlayActive = true;

    // 2. Pause the video and keep it paused
    const videoElement = document.querySelector('video');
    if (videoElement) videoElement.pause();

    // Force exit fullscreen to ensure overlay is seen and break immersion
    if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => console.log("Could not exit fullscreen", err));
    }

    // Clear any existing interval just in case
    if (forcePauseInterval) clearInterval(forcePauseInterval);

    // Aggressively keep video paused while overlay is active
    forcePauseInterval = setInterval(() => {
        if (!overlayActive) {
            clearInterval(forcePauseInterval);
            return;
        }
        const v = document.querySelector('video');
        if (v && !v.paused) {
            v.pause();
        }
    }, 500);

    // 3. Pick a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    // 4. Create the HTML elements
    const overlay = document.createElement('div');
    overlay.id = 'yt-stopper-overlay';

    overlay.innerHTML = `
        <div class="yt-stopper-card">
            <div class="yt-stopper-header">🛑 Binge Check</div>
            <div class="yt-stopper-quote">${randomQuote}</div>
            <div class="yt-stopper-timer">You can decide in <span id="yt-countdown">5</span> seconds...</div>
            
            <div class="yt-stopper-actions">
                <button id="btn-productive" class="btn-productive">I'll do something productive</button>
                <button id="btn-watch" class="btn-watch" disabled>Watch Video Anyway</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    // 5. Setup Button Logic
    const productiveBtn = document.getElementById('btn-productive');
    const watchBtn = document.getElementById('btn-watch');
    const countdownSpan = document.getElementById('yt-countdown');
    const timerText = document.querySelector('.yt-stopper-timer');

    // "Be Productive" Action
    productiveBtn.addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: "CLOSE_TAB" });
    });

    // "Watch Anyway" Action
    watchBtn.addEventListener('click', () => {
        approvedVideoId = getClientVideoId();
        console.log("[YT-Stopper] User approved video:", approvedVideoId);

        overlayActive = false; // Stop the pause loop
        if (forcePauseInterval) clearInterval(forcePauseInterval);

        overlay.style.opacity = '0'; // Fade out
        setTimeout(() => {
            overlay.remove(); // Remove popup after fade
        }, 400);

        if (videoElement) videoElement.play(); // Resume video
    });

    // 6. Handle Countdown
    let timeLeft = 5;
    const timerInterval = setInterval(() => {
        timeLeft--;
        if (countdownSpan) countdownSpan.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (timerText) timerText.innerText = "Make your choice.";

            watchBtn.disabled = false; // Enable the button
            watchBtn.innerText = "I really want to watch this";
        }
    }, 1000);
}