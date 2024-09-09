document.getElementById("yellow").addEventListener("click", () => {
    sendMessageToContentScript("yellow");
});
document.getElementById("blue").addEventListener("click", () => {
    sendMessageToContentScript("#099FFF");
});
document.getElementById("red").addEventListener("click", () => {
    sendMessageToContentScript("#FD1C03");
});
document.getElementById("purple").addEventListener("click", () => {
    sendMessageToContentScript("#9D00FF");
});

function sendMessageToContentScript(color) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { color: color }, (response) => {
            if (chrome.runtime.lastError) {
                console.error("Error: ", chrome.runtime.lastError.message);
            } else {
                console.log("Response from content script:", response);
            }
        });
    });
}

