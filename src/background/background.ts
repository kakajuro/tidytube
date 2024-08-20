import { browser } from "webextension-polyfill-ts";
import { getTabStore, removeTabFromStore, updateTabStore } from "../util/tabStore";
import { setSectionsRemovedPage, getSectionsRemovedPage } from "../util/sectionsRemoved";
import { clearPageChangeStore, getPageChangeStore } from "../util/pageChangeStore";

import config from "../config.json";

interface InstallRes {
  clientID: string,
  uninstallKey: string
}

interface StatsRes {
  message: string
}

const setupExtension = async () => {

  if (process.env.NODE_ENV == "production") {

    let API_URL = process.env.API_URL;
    let SITE_URL = process.env.SITE_URL;

    await fetch(`https://${API_URL}/api/install`, {
      headers: {
        "Content-Type": "application/json",
        "install-key": process.env.HASHED_INSTALL_KEY
      }
    }).then(async (response) => {
      if (response?.ok) {
        console.log("Authenticated sucessfully...");
  
        let jsonRes:Promise<InstallRes> = await response.json();
        let clientID = (await jsonRes).clientID;
        let uninstallKey = (await jsonRes).uninstallKey;
  
        // Store client ID + uninstall key locally
        browser.storage.local.set({"clientID": clientID});
        browser.storage.local.set({"uninstallKey": uninstallKey});
  
        // Setup uninstall URL
        browser.runtime.setUninstallURL(`https://${SITE_URL}/uninstall?clientID=${clientID}&uninstallKey=${uninstallKey}`);
  
        console.log("Extension fully set up");

        // Install page
        browser.tabs.create({ url: `https://${SITE_URL}/install?clientID=${clientID}` });
      } else {
        console.warn(`There was an error when trying to authenticate install with the server...`)
      }
    })
    .catch(error => {
      console.log(`An error occured authenticating extension: ${error}`)
    });
  } else if (config.apiEnabled) {

    let API_URL = process.env.LOCAL_API_URL;
    let SITE_URL = process.env.LOCAL_SITE_URL;

    await fetch(`https://${API_URL}/api/install`, {
      headers: {
        "Content-Type": "application/json",
        "install-key": process.env.HASHED_INSTALL_KEY
      }
    }).then(async (response) => {
      if (response?.ok) {
        console.log("Authenticated sucessfully...");
  
        let jsonRes:Promise<InstallRes> = await response.json();
        let clientID = (await jsonRes).clientID;
        let uninstallKey = (await jsonRes).uninstallKey;
  
        // Store client ID + uninstall key locally
        browser.storage.local.set({"clientID": clientID});
        browser.storage.local.set({"uninstallKey": uninstallKey});
  
        // Setup uninstall URL
        browser.runtime.setUninstallURL(`https://${SITE_URL}/uninstall?clientID=${clientID}&uninstallKey=${uninstallKey}`);
  
        console.log("Extension fully set up");

        // Install page
        browser.tabs.create({ url: `https://${SITE_URL}/install?clientID=${clientID}` });
      } else {
        console.warn(`There was an error when trying to authenticate install with the server...`)
      }
    })
    .catch(error => {
      console.log(`An error occured authenticating extension: ${error}`)
    });
  }

}

// Setup alarms
browser.alarms.create("sendPageUpdates", {"periodInMinutes": 15});

// On installed listener
browser.runtime.onInstalled.addListener(async function (details) {

  if (details.reason == "install") {
    console.log("Setting up extension...");

    setupExtension();

  } else if (details.reason == "update") {

    // Check if existing users are still authenticated after an update
    if (process.env.NODE_ENV == "production") {
      let API_URL = process.env.API_URL;

      let { clientID } = await browser.storage.local.get("clientID");

      if (!clientID) {
        setupExtension();
      } else {
        // Check if client ID exists
        await fetch(`https://${API_URL}/api/me`, {
          headers: {
            "Content-Type": "application/json",
            "client-id": clientID
          }
        }).then(response => {
          if (!response?.ok) {
            // Get new client ID
            setupExtension();
          }
        })


      }
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

  if (process.env.NODE_ENV == "production") {
    let API_URL = process.env.API_URL;

    let { clientID } = await browser.storage.local.get("clientID");

    await fetch(`https://${API_URL}/api/updateStats`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "install-key": process.env.HASHED_INSTALL_KEY,
        "client-id": clientID
      },
      body: JSON.stringify(pageChangeData)
    }).then(async (response) => {
      if (response?.ok) {
        let jsonRes:Promise<StatsRes> = await response.json();
        console.log((await jsonRes).message);

        console.log("Clearing page change data...");
        await clearPageChangeStore();
      } else {
        console.warn("An error occurred sending page change data to server...");
        console.log("A successful update will be attempted later...");
      } 
    })
    .catch(error => {
      console.log(`An error occured updating extension stats on the server: ${error}`)
    });
  } else if (config.apiEnabled) {
    let API_URL = process.env.LOCAL_API_URL;

    let { clientID } = await browser.storage.local.get("clientID");

    await fetch(`https://${API_URL}/api/updateStats`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "install-key": process.env.HASHED_INSTALL_KEY,
        "client-id": clientID
      },
      body: JSON.stringify(pageChangeData)
    }).then(async (response) => {
      if (response?.ok) {
        let jsonRes:Promise<StatsRes> = await response.json();
        console.log((await jsonRes).message);

        console.log("Clearing page change data...");
        await clearPageChangeStore();
      } else {
        console.warn("An error occurred sending page change data to server...");
        console.log("A successful update will be attempted later...");
      } 
    })
    .catch(error => {
      console.log(`An error occured updating extension stats on the server: ${error}`)
    });
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
