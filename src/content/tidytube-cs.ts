import { browser } from "webextension-polyfill-ts";

import { getExtensionRunning } from "../util/extensionRunning";
import { getSettings } from "../util/settingsHandler";
import { getSectionsRemovedPage, getSectionsRemovedTotal, setSectionsRemovedPage, setSectionsRemovedTotal } from "../util/sectionsRemoved";
import { incremementPageChangeStore } from "../util/pageChangeStore";
import type { settingsType } from "../types/types";

import { 
  AdapterFR, 
  AdapterNL, 
  AdapterPT, 
  AdapterPT_BR, 
  AdapterRU, 
  AdapterDE, 
  AdapterES,
  AdapterIT,
  AdapterJP,
  AdapterKO,
  AdapterKK } from "../util/languageAdapter";

// Page runtime vars
let autoPlaySet = false;

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

    const shortsElementsArray = elementsToRemove ? [...reelShelves, ...richSections, ...richShelves] : null;

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
const removeAdsFromRecommendations = () => {
  const adSections = document.querySelectorAll('ytd-ad-slot-renderer');
  const adSectionsArray = [...adSections];

  const videos = Array.from(document.querySelectorAll('ytd-rich-item-renderer')).reverse();

  adSectionsArray.forEach(adSection => {

    try {
      if (window.location.href === "https://www.youtube.com/") {

        let randomVideoElement = videos[Math.floor(Math.random() * videos.length)];
        randomVideoElement.getElementsByTagName("div")[0].style.width = "100%";
        randomVideoElement.getElementsByTagName("div")[0].getElementsByTagName("div")[0].style.minWidth = "100%";

        adSection.parentNode.replaceChild(randomVideoElement, adSection);
      } else {
        adSection.parentElement.removeChild(adSection);
      }

      updateSectionsRemoveCount("removeAdsFromRecommendations");
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
      let validInOtherLanguage = 
      AdapterFR.ChannelsNewToYou.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) }) 
      || AdapterNL.ChannelsNewToYou.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterPT.ChannelsNewToYou.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterPT_BR.ChannelsNewToYou.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterRU.ChannelsNewToYou.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterDE.ChannelsNewToYou.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterES.ChannelsNewToYou.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterIT.ChannelsNewToYou.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterJP.ChannelsNewToYou.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterKO.ChannelsNewToYou.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterKK.ChannelsNewToYou.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) });

      if (span.innerText.toLowerCase().includes("channels new to you") || validInOtherLanguage) {
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

      let validInOtherLanguage = 
      AdapterFR.LatestPostsFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterNL.LatestPostsFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterPT.LatestPostsFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterPT_BR.LatestPostsFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterRU.LatestPostsFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterDE.LatestPostsFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterES.LatestPostsFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterIT.LatestPostsFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterJP.LatestPostsFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterKO.LatestPostsFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterKK.LatestPostsFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) });

      if (span.innerText.toLowerCase().includes("latest posts from") || validInOtherLanguage) {
        try {
          if (div.firstChild) { div.parentNode.removeChild(div) }
          updateSectionsRemoveCount("removeLatestPostsFromSearch");
          handleSectionRemovedChange()

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
      
      let validInOtherLanguage 
      = AdapterFR.LatestFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterNL.LatestFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterPT.LatestFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterPT_BR.LatestFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterRU.LatestFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterDE.LatestFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterES.LatestFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterIT.LatestFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterJP.LatestFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterKO.LatestFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterKK.LatestFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) });

      if (span.innerText.toLowerCase().includes("latest from") || validInOtherLanguage) {
        try {
          if (div.firstChild) { div.parentNode.removeChild(div) }
          updateSectionsRemoveCount("removeLatestVideosFromSearch");
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
      let validInOtherLanguage 
      = AdapterFR.PreviouslyWatched.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterNL.PreviouslyWatched.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterPT.PreviouslyWatched.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterPT_BR.PreviouslyWatched.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterRU.PreviouslyWatched.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterDE.PreviouslyWatched.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterES.PreviouslyWatched.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterIT.PreviouslyWatched.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterJP.PreviouslyWatched.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterKO.PreviouslyWatched.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterKK.PreviouslyWatched.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) });

      if (span.innerText.toLowerCase().includes("previously watched") || validInOtherLanguage) {
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
      let validInOtherLanguage 
      = AdapterFR.ForYou.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterNL.ForYou.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterPT.ForYou.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterPT_BR.ForYou.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterRU.ForYou.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterDE.ForYou.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterES.ForYou.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterIT.ForYou.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterJP.ForYou.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterKO.ForYou.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterKK.ForYou.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) });

      if (span.innerText.toLowerCase().includes("for you") || validInOtherLanguage) {
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
      let validInOtherLanguage 
      = AdapterFR.PeopleAlsoWatched.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterFR.PeopleAlsoWatched.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterPT.PeopleAlsoWatched.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterPT_BR.PeopleAlsoWatched.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterRU.PeopleAlsoWatched.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterDE.PeopleAlsoWatched.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterES.PeopleAlsoWatched.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterIT.PeopleAlsoWatched.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterJP.PeopleAlsoWatched.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterKO.PeopleAlsoWatched.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterKK.PeopleAlsoWatched.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) });

      if (span.innerText.toLowerCase().includes("people also watched") || validInOtherLanguage) {
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
      let validInOtherLanguage 
      = AdapterFR.FromRelatedSearches.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterNL.FromRelatedSearches.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterPT.FromRelatedSearches.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterPT_BR.FromRelatedSearches.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterRU.FromRelatedSearches.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterDE.FromRelatedSearches.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterES.FromRelatedSearches.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterIT.FromRelatedSearches.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterJP.FromRelatedSearches.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterKO.FromRelatedSearches.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterKK.FromRelatedSearches.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) });

      if (span.innerText.toLowerCase().includes("from related searches") || validInOtherLanguage) {
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
      let validInOtherLanguage 
      = AdapterFR.PeopleAlsoSearchFor.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterNL.PeopleAlsoSearchFor.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterPT.PeopleAlsoSearchFor.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterPT_BR.PeopleAlsoSearchFor.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterRU.PeopleAlsoSearchFor.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterDE.PeopleAlsoSearchFor.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterES.PeopleAlsoSearchFor.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterIT.PeopleAlsoSearchFor.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterJP.PeopleAlsoSearchFor.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterKO.PeopleAlsoSearchFor.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterKK.PeopleAlsoSearchFor.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) });

      if (span.innerText.toLowerCase().includes("people also search for") || validInOtherLanguage) {
        
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
      let validInOtherLanguage 
      = AdapterFR.PeopleAlsoSearchFor.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterNL.PeopleAlsoSearchFor.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterPT.PeopleAlsoSearchFor.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterPT_BR.PeopleAlsoSearchFor.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterRU.PeopleAlsoSearchFor.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterDE.PeopleAlsoSearchFor.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterES.PeopleAlsoSearchFor.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterIT.PeopleAlsoSearchFor.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterJP.PeopleAlsoSearchFor.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterKO.PeopleAlsoSearchFor.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterKK.PeopleAlsoSearchFor.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) });

      if (span.innerText.toLowerCase().includes("people also search for") || validInOtherLanguage) {
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
        let validInOtherLanguage 
        = AdapterFR.PeopleAlsoSearchFor.some(translation => { return (string.textContent.toLowerCase().includes(translation.toLowerCase())) })
        || AdapterNL.PeopleAlsoSearchFor.some(translation => { return (string.textContent.toLowerCase().includes(translation.toLowerCase())) })
        || AdapterPT.PeopleAlsoSearchFor.some(translation => { return (string.textContent.toLowerCase().includes(translation.toLowerCase())) })
        || AdapterPT_BR.PeopleAlsoSearchFor.some(translation => { return (string.textContent.toLowerCase().includes(translation.toLowerCase())) })
        || AdapterRU.PeopleAlsoSearchFor.some(translation => { return (string.textContent.toLowerCase().includes(translation.toLowerCase())) })
        || AdapterDE.PeopleAlsoSearchFor.some(translation => { return (string.textContent.toLowerCase().includes(translation.toLowerCase())) })
        || AdapterES.PeopleAlsoSearchFor.some(translation => { return (string.textContent.toLowerCase().includes(translation.toLowerCase())) })
        || AdapterIT.PeopleAlsoSearchFor.some(translation => { return (string.textContent.toLowerCase().includes(translation.toLowerCase())) })
        || AdapterJP.PeopleAlsoSearchFor.some(translation => { return (string.textContent.toLowerCase().includes(translation.toLowerCase())) })
        || AdapterKO.PeopleAlsoSearchFor.some(translation => { return (string.textContent.toLowerCase().includes(translation.toLowerCase())) })
        || AdapterKK.PeopleAlsoSearchFor.some(translation => { return (string.textContent.toLowerCase().includes(translation.toLowerCase())) });

        if (string.textContent.toLowerCase().includes("people also search for") || validInOtherLanguage) {
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
      let validInOtherLanguage 
      = AdapterFR.ShortsRemixingThisVideo.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterNL.ShortsRemixingThisVideo.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterPT.ShortsRemixingThisVideo.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterPT_BR.ShortsRemixingThisVideo.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterRU.ShortsRemixingThisVideo.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterDE.ShortsRemixingThisVideo.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterES.ShortsRemixingThisVideo.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterIT.ShortsRemixingThisVideo.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterJP.ShortsRemixingThisVideo.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterKO.ShortsRemixingThisVideo.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterKK.ShortsRemixingThisVideo.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) });

      if (span.innerText.toLowerCase().includes("shorts remixing this video") || validInOtherLanguage) {
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

  popupItemsArray?.forEach((popupItem:ChildNode) => {
    
    let skippedNode;
    let ignoreNodes = [
      "ytd-search-filter-options-dialog-renderer", 
      "yt-report-form-modal-renderer",
      "ytd-unified-share-panel-renderer",
      "ytd-offline-promo-renderer",
      "ytd-add-to-playlist-renderer"
    ];

    // Check if the node is one that shouldn't be skipped
    popupItem.childNodes.forEach(node => {
      if (ignoreNodes.indexOf(node.nodeName.toLowerCase()) == -1) {
        skippedNode = true;
      }
    });
    
    (popupItem.nodeName.toLowerCase() == "tp-yt-iron-dropdown") ? skippedNode = true : null;

    if (!skippedNode) {
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
      let validInOtherLanguage 
      = AdapterFR.news.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterNL.news.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterPT.news.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterPT_BR.news.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterRU.news.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterDE.news.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterES.news.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterIT.news.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterJP.news.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterKO.news.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterKK.news.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) });

      if (span.innerText.toLowerCase().includes("news") || validInOtherLanguage) {
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
      
      let validInOtherLanguage 
      = AdapterFR.LatestPostsFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      AdapterNL.LatestPostsFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterPT.LatestPostsFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterPT_BR.LatestPostsFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterRU.LatestPostsFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterDE.LatestPostsFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterES.LatestPostsFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterIT.LatestPostsFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterJP.LatestPostsFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterKO.LatestPostsFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) })
      || AdapterKK.LatestPostsFrom.some(translation => { return (span.innerText.toLowerCase().includes(translation.toLowerCase())) });

      if (span.innerText.toLowerCase().includes("for you") || validInOtherLanguage) {
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

// Remove recommended topics from search
const removeRecommendedTopicsFromSearch = () => {

  const allShelfRenderers = document.querySelectorAll("ytd-shelf-renderer");
  const allShelfRenderersArray = [...allShelfRenderers];

  allShelfRenderersArray.forEach(div => {

    let spans = div.querySelectorAll("span");
    [...spans].forEach((span) => {

      if (span.innerText.toLowerCase().includes("✨")) {
        try {
          if (div.firstChild) { div.parentNode.removeChild(div) }
          updateSectionsRemoveCount("removeRecommendedTopicsFromSearch");
          handleSectionRemovedChange();

          console.log("Recommended topic removed from search");
        } catch (error) {
          console.log(`Error removing latest sections`);
        }
      }
    });

  });

}

// Auto disable autoplay
const autoDisableAutoplay = () => {

  if (window.location.href.includes("https://www.youtube.com/watch")) {

    let autoPlayButtonElement = document.querySelector('[data-tooltip-target-id="ytp-autonav-toggle-button"]') as HTMLElement;
    let autoPlayButtonLabel = document.getElementsByClassName("ytp-autonav-toggle-button")[0];

    // If autoplay is checked
    if (autoPlayButtonLabel?.attributes.getNamedItem("aria-checked").value === "true") {

      if (!autoPlaySet) {
        autoPlayButtonElement.click();
        updateSectionsRemoveCount("autoDisableAutoplay");
        handleSectionRemovedChange();
        autoPlaySet = true;
      }
      
    }

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
  if (settings.removeAdsFromRecommendations) removeAdsFromRecommendations();

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

  // Remove recommended topics from search
  if (settings.removeRecommendedTopicsFromSearch) removeRecommendedTopicsFromSearch();

  // Auto disable autoplay
  if (settings.autoDisableAutoplay) autoDisableAutoplay();

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
