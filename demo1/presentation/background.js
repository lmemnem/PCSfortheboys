chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {


  if (message.type === "SET_CONFIG") {
    chrome.storage.local.set({
      config: message.config
    });
  }

  if (message.type === "GET_CONFIG") {
    chrome.storage.local.get("config", (data) => {
      sendResponse(data);
    });

    return true;
  }
});
