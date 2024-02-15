import { browser } from "webextension-polyfill-ts";

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

removeShortsSearch();
document.addEventListener('scroll', removeShortsSearch);
document.addEventListener('scrollend', removeShortsSearch);

console.log("From content script test");