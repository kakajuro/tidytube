/// <reference types="chrome"/>

import { browser } from "webextension-polyfill-ts";
import { getTabStore, removeTabFromStore, updateTabStore } from "../../util/tabStore";
import { getSectionsRemovedPage } from "../../util/sectionsRemoved";

chrome.runtime.onInstalled.addListener(function () {
  // Make extension work on all pages
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [new chrome.declarativeContent.PageStateMatcher({})],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

// Tab reload event
browser.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {
  if (changeInfo.status == "loading") {    
    try {
      browser.tabs.sendMessage(tabId, "tidyWhileLoading");
      setTimeout(null, 1000);
      browser.tabs.sendMessage(tabId, "tidyWhileLoading");
    } catch (err) {
      null;
    }
  }

  browser.runtime.sendMessage(null, "resetSectionsRemovedPage");

});

// Switch tab event (send message to popup to change sectionsRemovedPageValue)
browser.tabs.onActivated.addListener(async function (activeInfo) {
  console.log("Tab switch detected");

  console.log(`Tab ID: ${activeInfo.tabId}`);
  await browser.storage.local.set({"previousTab": activeInfo.previousTabId});
  let tabStore = await getTabStore();
  console.log(tabStore);

  if (tabStore) {
    browser.runtime.sendMessage(null, "sectionsRemovedPageChanged");
    browser.runtime.sendMessage(null, "resetSectionsRemovedPage");
    console.log("Update message sent to CS");
  }

});

// Browser close event (remove data for closed tab from tab store) [WORKING]
browser.tabs.onRemoved.addListener(async function(tabId, removeInfo) {
  
  let tabStore = await getTabStore();

  if (tabStore[tabId]) {
    await removeTabFromStore(tabId);
    console.log("Tab removed from tabStore");
  }


});

// 
browser.runtime.onMessage.addListener(async function (message, sender) {
  if (message.message === "handleUpdateTabStore") {

    let sectionsRemovedPage = await getSectionsRemovedPage();

    browser.tabs.query({active: true, currentWindow: true})
    .then((tabs) => {
      let tab:number = tabs[0].id;
      console.log("inside actual function");

      updateTabStore({"tab": tab, "sectionsRemovedPage": sectionsRemovedPage});
      console.log("Update tab store");
    });

  }
})