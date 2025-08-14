chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("message got", request);

  if (request.action === "authenticate") {
    console.log("authentication message got");
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (token) sendResponse({ token });
      else sendResponse({ error: chrome.runtime.lastError });
    });
    return true; // Indicates async response
  }
});
