chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "playSound" && message.soundFile) {
        console.log("Playing sound:", message.soundFile);
        const audio = new Audio(message.soundFile);
        audio.play().catch((error) => console.error("Audio playback failed:", error));
    }
});