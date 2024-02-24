import { browser } from "webextension-polyfill-ts";

import { getExtensionRunning } from "../../util/extensionRunning";
import { getSectionsRemovedPage, getSectionsRemovedTotal, setSectionsRemovedPage, setSectionsRemovedTotal } from "../../util/sectionsRemoved";
import { checkScrollDirectionIsUp } from "../../util/checkScollDirection";

// Remove Shorts on search page
const removeShortsFromSearch = () => {
  const shortsHomepageSections = document.querySelectorAll('ytd-reel-shelf-renderer');
  const shortsHomepageSectionsArray = [...shortsHomepageSections];

  shortsHomepageSectionsArray.forEach(div => {
    
    try {
      if (div.firstChild) { div.parentNode.removeChild(div) }
      updateSectionsRemoveCount();
      handleSectionRemovedChange()
      console.log("Shorts removed");
    } catch (error) {
      console.log(`Error in removing div: ${error}`);
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

// Check extension is running
async function checkExtensionRunning () {
  let extensionRunning = await getExtensionRunning();

  if (extensionRunning) {
    console.log("simpletube content script now running...");

    removeShortsFromSearch();
    document.addEventListener('scroll', () => handleScrollEvent(removeShortsFromSearch));
    document.addEventListener('scrollend', removeShortsFromSearch);
  } else {
    console.log("paused simpletube content script");

    try {
      document.removeEventListener('scroll', () => handleScrollEvent(removeEventListener));
      document.removeEventListener('scrollend', () => removeShortsFromSearch);
    } catch (error) {
      console.error(`Error removing CS event listeners (there may not have been any): ${error}`);
    }
  
  }
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
window.addEventListener("hashchange", () => {
  setSectionsRemovedPage(0);
  handleSectionRemovedChange("Page");
});

// Extension event listener
browser.runtime.onMessage.addListener(msg => {
  
  (msg === "extensionStateChanged") ? checkExtensionRunning() : null

});

checkExtensionRunning();
setSectionsRemovedPage(0);
handleSectionRemovedChange("Page");
console.log("simpletube script running");