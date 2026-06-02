window.addEventListener("message", (event) => {
  //if (event.source !== window) return;

  if (event.data.type === "givemedata") {
    chrome.runtime.sendMessage({ type: "getData" }, (response) => {
      window.postMessage({
        type: "givemedata",
        data: response?.data || response
      }, "*");
    });
  }

  if (event.data.type === "rick") {
    chrome.runtime.sendMessage({
      type: "rick",
      config: event.data.config
    });
  }
});

chrome.runtime.sendMessage({
  type: "getConfig"
}, (response) => {
  if (!response?.config) {
    return;
  }
  const div = document.createElement("div");
  //vulnerable part
  div.innerHTML = response.config.showBanner;
  document.body.appendChild(div);
});
