document.getElementById("multipleMessages").addEventListener("change", updateMessageUI);

function updateMessageUI() {
    const multiple = document.getElementById("multipleMessages").checked;
    const messageContainer = document.getElementById("messageContainer");
    messageContainer.innerHTML = "";

    addMessageField(multiple);

    if (multiple) {
        document.getElementById("addMessage").style.display = "block";
    } else {
        document.getElementById("addMessage").style.display = "none";
    }
}

document.getElementById("addMessage").addEventListener("click", () => {
    addMessageField(true);
});

function addMessageField(canDelete) {
    const container = document.getElementById("messageContainer");
    const wrapper = document.createElement("div");
    wrapper.className = "message-wrapper";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "messageInput";
    input.placeholder = "Enter message";

    if (canDelete) {
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "❌";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => wrapper.remove();
        wrapper.appendChild(deleteBtn);
    }

    wrapper.appendChild(input);
    container.appendChild(wrapper);
}

document.getElementById("setReminder").addEventListener("click", () => {
    const title = document.getElementById("reminderTitle").value.trim();
    const messages = [...document.querySelectorAll(".messageInput")].map(input => input.value.trim()).filter(m => m.length > 0);
    const time = parseInt(document.getElementById("reminderTime").value, 10) || 1;

    let soundFile = "";
    const soundSelect = document.getElementById("soundSelect").value;
    if (soundSelect === "url") {
        soundFile = document.getElementById("soundUrl").value.trim();
    } else if (soundSelect === "upload") {
        const fileInput = document.getElementById("uploadSound");
        if (fileInput.files.length > 0) {
            soundFile = URL.createObjectURL(fileInput.files[0]);
        }
    }

    if (!title || messages.length === 0 || isNaN(time) || time <= 0) {
        alert("Enter valid title, messages, and time!");
        return;
    }

    const reminderId = Date.now().toString();
    chrome.storage.sync.get(["reminders"], (data) => {
        const reminders = data.reminders || [];
        reminders.push({ id: reminderId, title, messages, time, soundFile });

        chrome.storage.sync.set({ reminders }, () => {
            chrome.alarms.create(`reminder_${reminderId}`, { delayInMinutes: time });
            displayReminders();
        });
    });
});

function displayReminders() {
    chrome.storage.sync.get(["reminders"], (data) => {
        const reminderList = document.getElementById("reminderList");
        reminderList.innerHTML = "";

        (data.reminders || []).forEach(reminder => {
            const li = document.createElement("li");
            li.textContent = `${reminder.title} - Every ${reminder.time} min`;

            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "❌";
            deleteBtn.className = "delete-reminder-btn";
            deleteBtn.onclick = () => deleteReminder(reminder.id);

            li.appendChild(deleteBtn);
            reminderList.appendChild(li);
        });
    });
}

function deleteReminder(reminderId) {
    chrome.storage.sync.get(["reminders"], (data) => {
        let reminders = data.reminders || [];
        const deletedReminder = reminders.find(r => r.id === reminderId);

        // Remove the reminder
        reminders = reminders.filter(r => r.id !== reminderId);

        // Check if any other reminders are using the same sound file
        const soundFile = deletedReminder.soundFile;
        if (soundFile && !reminders.some(r => r.soundFile === soundFile)) {
            URL.revokeObjectURL(soundFile); // Remove from memory if not used elsewhere
        }

        chrome.storage.sync.set({ reminders }, () => {
            chrome.alarms.clear(`reminder_${reminderId}`);
            displayReminders();
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    updateMessageUI();
    displayReminders();
});