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

            const soundFile = reminder.soundFile || "reminder.mp3";

            const notificationOptions = {
                type: "basic",
                iconUrl: "icons/icon128.png",
                title: reminder.title || "Reminder",
                message: message,
                requireInteraction: false
            };

            if (!reminder.periodic) {
                notificationOptions.buttons = [{ title: "Snooze (5 min)" }];
            }

            chrome.notifications.create(reminderId, notificationOptions);

            const audio = new Audio(chrome.runtime.getURL(soundFile));
            audio.play();

            // ✅ Restore History Logging
            chrome.storage.local.get(["history"], (historyData) => {
                const history = historyData.history || [];
                history.push({ 
                    title: reminder.title, 
                    message, 
                    time: new Date().toLocaleString() 
                });
                chrome.storage.local.set({ history });
            });

            if (!reminder.periodic) {
                chrome.storage.sync.set({ reminders: reminders.filter(r => r.id !== reminderId) });
            }
        });
    }
});

chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
    if (buttonIndex === 0) {
        chrome.alarms.create(`reminder_${notificationId}`, { delayInMinutes: 5 });
        chrome.notifications.clear(notificationId);
    }
});