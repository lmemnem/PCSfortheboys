chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {


  if (message.type === "confighack") {
    chrome.storage.local.set({
      config: message.config
    });
  }

  if (message.type === "getconfig") {
    chrome.storage.local.get("config", (data) => {
      sendResponse(data);
    });

    return true;
  }
});
