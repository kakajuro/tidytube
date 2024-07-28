import { browser } from "webextension-polyfill-ts";
import { getTabStore, removeTabFromStore, updateTabStore } from "../util/tabStore";
import { setSectionsRemovedPage, getSectionsRemovedPage } from "../util/sectionsRemoved";
import { clearPageChangeStore, getPageChangeStore } from "../util/pageChangeStore";

interface InstallRes {
  clientID: string,
  uninstallKey: string
}

interface StatsRes {
  message: string
}

// Setup alarms
browser.alarms.create("sendPageUpdates", {"periodInMinutes": 15});

// On installed listener
browser.runtime.onInstalled.addListener(async function (details) {

  if (details.reason == "install") {
    let API_URL = process.env.NODE_ENV == "development" ? process.env.LOCAL_API_URL : process.env.API_URL;
    console.log("Setting up extension...");
    
    let response = await fetch(`${API_URL}/api/install`, {
      headers: {
        "Content-Type": "application/json",
        "install-key": process.env.HASHED_INSTALL_KEY
      }
    });

    if (response?.ok) {
      let jsonRes:Promise<InstallRes> = await response.json();
      let clientID = (await jsonRes).clientID;
      let uninstallKey = (await jsonRes).uninstallKey;

      // Store client ID + uninstall key locally
      browser.storage.local.set({"clientID": clientID});
      browser.storage.local.set({"uninstallKey": uninstallKey});

      // Setup uninstall URL
      let uninstallURL = process.env.NODE_ENV == "development" ? process.env.LOCAL_SITE_URL : process.env.SITE_URL;
      browser.runtime.setUninstallURL(`${uninstallURL}/uninstall?clientID=${clientID}&uninstallKey=${uninstallKey}`);
      
    } else {
      console.warn(`There was an error when trying to authenticate install with the server...`)
    }

  }

  // Make extension work on all pages
  browser.declarativeContent.onPageChanged.removeRules(undefined, function () {
    browser.declarativeContent.onPageChanged.addRules([
      {
        conditions: [new browser.declarativeContent.PageStateMatcher({})],
        actions: [new browser.declarativeContent.ShowPageAction()],
      },
    ]);
  }); 
});

// Re-inject content script if extension context invalidated
const reinjectContentScript = () => {
  console.log("REINJECTING CONTENT SCRIPT");

  if (browser.runtime?.id) {
    browser.tabs.query({currentWindow:true, active:true})
    .then(tabs => {
      let currentTabID = tabs[0].id;

      browser.scripting.executeScript({
        target: {tabId: currentTabID},
        files: ["tidytube-cs.js"]
      })
    })
  }
}

const revalidationTimeout = 20000;
let invalidateTimeout = setTimeout(async ()  => {
  if (!browser.runtime?.id) {
    clearInterval(invalidateTimeout);
    reinjectContentScript();
  }
}, revalidationTimeout);


// Tab reload event
browser.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {
  if (changeInfo.status == "loading") {
    setSectionsRemovedPage(0);
    console.log("SectionsRemovedPage Reset");  
  }
});

// Switch tab event (send message to popup to change sectionsRemovedPageValue)
browser.tabs.onActivated.addListener(async function (activeInfo) {

  console.log(`Tab switch detected from Tab ID: ${activeInfo.tabId}`);
  await browser.storage.local.set({"previousTab": activeInfo.previousTabId});
  let tabStore = await getTabStore();

  if (tabStore[activeInfo.tabId]) {
    setSectionsRemovedPage(tabStore[activeInfo.tabId]);
    console.log("Set sections removed page value to " + tabStore[activeInfo.tabId]);

    // Throws error if popup is not open 
    try {
      browser.runtime.sendMessage(null, "sectionsRemovedPageChanged");
      browser.runtime.sendMessage(null, "resetSectionsRemovedPage");
    } catch (err) {
      console.warn("An error occurred when sending update messages to popup. Likely because the popup was not open.")
    }
  } else {
    setSectionsRemovedPage(0);
  }

});

// Tab close event (remove data for closed tab from tab store)
browser.tabs.onRemoved.addListener(async function(tabId, removeInfo) {
  
  let tabStore = await getTabStore();

  if (tabStore[tabId]) {
    await removeTabFromStore(tabId);
    console.log("Tab removed from tabStore");
  }

});

// Reponse functions
const tabStoreUpdate = async () => {
  let sectionsRemovedPage = await getSectionsRemovedPage();

  browser.tabs.query({active:true, currentWindow:true})
  .then((tabs) => {
    let tab:number = tabs[0].id;

    updateTabStore({"tab": tab, "sectionsRemovedPage": sectionsRemovedPage})
  })
}; 

const sendPageUpdates = async () => {
  
  let pageChangeData = await getPageChangeStore();
  console.log("Sending page change data...");

  let API_URL = process.env.NODE_ENV == "development" ? process.env.LOCAL_API_URL : process.env.API_URL;

  let { clientID } = await browser.storage.local.get("clientID");

  let response = await fetch(`${API_URL}/api/updateStats`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "install-key": process.env.HASHED_INSTALL_KEY,
      "client-id": clientID
    },
    body: JSON.stringify(pageChangeData)
  })

  if (response?.ok) {
    let jsonRes:Promise<StatsRes> = await response.json();
    console.log((await jsonRes).message);

    console.log("Clearing page change data...");
    await clearPageChangeStore();
  } else {
    console.warn("An error occurred sending page change data to server...");
    console.log("A successful update will be attempted later...");
  } 

}

// Alarm listeners
browser.alarms.onAlarm.addListener(alarmInfo => {
  if (alarmInfo.name === "sendPageUpdates") {
    sendPageUpdates();
  }
})

// Message listners
browser.runtime.onMessage.addListener((msg, sender) => {
  if (msg === "BGupdateTabStore") {
    tabStoreUpdate();
  }
})
