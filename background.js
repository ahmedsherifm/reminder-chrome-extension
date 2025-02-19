chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name.startsWith("reminder_")) {
        const reminderId = alarm.name.split("_")[1];

        chrome.storage.sync.get(["reminders"], (data) => {
            const reminders = data.reminders || [];
            const reminder = reminders.find(r => r.id === reminderId);
            if (!reminder) return;

            const message = reminder.messages.length > 1
                ? reminder.messages[Math.floor(Math.random() * reminder.messages.length)]
                : reminder.messages[0];

            const soundFile = reminder.soundFile || chrome.runtime.getURL("reminder.mp3");

            const notificationOptions = {
                type: "basic",
                iconUrl: "icons/icon128.png",
                title: reminder.title || "Reminder",
                message: message,
                requireInteraction: true // Keep the notification visible
            };

            if (!reminder.periodic) {
                notificationOptions.buttons = [{ title: "Snooze (5 min)" }];
            }
            
            // ✅ Show Notification
            chrome.notifications.create(reminderId, notificationOptions);

            // ✅ Send a message to content.js to play sound
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs.length > 0) {
                    chrome.tabs.sendMessage(tabs[0].id, { action: "playSound", soundFile });
                }
            });

            // ✅ Store reminder history
            chrome.storage.local.get(["history"], (historyData) => {
                const history = historyData.history || [];
                history.push({ 
                    title: reminder.title, 
                    message, 
                    time: new Date().toLocaleString() 
                });
                chrome.storage.local.set({ history });
            });
        });
    }
});

chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
    if (buttonIndex === 0) {
        const snoozeMinutes = prompt("Snooze for how many minutes?", "5");
        if (!isNaN(snoozeMinutes) && snoozeMinutes > 0) {
            chrome.alarms.create(`reminder_${notificationId}`, { delayInMinutes: parseInt(snoozeMinutes, 10) });
            chrome.notifications.clear(notificationId);
        }
    }
});