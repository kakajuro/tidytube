import { browser } from "webextension-polyfill-ts";

import { getExtensionRunning } from "../util/extensionRunning";
import { getSettings } from "../util/settingsHandler";
import { getSectionsRemovedPage, getSectionsRemovedTotal, setSectionsRemovedPage, setSectionsRemovedTotal } from "../util/sectionsRemoved";
import { incremementPageChangeStore } from "../util/pageChangeStore";
import type { settingsType } from "../types/types";

//MARK: START OF REMOVING FUNCTIONS

// General remove element function
const generalRemoveElement = (elementName:string, sucessMsg:string, errorMsg:string, type?:string, customSectionUpdates?:Function):number => {

  const elements = document.querySelectorAll(elementName);
  const elementsArray = [...elements];
  let status;

  elementsArray.forEach(div => {
    
    try {
      if (div.firstChild) { div.parentNode.removeChild(div) }

      if (!customSectionUpdates) {
        updateSectionsRemoveCount(type);
        handleSectionRemovedChange();        
      } else {
        customSectionUpdates();
      }

      console.log(sucessMsg);
      status = 1;
    } catch (error) {
      console.warn(`${errorMsg}: ${error}`);
      status = 0;
    }
    
  });

  return status;

}

// Remove shorts that appear next to playing videos
const removeShortsWhileWatching = () => {
  if (window.location.href.includes("https://www.youtube.com/watch")) {

    const watchNextTab = document.querySelector('ytd-watch-next-secondary-results-renderer');
    const reelShelves = watchNextTab?.querySelectorAll('ytd-reel-shelf-renderer');
    const richSections = watchNextTab?.querySelectorAll('ytd-rich-section-renderer');
    const richShelves = watchNextTab?.querySelectorAll('ytd-rich-shelf-renderer');

    const elementsToRemove = reelShelves || richSections || richShelves;

    const shortsElementsArray = elementsToRemove ? [...reelShelves, ...richSections, ...richShelves].filter(e => e) : null;
    
    shortsElementsArray?.forEach(shortsElement => {
      try {
        shortsElement.parentNode.removeChild(shortsElement);
  
        updateSectionsRemoveCount("removeShortsWhileWatching");
        handleSectionRemovedChange();      
  
        console.log("Shorts section removed (while watching)");
      } catch (error) {
        console.warn(`Error removing ad section: ${error}`);
      }
    });
  }
}


// Remove Shorts on search page
const removeShortsFromSearch = () => {
  if (window.location.href.includes("https://www.youtube.com/results")) {
      generalRemoveElement('ytd-reel-shelf-renderer', "Shorts removed", "Error removing shorts", "removeShortsFromSearch");
  }
}

// Remove Shorts from the whole site
const removeShortsFromSite = () => {
  generalRemoveElement('[title="Shorts"]', "Shorts nav icon Removed", "Error removing Shorts nav icon");
}

// Prevent Shorts Playback
const preventShortsPlayback = () => {
  let removeAttemptOne = generalRemoveElement('ytd-reel-video-renderer', "Individual short removed", "Error removing short", "", () => {});
  let removeAttemptTwo = generalRemoveElement('div.action-container', "Shorts Playback Prevented", "Error preventing Shorts playback", "", () => {});
  let removeAttemptThree = generalRemoveElement('ytd-shorts', "Shorts Playback Prevented", "Error preventing Shorts playback", "", () => {});

  if (removeAttemptOne || removeAttemptTwo || removeAttemptThree) {
    updateSectionsRemoveCount("removeShortsPlayback");
    handleSectionRemovedChange();
  }
}

// Remove ad slots on search page
const removeAdsFromReccomendations = () => {
  const adSections = document.querySelectorAll('ytd-ad-slot-renderer');
  const adSectionsArray = [...adSections];

  adSectionsArray.forEach(adSection => {
    
    try {
      adSection.parentNode.removeChild(adSection);

      updateSectionsRemoveCount("removeAdsFromReccomendations");
      handleSectionRemovedChange();      

      console.log("Ad removed");
    } catch (error) {
      console.warn(`Error removing ad section: ${error}`);
    }
    
  });
}

