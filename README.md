# YouTube Binge Stopper 🛑

> **Regain control of your time. Stop the scroll.**

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-Chrome%20%7C%20Edge%20%7C%20Brave-lightgrey.svg)

**YouTube Binge Stopper** is a lightweight, privacy-focused Chrome Extension designed to interrupt the "doom scroll" cycle. It doesn't block you from watching videos completely; instead, it adds a *friction layer*—a "mindfulness check"—before you start a second video in a session.

## ✨ Features

- **Mindful Interruption**: Automatically pauses and overlays a confirmation screen when you navigate to a second video in a row.
- **5-Second "Pause"**: A mandatory 5-second countdown forces you to take a breath and decide if you *really* want to watch that next video.
- **Motivational Quotes**: cycled inspirational quotes to remind you of your goals.
- **Glassmorphism UI**: A modern, beautiful, and dark-mode-friendly interface that feels premium.
- **"Productive" Exit**: A prominent button to redirect you immediately to the YouTube homepage (or off the site) to break the cycle.
- **Privacy First**: Runs entirely locally. No data collection, no tracking.

## 🚀 Installation (Developer Mode)

Since this extension is currently in **Developer Preview**, you can install it efficiently via Chrome's Developer Mode.

1.  **Clone the Repository** (or download the ZIP)
    ```bash
    git clone https://github.com/RainierKlopper/YouTube-Binge-Stopper.git
    ```
2.  **Open Chrome Extensions**
    - Navigate to `chrome://extensions/` in your address bar.
3.  **Enable Developer Mode**
    - Toggle the **Developer mode** switch in the top-right corner.
4.  **Load Unpacked**
    - Click **Load unpacked**.
    - Select the `YouTube-Binge-Stopper` directory you just cloned.
5.  **Done!**
    - The extension is now active.

## 🎮 How It Works

1.  **Watch a Video**: The first video you open works as normal.
2.  **Navigate directly to another**: If you click a generic "Recommended" video or a sidebar link, the **Binge Stopper** activates.
3.  **The Check**:
    - The video pauses.
    - A glass overlay appears.
    - You see a quote and a timer.
4.  **The Choice**:
    - Click **"I'll do something productive"** to go back.
    - Wait 5 seconds and click **"Watch Video Anyway"** to proceed (we won't judge!).

## 🛠️ Tech Stack

- **Manifest V3**: State-of-the-art Chrome Extension architecture.
- **Vanilla JavaScript**: Lightweight, fast, and dependency-free.
- **CSS3 Variables & Backdrop Filter**: For the high-performance glassmorphism effect.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Built with ❤️ by Rainier Klopper*
