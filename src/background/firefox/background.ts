import { browser } from "webextension-polyfill-ts";

/// <reference types="web-ext-types"/>

browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == "loading") {    
    try {
      browser.tabs.sendMessage(tabId, "tidyWhileLoading");
      setTimeout(null, 1000);
      browser.tabs.sendMessage(tabId, "tidyWhileLoading");
    } catch (err) {
      null;
    }
  }
});