// Remove "Channels new to you" from search
const removeNewChannelsFromSearch = () => {
  const allShelfRenderers = document.querySelectorAll("ytd-shelf-renderer");
  const allShelfRenderersArray = [...allShelfRenderers];

  allShelfRenderersArray.forEach(div => {

    let spans = div.querySelectorAll("span");
    [...spans].forEach((span) => {
      if (span.innerText.includes("Channels new to you")) {
        try {
          if (div.firstChild) { div.parentNode.removeChild(div) }
          updateSectionsRemoveCount("removeNewChannelsFromSearch");
          handleSectionRemovedChange();          

          console.log("New Channels section removed");
        } catch (error) {
          console.log(`Error removing New Channels sections`);
        }
      } 
    });

  });
}

// Remove "Latest Posts from ..." from search
const removeLatestPostsFromSearch = () => {
  const allShelfRenderers = document.querySelectorAll("ytd-shelf-renderer");
  const allShelfRenderersArray = [...allShelfRenderers];

  allShelfRenderersArray.forEach(div => {

    let spans = div.querySelectorAll("span");
    [...spans].forEach((span) => {
      if (span.innerText.includes("Latest posts from")) {
        try {
          if (div.firstChild) { div.parentNode.removeChild(div) }
          updateSectionsRemoveCount("removeLatestPostsFromSearch");
          handleSectionRemovedChange();          

          console.log("Latest posts section removed");
        } catch (error) {
          console.log(`Error removing latest posts sections`);
        }
      } 
    });

  });
}

// Remove "Latest Videos from ..." from search
const removeLatestVideosFromSearch = () => {
  const allShelfRenderers = document.querySelectorAll("ytd-shelf-renderer");
  const allShelfRenderersArray = [...allShelfRenderers];

  allShelfRenderersArray.forEach(div => {

    let spans = div.querySelectorAll("span");
    [...spans].forEach((span) => {
      if (span.innerText.includes("Latest from")) {
        try {
          if (div.firstChild) { div.parentNode.removeChild(div) }
          updateSectionsRemoveCount("removeLastestVideosFromSearch");
          handleSectionRemovedChange();          

          console.log("Latest videos section removed");
        } catch (error) {
          console.log(`Error removing latest sections`);
        }
      } 
    });

  });
}

// Remove "Previously watched" from search
const removePreviouslyWatchedFromSearch = () => {
  const allShelfRenderers = document.querySelectorAll("ytd-shelf-renderer");
  const allShelfRenderersArray = [...allShelfRenderers];

  allShelfRenderersArray.forEach(div => {

    let spans = div.querySelectorAll("span");
    [...spans].forEach((span) => {
      if (span.innerText.includes("Previously watched")) {
        try {
          if (div.firstChild) { div.parentNode.removeChild(div) }
          updateSectionsRemoveCount("removePreviouslyWatchedFromSearch");
          handleSectionRemovedChange();          

          console.log("Previously watched videos section removed");
        } catch (error) {
          console.log(`Error removing latest sections`);
        }
      } 
    });

  });
}

// Remove "For You" from search
const removeForYouFromSearch = () => {
  const allShelfRenderers = document.querySelectorAll("ytd-shelf-renderer");
  const allShelfRenderersArray = [...allShelfRenderers];

  allShelfRenderersArray.forEach(div => {

    let spans = div.querySelectorAll("span");
    [...spans].forEach((span) => {
      if (span.innerText.includes("For you")) {
        try {
          if (div.firstChild) { div.parentNode.removeChild(div) }
          updateSectionsRemoveCount("removeForYouFromSearch");
          handleSectionRemovedChange();          

          console.log("For you section removed");
        } catch (error) {
          console.log(`Error removing latest sections`);
        }
      } 
    });

  });
}

// Remove "People Also Watched" from search
const removePeopleAlsoWatchedFromSearch = () => {
  const allShelfRenderers = document.querySelectorAll("ytd-shelf-renderer");
  const allShelfRenderersArray = [...allShelfRenderers];

  allShelfRenderersArray.forEach(div => {

    let spans = div.querySelectorAll("span");
    [...spans].forEach((span) => {
      if (span.innerText.includes("People also watched")) {
        try {
          if (div.firstChild) { div.parentNode.removeChild(div) }
          updateSectionsRemoveCount("removePeopleAlsoWatchedFromSearch");
          handleSectionRemovedChange();          

          console.log("People also watched section removed");
        } catch (error) {
          console.log(`Error removing latest sections`);
        }
      } 
    });

  });
}

