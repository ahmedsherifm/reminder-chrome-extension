document.getElementById("multipleMessages").addEventListener("change", (event) => {
    const addButton = document.getElementById("addMessage");
    addButton.style.display = event.target.checked ? "block" : "none";
    console.log("Multiple messages toggled", event.target.checked);
});

document.getElementById("addMessage").addEventListener("click", () => {
    const messageContainer = document.getElementById("messageContainer");
    const input = document.createElement("input");
    input.type = "text";
    input.className = "messageInput";
    input.placeholder = "Enter message";
    messageContainer.appendChild(input);
    console.log("Added new message field");
});

document.getElementById("setReminder").addEventListener("click", () => {
    const title = document.getElementById("reminderTitle").value.trim();
    const messages = [...document.querySelectorAll(".messageInput")].map(input => input.value.trim()).filter(m => m.length > 0);
    const time = parseInt(document.getElementById("reminderTime").value, 10) || 1;
    const soundFile = document.getElementById("reminderSound").value.trim();
    const periodic = document.getElementById("periodicReminder").checked;

    if (!title || messages.length === 0 || isNaN(time) || time <= 0) {
        alert("Enter valid title, messages, and time!");
        return;
    }

    const reminderId = Date.now().toString();

    chrome.storage.sync.get(["reminders"], (data) => {
        const reminders = data.reminders || [];
        reminders.push({ id: reminderId, title, messages, time, soundFile, periodic });

        chrome.storage.sync.set({ reminders }, () => {
            chrome.alarms.create(`reminder_${reminderId}`, {
                delayInMinutes: time,
                periodInMinutes: periodic ? time : undefined
            });
            console.log("Reminder set", { id: reminderId, title, messages, time, soundFile, periodic });
        });
    });
});