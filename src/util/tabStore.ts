import { browser } from "webextension-polyfill-ts";

import type { tabData } from "../types/types";

export async function getTabStore() {
  try {
    
    let { tabStore } = await browser.storage.local.get("tabStore");

    if (tabStore === undefined) {
      // Set default settings if no value in storage
      browser.storage.local.set({"tabStore": {}})
      .catch(error => console.log(`Error initialising tab store object: ${error}`))
    } else {
      // Return stored value if there is one
      return tabStore;
    }

  } catch (error) {
    console.log(`An error occured when trying to get tab store: ${error}`)
  }

}

export async function updateTabStore(data:tabData) {

  let { tabStore } = await browser.storage.local.get("tabStore");
  let newTabStore = {...tabStore};
  newTabStore[data.tab] = data.sectionsRemovedPage;
  
  browser.storage.local.set({"tabStore": newTabStore})
  .catch(error => console.log(`Error updating tab store: ${error}`))
}

export async function removeTabFromStore(tabId:number) {
  
  let { tabStore } = await browser.storage.local.get("tabStore");

  delete tabStore[tabId];

  browser.storage.local.set({"tabStore": tabStore})
  .catch(error => console.log(`Error updating tab store: ${error}`))
}

export async function clearTabStore() {
 browser.storage.local.remove("tabStore")
 .catch(error => console.log(`Error removing tab store: ${error}`))
}