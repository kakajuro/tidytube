import { browser } from "webextension-polyfill-ts";

let defaults = {
  "removeShortsFromSearch": true,
  "removeAdsFromSearch": true
}

export async function getSettings() {
  try {
    let { settings } = await browser.storage.local.get("settings");

    if (settings === undefined) {
      // Set default settings if no value in storage
      browser.storage.local.set({"settings": defaults})
      .catch((error) => console.error(`Error setting default settings: ${error}`))
    } else {
      // Return stored value if there is one
      return settings
    }
  } catch (error) {
    console.error(`An error occurred trying to load extension settings: ${error}`);
    return defaults
  }
}

export async function setSettings(data:object) {
  let { settings } = await browser.storage.local.get("settings");
  let newSettings = {...settings, ...data}

  browser.storage.local.set({"settings": newSettings})
  .catch((error) => console.error(`An error occured when changing settings : ${error}`))
}

export async function clearSettings() {
  browser.storage.local.remove("settings")
  .catch((error) => console.error(`An error occurred removing settings from storage: ${error}`))
}