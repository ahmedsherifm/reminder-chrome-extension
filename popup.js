document.getElementById("multipleMessages").addEventListener("change", (event) => {
    const addButton = document.getElementById("addMessage");
    addButton.style.display = event.target.checked ? "block" : "none";
});

document.getElementById("addMessage").addEventListener("click", () => {
    const messageContainer = document.getElementById("messageContainer");
    const input = document.createElement("input");
    input.type = "text";
    input.className = "messageInput";
    input.placeholder = "Enter message";
    messageContainer.appendChild(input);
});

document.getElementById("setReminder").addEventListener("click", () => {
    const messages = [...document.querySelectorAll(".messageInput")].map(input => input.value.trim()).filter(m => m.length > 0);
    const time = parseInt(document.getElementById("reminderTime").value, 10);
    const periodic = document.getElementById("periodicReminder").checked;

    if (messages.length === 0 || isNaN(time) || time <= 0) {
        alert("Enter valid messages and time!");
        return;
    }

    const reminderId = Date.now().toString();

    chrome.storage.sync.get(["reminders"], (data) => {
        const reminders = data.reminders || [];
        reminders.push({ id: reminderId, messages, time, periodic });

        chrome.storage.sync.set({ reminders }, () => {
            chrome.alarms.create(`reminder_${reminderId}`, {
                delayInMinutes: time,
                periodInMinutes: periodic ? time : undefined
            });
        });
    });
});