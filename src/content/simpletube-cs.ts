import { browser } from "webextension-polyfill-ts";

import { getExtensionRunning } from "../util/extensionRunning";
import { getSettings } from "../util/settingsHandler";
import { getSectionsRemovedPage, getSectionsRemovedTotal, setSectionsRemovedPage, setSectionsRemovedTotal } from "../util/sectionsRemoved";
import { checkScrollDirectionIsUp } from "../util/checkScollDirection";

// Remove Shorts on search page
const removeShortsFromSearch = () => {
  const shortsSearchSections = document.querySelectorAll('ytd-reel-shelf-renderer');
  const shortsSearchSectionsArray = [...shortsSearchSections];

  shortsSearchSectionsArray.forEach(div => {
    
    try {
      if (div.firstChild) { div.parentNode.removeChild(div) }
      updateSectionsRemoveCount();
      handleSectionRemovedChange();
      console.log("Shorts removed");
    } catch (error) {
      console.log(`Error in removing shorts: ${error}`);
    }
    
  });
}

// Remove ad slots on search page
const removeAdsFromSearch = () => {
  const adsSeachSections = document.querySelectorAll('ytd-ad-slot-renderer');
  const adSearchSectionsArray = [...adsSeachSections];

  adSearchSectionsArray.forEach(div => {

    try {
      if (div.firstChild) { div.parentNode.removeChild(div) }
      updateSectionsRemoveCount();
      handleSectionRemovedChange();
      console.log("Ad removed");
    } catch (error) {
      console.log(`Error removing ad sections`);
    }

  });
}

// Scroll event handler
const handleScrollEvent = (returnedFunction) => {

  let scrollableElement = document.body;

  scrollableElement.addEventListener("wheel", (event) => {
    if (!checkScrollDirectionIsUp(event)) {
      returnedFunction();
    }
  });

} 

// Handle sections remove change
const handleSectionRemovedChange = (type?:String) => {
  if (type === "Page") {
    browser.runtime.sendMessage(null, `sectionsRemoved${type}Changed`) 
  } else {
    browser.runtime.sendMessage(null, `sectionsRemovedBothChanged`) 
  }
}

// Update the sections removed ocunt when a section is removed
const updateSectionsRemoveCount = async () => {
  let newSectionsRemovedPage = await getSectionsRemovedPage();
  let newSectionsRemovedTotal = await getSectionsRemovedTotal();

  newSectionsRemovedPage = newSectionsRemovedPage + 1;
  newSectionsRemovedTotal = newSectionsRemovedTotal + 1;

  setSectionsRemovedPage(newSectionsRemovedPage);
  setSectionsRemovedTotal(newSectionsRemovedTotal);
}

// Add code to reset page sections removed on each URL change
// DOESNT WORK PROPERLY STORE CURRENT LINK IN STATE
window.addEventListener("hashchange", () => {
  setSectionsRemovedPage(0);
  handleSectionRemovedChange("Page");
});

// Check extension is running
async function checkExtensionRunning () {
  let extensionRunning = await getExtensionRunning();
  let settings = await getSettings();

  if (extensionRunning) {
    console.log("simpletube content script now running...");
    
    // Remove shorts from search
    if (settings.removeShortsFromSearch) {
      removeShortsFromSearch();
      document.addEventListener('scroll', () => handleScrollEvent(removeShortsFromSearch));
      document.addEventListener('scrollend', removeShortsFromSearch);
    }
    
    // Remove ads from search
    if (settings.removeAdsFromSearch) {
      removeAdsFromSearch();
      document.addEventListener('scroll', () => handleScrollEvent(removeAdsFromSearch));
      document.addEventListener('scrollend', removeAdsFromSearch);
    }
  } else {
    console.log("paused simpletube content script");

    try {
      // Remove shorts from search
      document.removeEventListener('scroll', () => handleScrollEvent(removeShortsFromSearch));
      document.removeEventListener('scrollend', () => removeShortsFromSearch);

      // Remove ads from search
      document.removeEventListener('scroll', () => handleScrollEvent(removeAdsFromSearch));
      document.removeEventListener('scrollend', removeAdsFromSearch);
    } catch (error) {
      console.error(`Error removing event listeners (there may not have been any): ${error}`);
    }
  
  }
}

// Content script event listener
browser.runtime.onMessage.addListener(msg => {
  (msg === "extensionStateChanged") ? checkExtensionRunning() : null
});

checkExtensionRunning();
setSectionsRemovedPage(0);
handleSectionRemovedChange("Page");

console.log("simpletube script running");