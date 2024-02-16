import { browser } from "webextension-polyfill-ts";

export async function getExtensionRunning() {
  try {
    
    let { extensionRunning } = await browser.storage.local.get("extensionRunning");

    if (extensionRunning === undefined) {
      // Set default (extension running) if no value in storage
      setExtensionRunning(true);
      return true
    } else {
      // Return stored value
      return extensionRunning;
    }

  } catch (error) {
    // Return default (extension running) in case of error
    console.error(`An error occurred trying to load extension state: ${error}`)
    return true;
  }
}

export async function setExtensionRunning(value:Boolean) {
  browser.storage.local.set({"extensionRunning": value})
  .then(() => console.log("Success storing extension state to storage"))
  .catch((error) => console.error(`Error storing extension state to storage: ${error}`))
}