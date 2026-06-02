window.addEventListener("message", (event) => {

  if (event.data.type === "confighack") {

    chrome.runtime.sendMessage({
      type: "confighack",
      config: event.data.config
    });

  }
});


chrome.runtime.sendMessage({
  type: "confighack"
}, (response) => {

  if (!response?.config) {
    return;
  }

  const div = document.createElement("div");

  div.innerHTML = response.config.showBanner;

  document.body.appendChild(div);
});
