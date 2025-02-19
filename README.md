# 📌 Smart Reminder Chrome Extension

A powerful **Chrome extension** that allows users to set customizable **one-time or periodic reminders** with **custom messages** and **sound notifications**.

## 🚀 Features

✔ **Set multiple messages** per reminder\
✔ **One-time or periodic** reminders\
✔ **Random message selection** (if multiple messages exist)\
✔ **Snooze option** (only for one-time reminders)\
✔ **Custom notification sound** or use the default\
✔ **Reminder history tracking**

## 📂 Folder Structure

```
reminder-extension/
│── manifest.json       # Chrome Extension Configuration
│── background.js       # Handles alarms & notifications
│── popup.html          # UI for setting reminders
│── popup.js            # Logic for popup actions
│── options.html        # UI for custom settings
│── options.js          # Handles saving user preferences
│── styles.css          # Basic styles
│── reminder.mp3        # Default sound file (user can change)
│── icon.png            # Extension icon
│── LICENSE             # Proprietary license to restrict usage
│── README.md           # Documentation for setup & usage
```

## 🛠 Installation Guide

1. **Download or Clone** the repository:
   ```sh
   git clone https://github.com/ahmedsherifm/chrome-reminder-extension.git
   ```
2. Open **Google Chrome** and go to:
   ```
   chrome://extensions/
   ```
3. **Enable Developer Mode** (toggle in the top-right corner).
4. Click **"Load unpacked"** and select the `reminder-extension` folder.
5. The extension will now appear in your Chrome extensions bar! 🎉

## 🖥️ Usage

1. Click the **extension icon** in Chrome.
2. Enter **reminder messages** (you can add multiple messages).
3. Set **reminder time** (in minutes).
4. Choose **one-time or periodic** reminder.
5. Click **"Set Reminder"** and wait for the notification! 🔔

## ⚙ Customization

### 🔊 **Change Reminder Sound**

1. Open **Extension Options** (`chrome://extensions/` → Find Extension → Click "Options").
2. Enter a **URL to an MP3 file** or leave it blank to use the default.

### 📌 **Enable/Disable Multiple Messages**

- **Check "Use Multiple Messages"** to allow multiple reminder texts.
- If enabled, the extension will **randomly pick** one message per notification.

## 🔄 Updating the Extension

If you make changes to the code, reload it:

1. Go to **chrome://extensions/**.
2. Find the **Reminder Extension**.
3. Click **"Reload"**.

## ⚠ Known Issues

- **Sound not playing?** Ensure Chrome allows notifications & sound permissions.
- **Missing notifications?** Check **chrome://flags** and enable `"Enable Background Extensions"`.

## 🛑 License & Restrictions

This software is **proprietary and confidential**.\
Unauthorized copying, modification, or distribution is **strictly prohibited**.\
Reminder Chrome Extension © 2025 by Ahmed Sherif is licensed under CC BY-NC-ND 4.0 .\
For **licensing inquiries**, please contact: **[**asherifhegazy@gmail.com**](mailto\:asherifhegazy@gmail.com)**.

## 🏗️ Contributing

This project is **not open-source**. If you want to contribute, request approval.

1. Fork the repo.
2. Create a branch:
   ```sh
   git checkout -b feature-name
   ```
3. Commit changes:
   ```sh
   git commit -m "Added new feature"
   ```
4. Push to branch:
   ```sh
   git push origin feature-name
   ```
5. Submit a **Pull Request**.

## 🏆 Acknowledgments

This extension was built to help users **stay productive** with personalized reminders and **non-intrusive** notifications.

---

🔥 **Made with ❤️ by Ahmed Sherif** 🔥

