chrome.runtime.onMessage.addListener((msg) => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const tabId = tabs[0].id;
    if (msg.acao === "converter") {
      chrome.scripting.executeScript({
        target: {tabId: tabId},
        files: ["libs/hangul.js", "converter.js"]
      });
    } else if (msg.acao === "reverter") {
      chrome.scripting.executeScript({
        target: {tabId: tabId},
        files: ["reverter.js"]
      });
    }
  });
});
