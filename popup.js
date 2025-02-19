document.getElementById("multipleMessages").addEventListener("change", (event) => {
    const addButton = document.getElementById("addMessage");
    const messageContainer = document.getElementById("messageContainer");
    
    if (event.target.checked) {
        messageContainer.innerHTML = ""; // Clear existing messages
        addMessageField();
        addMessageField();
        addButton.style.display = "block";
    } else {
        messageContainer.innerHTML = "";
        addMessageField();
        addButton.style.display = "none";
    }
    console.log("Multiple messages toggled", event.target.checked);
});

document.getElementById("addMessage").addEventListener("click", () => {
    addMessageField();
});

function addMessageField() {
    const messageContainer = document.getElementById("messageContainer");
    const inputWrapper = document.createElement("div");
    inputWrapper.className = "message-wrapper";
    
    const input = document.createElement("input");
    input.type = "text";
    input.className = "messageInput";
    input.placeholder = "Enter message";
    
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => inputWrapper.remove();
    
    inputWrapper.appendChild(input);
    inputWrapper.appendChild(deleteBtn);
    messageContainer.appendChild(inputWrapper);
    console.log("Added new message field");
}

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
            deleteBtn.textContent = "🗑";
            deleteBtn.className = "delete-reminder-btn";
            deleteBtn.onclick = () => deleteReminder(reminder.id);
            
            li.appendChild(deleteBtn);
            reminderList.appendChild(li);
        });
    });
}

function deleteReminder(reminderId) {
    chrome.storage.sync.get(["reminders"], (data) => {
        const reminders = data.reminders.filter(r => r.id !== reminderId);
        chrome.storage.sync.set({ reminders }, () => {
            chrome.alarms.clear(`reminder_${reminderId}`);
            displayReminders();
            console.log("Deleted reminder", reminderId);
        });
    });
}

document.addEventListener("DOMContentLoaded", displayReminders);