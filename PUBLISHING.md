# How to Publish "YouTube Binge Stopper" to the Chrome Web Store

Getting your extension into the official Chrome Web Store allows anyone to install it easily and ensures it's verified as safe. Here is the step-by-step process.

## 1. Prerequisites

- **Google Account**: You need a Google account.
- **Developer Registration**: You must register as a Chrome Web Store developer. There is a **one-time $5 fee**.
  - Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard).
  - Follow the prompts to pay the fee and verify your account.

## 2. Prepare Your Extension Package

Before uploading, you need to package your extension correctly.

### A. Create Icons (Required!)
The store **requires** specific icon sizes. I have updated your `manifest.json` to expect them in an `icons/` folder, but you need to create the actual image files.

1.  **Create a folder named `icons`** in your project root (I have done this for you).
2.  **Add 3 PNG images** to this folder:
    - `icon16.png` (16x16 pixels) - Used in the extension bar.
    - `icon48.png` (48x48 pixels) - Used in the management page.
    - `icon128.png` (128x128 pixels) - Used in the store listing and during installation.

> **Tip**: You can use a free online tool like [favicon.io](https://favicon.io/) to generate these from an emoji or text, or design a custom logo.

### B. Create a ZIP File
1.  Select all the files and folders in your project directory **EXCEPT**:
    - `.git/` folder
    - `.gitignore`
    - `README.md`
    - `PUBLISHING.md`
    - `LICENSE`
    - `walkthrough.md` (if it still exists)
2.  Right-click the selection -> **Send to** -> **Compressed (zipped) folder**.
3.  Name it something like `youtube-stopper-v1.0.zip`.

**Key Point**: The `manifest.json` file must be at the *root* of the zip file, not inside a subfolder.

## 3. Create Store Assets

You will need promotional images for your store listing. These are critical for getting users to click.

- **Store Icon**: 128x128 pixels (PGN) - same as `icon128.png`.
- **Screenshot**: 1280x800 or 640x400 pixels (JPEG or PNG). Take a screenshot of the extension in action (the overlay appearing on a YouTube video).
- **Small Promo Tile**: 440x280 pixels (JPEG or PNG). This appears on the store homepage.
- **Marquee Promo Tile**: 1400x560 pixels (JPEG or PNG). This appears at the top of your listing.

## 4. Upload to the Dashboard

1.  Go to the [Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard).
2.  Click the blue **+ New Item** button.
3.  Drag and drop your `youtube-stopper-v1.0.zip` file.
4.  The dashboard will analyze your manifest and start the listing process.

## 5. Fill Out the Listing

### Store Listing Tab
- **Description**: extensive description of what the extension does. (You can copy from your new `README.md`!).
- **Category**: "Productivity" or "Lifestyle".
- **Language**: English.
- **Graphic Assets**: Upload the screenshots and promo tiles you created in Step 3.

### Privacy Tab (Crucial)
You must disclose what data you collect.
- **Permissions Usage**: Explain *why* you need `storage`, `webNavigation`, and `tabs`.
  - *Example*: "Storage is used to save the user's preference for the current video session locally. WebNavigation is used to detect when a YouTube video page loads."
- **Data Usage**: Check "No" for "Do you collect any user data?". This extension runs entirely locally.

## 6. Submit for Review

1.  Once all tabs have green checkmarks, click **Submit for Review**.
2.  Google's team will manually review your extension. This can take anywhere from **24 hours to a week**.
3.  Once key approved, it will be published!

## 7. Updates

To update your extension later:
1.  Increment the `version` number in `manifest.json` (e.g., `"1.1"`).
2.  Zip the files again.
3.  Go to the dashboard, click on your item, and choose **Upload New Package**.