// Remove "From Related Searches" from search
const removeFromRelatedSearches = () => {
  const allShelfRenderers = document.querySelectorAll("ytd-shelf-renderer");
  const allShelfRenderersArray = [...allShelfRenderers];

  allShelfRenderersArray.forEach(div => {

    let spans = div.querySelectorAll("span");
    [...spans].forEach((span) => {
      if (span.innerText.includes("From related searches")) {
        try {
          if (div.firstChild) { div.parentNode.removeChild(div) }
          updateSectionsRemoveCount("removeFromRelatedSearches");
          handleSectionRemovedChange();          

          console.log("From related searches removed");
        } catch (error) {
          console.log(`Error removing latest sections`);
        }
      } 
    });

  });
}

// Remove "People Also Search For" from search
const removePeopleAlsoSearchFor = () => {
  const allShelfRenderers = document.querySelectorAll("ytd-shelf-renderer");
  const allShelfRenderersArray = [...allShelfRenderers];

  allShelfRenderersArray.forEach(div => {

    let spans = div.querySelectorAll("span");
    [...spans].forEach((span) => {
      if (span.innerText.includes("People also search for")) {
        try {
          if (div.firstChild) { div.parentNode.removeChild(div) }
          updateSectionsRemoveCount("removePeopleAlsoSearchFor");
          handleSectionRemovedChange();          

          console.log("People also search for section removed");
        } catch (error) {
          console.log(`Error removing latest sections`);
        }
      } 
    });

  });

  const cardListRenderers = document.querySelectorAll("ytd-horizontal-card-list-renderer");
  const cardListRenderersArray = [...cardListRenderers];

  cardListRenderersArray.forEach(div => {

    let removedDivAlready;

    let spans = div.querySelectorAll("span");
    [...spans].forEach((span) => {
      if (span.innerText.includes("People also search for")) {
        try {
          if (div.firstChild) { div.parentNode.removeChild(div) }
          removedDivAlready = true;
          updateSectionsRemoveCount("removePeopleAlsoSearchFor");
          handleSectionRemovedChange();          

          console.log("People also search for section removed");
        } catch (error) {
          console.log(`Error removing latest sections`);
        }
      } 
    });

    if (!removedDivAlready) {
      let formattedStrings = div.querySelectorAll("yt-formatted-string");
      [...formattedStrings].forEach((string) => {
        if (string.textContent.includes("People also search for")) {
          try {
            if (div.firstChild) { div.parentNode.removeChild(div) }
            updateSectionsRemoveCount("removePeopleAlsoSearchFor");
            handleSectionRemovedChange();          

            console.log("People also search for section removed");
          } catch (error) {
            console.log(`Error removing latest sections`);
          }
        } 
      });
    }

  });
}

// Remove featured banners
const removeFeaturedBanners = () => {
  generalRemoveElement("ytd-statement-banner-renderer", "Featured Banner removed", "Error removing featured banner", "removeFeaturedBanners");
  generalRemoveElement("ytd-brand-video-shelf-renderer", "Featured Banner removed", "Error removing featured banner", "removeFeaturedBanners");
  generalRemoveElement("ytd-banner-promo-renderer", "Promotional banner removed", "Error removing promotional banner", "removeFeaturedBanners");
}

// Remove Shorts Remixing This Video
const removeShortsRemixingThisVideo = () => {
  const allShelfRenderers = document.querySelectorAll("ytd-reel-shelf-renderer");
  const allShelfRenderersArray = [...allShelfRenderers];

  allShelfRenderersArray.forEach(div => {

    let spans = div.querySelectorAll("span");
    [...spans].forEach((span) => {
      if (span.innerText.includes("Shorts remixing this video")) {
        try {
          if (div.firstChild) { div.parentNode.removeChild(div) }
          updateSectionsRemoveCount("removeShortsRemixingThisVideo");
          handleSectionRemovedChange();          

          console.log("Shorts remixing this video section removed");
        } catch (error) {
          console.log(`Error removing shorts remixing this video section`);
        }
      } 
    });

  });
}

// Remove popups
const removePopups = () => {
  let popupItemsArray;
  let popupItems = document.querySelector("ytd-popup-container")?.childNodes;
  popupItems ? popupItemsArray = [...popupItems] : null;

  popupItemsArray?.forEach(popupItem => {

    let toRemove = !(popupItem.nodeName.toLowerCase() == "tp-yt-iron-dropdown")

    if (toRemove) {
      popupItem.parentNode.removeChild(popupItem);
      updateSectionsRemoveCount("removePopups");
      handleSectionRemovedChange();

      console.log("Popup removed");
    }
  });

}

// Remove ad companion slots
const removeAdCompanions = () => {
  generalRemoveElement("ytd-companion-slot-renderer", "Removed ad companion widget", "Error removing ad companion widget", "removeAdCompanionSlots");
}

