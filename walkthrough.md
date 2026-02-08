# How to Install the YouTube Stopper Extension

This guide will walk you through installing your custom "YouTube Binge Stopper" extension into the Google Chrome browser (or Edge/Brave) in Developer Mode.

## Prerequisites
- Google Chrome, Microsoft Edge, or Brave Browser.
- The project files must be saved on your computer (which they are!).

## Steps

### 1. Open the Extensions Management Page
- Open your browser.
- In the address bar, type `chrome://extensions` (or `edge://extensions` for Edge) and press **Enter**.

### 2. Enable Developer Mode
- Look for a toggle switch named **"Developer mode"** (usually in the top right corner).
- Turn it **ON**.

### 3. Load the Unpacked Extension
- A new menu will appear with buttons like "Load unpacked", "Pack extension", etc.
- Click **"Load unpacked"**.
- A file explorer dialog will open.
- Navigate to the folder where this project is located:
  > `(your-download-folder)\youtube-stopper`
- **Important**: Select the *entire folder*, fully containing `manifest.json`. Do not just select a file.
- Click **"Select Folder"** (or "OK").

### 4. Verify Installation
- You should now see "YouTube Binge Stopper" in your list of extensions.
- If there are any errors, a button marked "Errors" will appear on the extension card. Click it to see details.
- Pin these extension to your toolbar if you want to see if it's active (though this extension runs in the background).

## How to Test It
1.  Go to [YouTube](https://www.youtube.com).
2.  Click on any video to watch it.
3.  Now, **click on a second video** (e.g., from the sidebar recommendations).
4.  **The Overlay should appear!**
    - You will see the new "Glassmorphism" design.
    - The video will pause.
    - You will have a 5-second countdown before you can choose to "Watch Anyway".
    - If you click "I'll do something productive", it sends you back to the YouTube homepage.

## Troubleshooting
- **"I don't see the overlay"**: 
    - Ensure you are navigating to a *new* video from another video.
    - Try refreshing the page.
    - Check `chrome://extensions` for any errors.
    - Reload the extension by clicking the circular "Reload" arrow on the extension card in `chrome://extensions`.
