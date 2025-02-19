document.getElementById("saveSettings").addEventListener("click", () => {
    const soundFile = document.getElementById("soundFile").value.trim();
    chrome.storage.sync.set({ soundFile }, () => {
        alert("Settings saved!");
    });
});