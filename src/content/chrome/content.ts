import { browser } from "webextension-polyfill-ts";

import { getExtensionRunning } from "../../util/extensionRunning";

// Remove Shorts on search page
const removeShortsSearch = () => {
  console.log("Remove shorts");

  const shortsHomepageSections = document.querySelectorAll('ytd-reel-shelf-renderer');
  const shortsHomepageSectionsArray = [...shortsHomepageSections];

  console.log(shortsHomepageSectionsArray);
  
  shortsHomepageSectionsArray.forEach(div => {
    
    try {
      div.firstChild ? div.parentNode.removeChild(div) : null
      console.log("Individual div removed");
    } catch (error) {
      console.log(`Error in removing div: ${error}`);
    }
    
  });
}

async function checkExtensionRunning () {
  let extensionRunning = await getExtensionRunning();

  if (extensionRunning) {
    console.log("simpletube content script now running...");

    removeShortsSearch();
    document.addEventListener('scroll', removeShortsSearch);
    document.addEventListener('scrollend', removeShortsSearch);
  } else {
    console.log("paused simpletube content script");

    try {
      document.removeEventListener('scroll', removeShortsSearch);
      document.removeEventListener('scrollend', removeShortsSearch);
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