// Remove Shorts from explore pages
const removeShortsExplore = () => {
  const currentURL = window.location.href; 
  
  let canRemoveShorts = currentURL.includes("https://www.youtube.com/feed/trending") || currentURL.includes("https://www.youtube.com/feed/subscriptions") || (window.location.pathname === "/");

  if (canRemoveShorts) {
    generalRemoveElement("ytd-reel-shelf-renderer", "Shorts removed (explore)", "Error removing shorts", "removeShortsExplore");
    generalRemoveElement("ytd-rich-section-renderer", "Shorts removed (explore)", "Error removing Shorts section", "removeShortsExplore");
    generalRemoveElement("ytd-rich-shelf-renderer", "Shorts removed (explore)", "Error removing Shorts section", "removeShortsExplore");
  }

}

// Remove news feeds
const removeNews = () => {
  let allShelfRenderers = document.querySelectorAll("ytd-rich-shelf-renderer");
  let allShelfRenderersArray = [...allShelfRenderers];

  allShelfRenderersArray.forEach(div => {
    let spans = document.querySelectorAll("span");
    [...spans].forEach(span => {
      if (span.innerText.includes("news")) {
        try {
          if (div.firstChild) { div.parentNode.removeChild(div) }
          updateSectionsRemoveCount("removeNews");
          handleSectionRemovedChange();          

          console.log("News section removed");
        } catch (error) {
          console.log(`Error removing news section: ${error}`);
        }
      } 
    })
  });

}

// Remove "For You" sections on channel pages
const removeForYouFromChannel = () => {
  let allShelfRenderers = document.querySelectorAll("ytd-shelf-renderer");
  let allShelfRenderersArray = [...allShelfRenderers];

  allShelfRenderersArray.forEach(div => {
    let spans = document.querySelectorAll("span");
    [...spans].forEach(span => {
      if (span.innerText.includes("For You")) {
        try {
          if (div.firstChild) { div.parentNode.removeChild(div) }
          updateSectionsRemoveCount("removeForYouFromChannel");
          handleSectionRemovedChange();          

          console.log("For You channel section removed");
        } catch (error) {
          console.log(`Error removing For You channel section: ${error}`);
        }
      } 
    })
  });
}

// Remove Shorts from channel pages
const removeShortsFromChannel = () => {

  const currentURL = window.location.href;
  const onChannelPage = currentURL.includes("https://www.youtube.com/c/") || currentURL.includes("https://www.youtube.com/@");

  if (onChannelPage) {
    let shortsTabIcon = document.querySelector("[tab-title='Shorts']");
    let shortsTabParent = shortsTabIcon?.parentNode;
    if (shortsTabIcon) shortsTabParent?.removeChild(shortsTabIcon);

    generalRemoveElement("ytd-reel-shelf-renderer", "Shorts removed from channel page", "Error removing shorts", "removeShortsFromChannel");
    generalRemoveElement("ytd-rich-section-renderer", "Shorts removed from channel page", "Error removing Shorts section", "removeShortsFromChannel");
    generalRemoveElement("ytd-rich-shelf-renderer", "Shorts removed from channel page", "Error removing Shorts section", "removeShortsFromChannel");
  }

}

// Remove broken loading spinners from search when page loaded
// Sometimes the loading spinner at the top of the search page will stay on screen
// without loading new content so this will remove it if it stays there
const removeSpinnerFromSearch = () => {

  if (window.location.href.includes("https://www.youtube.com/results")) {
  
    const sectionListRendererContent = document.getElementById("contents")?.getElementsByClassName("ytd-section-list-renderer");
    
    // Removes all but the last spinner
    for (let currentItem = 0; currentItem < sectionListRendererContent?.length-1; currentItem++) {

      if (sectionListRendererContent && sectionListRendererContent[currentItem].tagName.toLowerCase() == "ytd-continuation-item-renderer") {

        const spinner:Element = sectionListRendererContent[currentItem].querySelector("tp-yt-paper-spinner");
        spinner?.parentNode.removeChild(spinner);

      }

    }
    
  }

}

//MARK: END OF REMOVING FUNCTIONS

// Handle sections remove change
const handleSectionRemovedChange = (type?:String) => {
  if (type === "Page") {
    browser.runtime.sendMessage(null, `sectionsRemoved${type}Changed`)
    .catch((error) => console.warn("Could not establish connection. Receiving end does not exist - from HSRC (ignore)")) 
  } else {
    browser.runtime.sendMessage(null, `sectionsRemovedBothChanged`) 
    .catch((error) => console.warn("Could not establish connection. Receiving end does not exist - from HSRC (ignore)")) 
  }
}

