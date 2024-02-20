import { browser } from "webextension-polyfill-ts";

export async function getSectionsRemovedPage() {
  try {
    let { sectionsRemovedPage } = await browser.storage.local.get("sectionsRemovedPage");

    if (sectionsRemovedPage === undefined) {
      // Get user default preference if no value for sections removed on the page
      setSectionsRemovedPage(0);
      return 0;
    } else {
      // Return stored value
      return sectionsRemovedPage;
    }

  } catch (error) {
    // Return nothing in case of an error
    console.error(`An error occurred when trying to get sections removed (page): ${error}`);
    return "---"
  }
}

export async function setSectionsRemovedPage(value:number) {
  browser.storage.local.set({"sectionsRemovedPage": value})
  .then(() => console.log("Success storing sections removed (page) to storage"))
  .catch((error) => console.error(`An error occurred when trying to store sections removed (page): ${error}`))
}

export async function getSectionsRemovedTotal() {
  try {
    let { sectionsRemovedTotal } = await browser.storage.local.get("sectionsRemovedTotal");

    if (sectionsRemovedTotal === undefined) {
      // Get user default preference if no value for sections removed on the page
      setSectionsRemovedTotal(0);
      return 0;
    } else {
      // Return stored value
      return sectionsRemovedTotal;
    }

  } catch (error) {
    // Return nothing in case of an error
    console.error(`An error occurred when trying to get sections removed (total): ${error}`);
    return "---"
  }
}

export async function setSectionsRemovedTotal(value:number) {
  browser.storage.local.set({"sectionsRemovedTotal": value})
  .then(() => console.log("Success storing sections removed (total) to storage"))
  .catch((error) => console.error(`An error occurred when trying to store sections removed (total): ${error}`))
}

export async function clearSectionsRemovedPage() {
  browser.storage.local.remove("sectionsRemovedPage")
  .then(() => console.log("Success clearing sections removed (page) preference from storage"))
  .catch((error) => console.error(`An error occurred when trying to clear sections removed (page) from storage: ${error}`))
}

export async function clearSectionsRemovedTotal() {
  browser.storage.local.remove("sectionsRemovedTotal")
  .then(() => console.log("Success clearing sections removed (total) preference from storage"))
  .catch((error) => console.error(`An error occurred when trying to clear sections removed (total) from storage: ${error}`))
}