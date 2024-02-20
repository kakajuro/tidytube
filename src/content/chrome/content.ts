import { browser } from "webextension-polyfill-ts";

import { getExtensionRunning } from "../../util/extensionRunning";
import { checkScrollDirectionIsUp } from "../../util/checkScollDirection";

// Remove Shorts on search page
const removeShortsFromSearch = () => {
  const shortsHomepageSections = document.querySelectorAll('ytd-reel-shelf-renderer');
  const shortsHomepageSectionsArray = [...shortsHomepageSections];

  shortsHomepageSectionsArray.forEach(div => {
    
    try {
      div.firstChild ? div.parentNode.removeChild(div) : null
      // add to sections removed
      // send message to update popup
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

browser.runtime.onMessage.addListener(msg => {
  
  (msg === "extensionStateChanged") ? checkExtensionRunning() : null

});

checkExtensionRunning();
console.log("simpletube script running");