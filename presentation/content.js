window.addEventListener("message", (event) => {

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
