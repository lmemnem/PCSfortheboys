document.addEventListener('DOMContentLoaded', () => {
  const out = document.getElementById('out');

  function log(data) {
    out.textContent = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  }

  document.getElementById('btn-spy').addEventListener('click', async () => {
    log("Stealing data...");

    try {
      const response = await chrome.runtime.sendMessage({ type: "GET_ALL_DATA" });
      if (response?.data) {
        log(response.data);
      } else {
        log("No data received");
      }
    } catch (e) {
      log("Error: " + e.message);
    }
  });
});