// Update the sections removed ocunt when a section is removed + page change data
const updateSectionsRemoveCount = async (type:string) => {
  let newSectionsRemovedPage = await getSectionsRemovedPage();
  let newSectionsRemovedTotal = await getSectionsRemovedTotal();

  newSectionsRemovedPage +=1;
  newSectionsRemovedTotal +=1;

  setSectionsRemovedPage(newSectionsRemovedPage);
  setSectionsRemovedTotal(newSectionsRemovedTotal);

  await incremementPageChangeStore(type);

  browser.runtime.sendMessage("BGupdateTabStore");
}

// Check extension is running
async function checkExtensionRunning () {
  let extensionRunning = await getExtensionRunning();

  if (extensionRunning) {
    console.log("tidytube content script now running...");
    runExtension();

  } else {
    observer.disconnect();
    console.log("paused tidytube content script");

  }
}

async function runExtension() {
  let settings:settingsType = await getSettings();

  // Remove shorts from search
  if (settings.removeShortsFromSearch) removeShortsFromSearch();

  // Remove ads from search
  if (settings.removeAdsFromReccomendations) removeAdsFromReccomendations();

  // Remove "Channels new to you" from search
  if (settings.removeNewChannelsFromSearch) removeNewChannelsFromSearch();

  // Remove "Latest Posts from ..." from search
  if (settings.removeLatestPostsFromSearch) removeLatestPostsFromSearch();

  // Remove "Latest Videos from ..." from search
  if (settings.removeLastestVideosFromSearch) removeLatestVideosFromSearch();

  // Remove "Previously watched" from search
  if (settings.removePreviouslyWatchedFromSearch) removePreviouslyWatchedFromSearch();

  // Remove "For You" from search
  if (settings.removeForYouFromSearch) removeForYouFromSearch();

  // Remove "People also watched" from search
  if (settings.removePeopleAlsoWatchedFromSearch) removePeopleAlsoWatchedFromSearch();

  // Remove "From Related Searches" from search
  if (settings.removeFromRelatedSearches) removeFromRelatedSearches();

  // Remove "People Also Search For" from search
  if (settings.removePeopleAlsoSearchFor) removePeopleAlsoSearchFor();

  // Remove Shorts From Site
  if (settings.removeShortsFromSite) removeShortsFromSite();

  // Prevent Shorts Playback
  if (settings.removeShortsPlayback) preventShortsPlayback();

  // Remove featured banners
  if (settings.removeFeaturedBanners) removeFeaturedBanners();

  // Remove shorts remixing this video
  if (settings.removeShortsRemixingThisVideo) removeShortsRemixingThisVideo();

  // Remove shorts from appearing on the reccomended sidebar
  if (settings.removeShortsWhileWatching) removeShortsWhileWatching();

  // Remove popups from appearing
  if (settings.removePopups) removePopups();

  // Remove ad companions
  if (settings.removeAdCompanionSlots) removeAdCompanions();

  // Remove Shorts explore
  if (settings.removeShortsExplore) removeShortsExplore();

  // Remove news
  if (settings.removeNews) removeNews();

  // Remove "For You" from channel
  if (settings.removeForYouFromChannel) removeForYouFromChannel();

  // Remove Shorts from channel pages
  if (settings.removeShortsFromChannel) removeShortsFromChannel();

  // Handle removal of broken loading spinners
  removeSpinnerFromSearch();
}

// Mutation Observer 
let observerConfig = {
  subtree : true,
  childList: true,
};

const mutationQueue = [];

// Queue mechanic helps debounce mutations (?)
const observer = new MutationObserver((mutationRecords, observer) => {
  if (!mutationQueue.length) requestAnimationFrame(() => {
    for (let mutation of mutationQueue) {
      runExtension();
    }
    mutationQueue.length = 0;
  });
  mutationQueue.push(mutationRecords);
});

let container = document.documentElement || document.body
observer.observe(container, observerConfig);

// Content script event listener
browser.runtime.onMessage.addListener(msg => {
  (msg === "extensionStateChanged") ? checkExtensionRunning() : null;
});

// Startup
checkExtensionRunning();
setSectionsRemovedPage(0);
handleSectionRemovedChange("Page");

console.log("tidytube loaded");
