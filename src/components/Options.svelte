<script lang="ts">
  import { onMount } from "svelte";

  import Toastify from 'toastify-js'
  import "toastify-js/src/toastify.css"
  
  import { getDarkMode } from "../util/darkMode";
  import { clearSettings, getSettings, setSettings } from "../util/settingsHandler";

  import type settingsType from "../types/types";
  import { delay } from "../util/helpers";

  let settings:settingsType;
  let darkMode;

  let preventShortsToggle;
  let removeShortsFromSearchToggle;
  let removeShortsFromSiteToggle;
  let removeShortsPlaybackToggle;

  let shortsOptionsDisabled;

  let removeAdsFromReccomenationsToggle;
  let removeNewChannelsFromSearchToggle;
  let removeLatestPostsFromSearchToggle;
  let removeLastestVideosFromSearchToggle;
  let removePreviouslyWatchedFromSearchToggle;
  let removeForYouFromSearchToggle;
  let removePeopleAlsoWatchedFromSearchToggle;
  let removeFromRelatedSearchedToggle;
  let removePeopleAlsoSearchForToggle;

  async function optionsOpened() {
    await delay(500);
    settings = await getSettings();

    preventShortsToggle = settings.preventShorts;
    removeShortsFromSearchToggle = settings.removeShortsFromSearch;
    removeShortsFromSiteToggle = settings.removeShortsFromSite;
    removeShortsPlaybackToggle = settings.removeShortsPlayback;

    shortsOptionsDisabled = settings.shortsOptionsDisabled;

    removeAdsFromReccomenationsToggle = settings.removeAdsFromReccomendations;
    removeNewChannelsFromSearchToggle = settings.removeNewChannelsFromSearch;
    removeLatestPostsFromSearchToggle = settings.removeLatestPostsFromSearch;
    removeLastestVideosFromSearchToggle = settings.removeLastestVideosFromSearch;
    removePreviouslyWatchedFromSearchToggle = settings.removePreviouslyWatchedFromSearch;
    removeForYouFromSearchToggle = settings.removeForYouFromSearch;
    removePeopleAlsoWatchedFromSearchToggle = settings.removePeopleAlsoWatchedFromSearch;
    removeFromRelatedSearchedToggle = settings.removeFromRelatedSearches;
    removePeopleAlsoSearchForToggle = settings.removePeopleAlsoSearchFor;

    darkMode = await getDarkMode();
  }

  const makeToast = (customMsg?:string) => {

    const toast = Toastify({
      text: customMsg ? customMsg : "Settings updated. Reload Youtube for changes to take effect.",
      duration: 2500,
      close: true,
      gravity: "bottom",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "#ff0000",
        fontWeight: "500",
        borderRadius: "3px",
        color: "white",
        boxShadow: "0px 10px 38px -3px rgba(0,0,0,0.1)"
      }
    });

    return toast;

  }

  const handleResetSettings = () => {
    clearSettings();
    optionsOpened();
    makeToast("Settings reset to default. Reload Youtube for changes to take effect.").showToast();
  }

  const handlePreventShortsChange = async () => {
    await delay(500);
    let newSettings = await getSettings();

    await setSettings({"removeShortsFromSearch": true});
    await setSettings({"removeShortsFromSite": true});
    await setSettings({"removeShortsPlayback": true});

    (newSettings.preventShorts) ? setSettings({"shortsOptionsDisabled": true}) : setSettings({"shortsOptionsDisabled": false});

    await delay(500);
    await optionsOpened();
  }

  function handleSettingsChanged(setting:string) {

    switch (setting) {
      case "preventShorts":
        preventShortsToggle = !preventShortsToggle;
        setSettings({"preventShorts": preventShortsToggle});
        break;
      case "removeShortsFromSearch":
        removeShortsFromSearchToggle = !removeShortsFromSearchToggle;
        setSettings({"removeShortsFromSearch": removeShortsFromSearchToggle});
        break;
      case "removeAdsFromReccomendations":
        removeAdsFromReccomenationsToggle = !removeAdsFromReccomenationsToggle;
        setSettings({"removeAdsFromReccomendations": removeAdsFromReccomenationsToggle});
        break;
      case "removeNewChannelsFromSearch":
        removeNewChannelsFromSearchToggle = !removeNewChannelsFromSearchToggle;
        setSettings({"removeNewChannelsFromSearch": removeNewChannelsFromSearchToggle});
        break;
      case "removeLatestPostsFromSearch":
        removeLatestPostsFromSearchToggle = !removeLatestPostsFromSearchToggle;
        setSettings({"removeLatestPostsFromSearch": removeLatestPostsFromSearchToggle});
        break;
      case "removeLastestVideosFromSearch":
        removeLastestVideosFromSearchToggle = !removeLastestVideosFromSearchToggle;
        setSettings({"removeLastestVideosFromSearch": removeLastestVideosFromSearchToggle});
        break;
      case "removePreviouslyWatchedFromSearch":
        removePreviouslyWatchedFromSearchToggle = !removePreviouslyWatchedFromSearchToggle;
        setSettings({"removePreviouslyWatchedFromSearch": removePreviouslyWatchedFromSearchToggle});
        break;
      case "removeForYouFromSearch":
        removeForYouFromSearchToggle = !removeForYouFromSearchToggle;
        setSettings({"removeForYouFromSearch": removeForYouFromSearchToggle});
        break;
      case "removePeopleAlsoWatchedFromSearch":
        removePeopleAlsoWatchedFromSearchToggle = !removePeopleAlsoWatchedFromSearchToggle;
        setSettings({"removePeopleAlsoWatchedFromSearch": removePeopleAlsoWatchedFromSearchToggle});
        break;
      case "removeFromRelatedSearches":
        removeFromRelatedSearchedToggle = !removeFromRelatedSearchedToggle;
        setSettings({"removeFromRelatedSearches": removeFromRelatedSearchedToggle});
        break;
      case "removePeopleAlsoSearchFor":
        removePeopleAlsoSearchForToggle = !removePeopleAlsoSearchForToggle;
        setSettings({"removePeopleAlsoSearchFor": removePeopleAlsoSearchForToggle});
        break;
      case "removeShortsFromSite":
        removeShortsFromSiteToggle = !removeShortsFromSiteToggle;
        setSettings({"removeShortsFromSite": removeShortsFromSiteToggle});
        break;
      case "removeShortsPlayback":
        removeShortsPlaybackToggle = !removeShortsPlaybackToggle;
        setSettings({"removeShortsPlayback": removeShortsPlaybackToggle});
        break;
      default:
        break;
    }

    makeToast().showToast();
  }

  onMount(async () => {
    optionsOpened();
  });

</script>

<main class="w-full p-4 flex flex-col items-center select-none font-jost text-center" class:bg-custom-dark={darkMode}>
  <h1 class="font-semibold text-5xl mt-12 pb-4" class:text-white={darkMode}>Options</h1>
  <h2 class="font-semibold text-3xl mt-4 pb-4" class:text-white={darkMode}>General</h2>
  <div class="flex flex-col mb-6 pb-4">
    <div class="space-x-2">
      <input
        id="adsFromReccomendations" 
        type="checkbox"
        class="w-4 h-4 rounded-sm accent-[#FF0000]"
        checked={removeAdsFromReccomenationsToggle}
        on:change={() => handleSettingsChanged("removeAdsFromReccomendations")}
      />
      <label 
        for="adsFromReccomendations"
        class="text-xl" 
        class:text-white={darkMode}>
        Remove ads from reccomendations
      </label>
    </div>
    <p class="font-bold" class:text-white={darkMode}>Stops ads from appearing in the search page and homepage <br /> (does not block ads during video playback)</p>
  </div>
  <h2 class="font-semibold text-3xl mt-4 pb-4" class:text-white={darkMode}>Shorts</h2>
  <div class="flex flex-col mb-6">
    <div class="space-x-2">
      <input
        id="shortsFromSearch" 
        type="checkbox"
        class="w-4 h-4 rounded-sm accent-[#FF0000]"
        checked={preventShortsToggle}
        on:change={() => {
          handleSettingsChanged("preventShorts");
          handlePreventShortsChange();
        }}
      />
      <label 
        for="shortsFromSearch"
        class="text-xl" 
        class:text-white={darkMode}>
        Block Shorts
      </label>
    </div>
    <p class="font-bold" class:text-white={darkMode}>Completely block Shorts from the site</p>
  </div>
  <div class="flex flex-col mb-6">
    <div class="space-x-2">
      <input
        id="shortsFromSearch" 
        type="checkbox"
        class="w-4 h-4 rounded-sm accent-[#FF0000]"
        checked={removeShortsFromSearchToggle}
        disabled={shortsOptionsDisabled}
        on:change={() => handleSettingsChanged("removeShortsFromSearch")}
      />
      <label 
        for="shortsFromSearch"
        class="text-xl" 
        class:text-white={darkMode}>
        Remove Shorts from search
      </label>
    </div>
    <p class="font-bold" class:text-white={darkMode}>Stops Shorts from appearing in the search page</p>
  </div>
  <div class="flex flex-col mb-6">
    <div class="space-x-2">
      <input 
        id="removeShortsFromSite"
        type="checkbox"
        class="w-4 h-4 rounded-sm accent-[#FF0000]"
        checked={removeShortsFromSiteToggle}
        disabled={shortsOptionsDisabled}
        on:change={() => handleSettingsChanged("removeShortsFromSite")}
      />
      <label
        for="removeShortsFromSite"
        class="text-xl"
        class:text-white={darkMode}
      >
        Remove Shorts from site
      </label>
      <p class="font-bold text-center" class:text-white={darkMode}>Removes Shorts from being displayed anywhere on the site</p>
    </div>
  </div>
  <div class="flex flex-col mb-6">
    <div class="space-x-2">
      <input 
        id="removeShortsPlayback"
        type="checkbox"
        class="w-4 h-4 rounded-sm accent-[#FF0000]"
        checked={removeShortsPlaybackToggle}
        disabled={shortsOptionsDisabled}
        on:change={() => handleSettingsChanged("removeShortsPlayback")}
      />
      <label
        for="removeShortsPlayback"
        class="text-xl"
        class:text-white={darkMode}
      >
        Prevent Shorts Playback
      </label>
      <p class="font-bold text-center" class:text-white={darkMode}>Prevents all Shorts videos from playing once clicked</p>
    </div>
  </div>
  <h2 class="font-semibold text-3xl mt-4 pb-4" class:text-white={darkMode}>Search</h2>
  <div class="flex flex-col mb-6">
    <div class="space-x-2">
      <input 
        id="newChannelsFromSearch"
        type="checkbox"
        class="w-4 h-4 rounded-sm accent-[#FF0000]"
        checked={removeNewChannelsFromSearchToggle}
        on:change={() => handleSettingsChanged("removeNewChannelsFromSearch")}
      />
      <label
        for="newChannelsFromSearch"
        class="text-xl"
        class:text-white={darkMode}
      >
        Remove <em>Channels New To You</em>
      </label>
      <p class="font-bold text-center" class:text-white={darkMode}>Stops new unrelated channels being suggested <br /> in the search page</p>
    </div>
  </div>
  <div class="flex flex-col mb-6">
    <div class="space-x-2">
      <input 
        id="newChannelsFromSearch"
        type="checkbox"
        class="w-4 h-4 rounded-sm accent-[#FF0000]"
        checked={removeLatestPostsFromSearchToggle}
        on:change={() => handleSettingsChanged("removeLatestPostsFromSearch")}
      />
      <label
        for="latestPostsFromSearch"
        class="text-xl"
        class:text-white={darkMode}
      >
        Remove <em>Latest Posts from ...</em>
      </label>
      <p class="font-bold text-center" class:text-white={darkMode}>Removes the lastest community posts from <br /> channels appearing in the search page</p>
    </div>
  </div>
  <div class="flex flex-col mb-6">
    <div class="space-x-2">
      <input 
        id="latestVideosFromSearch"
        type="checkbox"
        class="w-4 h-4 rounded-sm accent-[#FF0000]"
        checked={removeLastestVideosFromSearchToggle}
        on:change={() => handleSettingsChanged("removeLastestVideosFromSearch")}
      />
      <label
        for="latestVideosFromSearch"
        class="text-xl"
        class:text-white={darkMode}
      >
        Remove <em>Latest Videos from ...</em>
      </label>
      <p class="font-bold text-center" class:text-white={darkMode}>Removes the lastest videos from <br /> channels appearing in the search page</p>
    </div>
  </div>
  <div class="flex flex-col mb-6">
    <div class="space-x-2">
      <input 
        id="removePreviouslyWatchedFromSearch"
        type="checkbox"
        class="w-4 h-4 rounded-sm accent-[#FF0000]"
        checked={removePreviouslyWatchedFromSearchToggle}
        on:change={() => handleSettingsChanged("removePreviouslyWatchedFromSearchToggle")}
      />
      <label
        for="removePreviouslyWatchedFromSearch"
        class="text-xl"
        class:text-white={darkMode}
      >
        Remove <em>Previously Watched</em>
      </label>
      <p class="font-bold text-center" class:text-white={darkMode}>Removes previously watched videos <br /> from appearing in the search page</p>
    </div>
  </div>
  <div class="flex flex-col mb-6">
    <div class="space-x-2">
      <input 
        id="removeForYouFromSearch"
        type="checkbox"
        class="w-4 h-4 rounded-sm accent-[#FF0000]"
        checked={removeForYouFromSearchToggle}
        on:change={() => handleSettingsChanged("removeForYouFromSearch")}
      />
      <label
        for="removeForYouFromSearch"
        class="text-xl"
        class:text-white={darkMode}
      >
        Remove <em>For You</em>
      </label>
      <p class="font-bold text-center" class:text-white={darkMode}>Removes general Youtube reccomendations <br /> from appearing in the search page</p>
    </div>
  </div>
  <div class="flex flex-col mb-6">
    <div class="space-x-2">
      <input 
        id="removePeopleAlsoWatchedFromSearch"
        type="checkbox"
        class="w-4 h-4 rounded-sm accent-[#FF0000]"
        checked={removePeopleAlsoWatchedFromSearchToggle}
        on:change={() => handleSettingsChanged("removePeopleAlsoWatchedFromSearch")}
      />
      <label
        for="removePeopleAlsoWatchedFromSearch"
        class="text-xl"
        class:text-white={darkMode}
      >
        Remove <em>People Also Watched</em>
      </label>
      <p class="font-bold text-center" class:text-white={darkMode}>Removes videos the people also watched <br /> from appearing in the search page</p>
    </div>
  </div>
  <div class="flex flex-col mb-6">
    <div class="space-x-2">
      <input 
        id="removeFromRelatedSearches"
        type="checkbox"
        class="w-4 h-4 rounded-sm accent-[#FF0000]"
        checked={removeFromRelatedSearchedToggle}
        on:change={() => handleSettingsChanged("removeFromRelatedSearches")}
      />
      <label
        for="removeFromRelatedSearches"
        class="text-xl"
        class:text-white={darkMode}
      >
        Remove <em>From Related Searches</em>
      </label>
      <p class="font-bold text-center" class:text-white={darkMode}>Removes videos suggested from related searches <br /> from appearing in the search page</p>
    </div>
  </div>
  <div class="flex flex-col mb-6">
    <div class="space-x-2">
      <input 
        id="removePeopleAlsoSearchFor"
        type="checkbox"
        class="w-4 h-4 rounded-sm accent-[#FF0000]"
        checked={removeFromRelatedSearchedToggle}
        on:change={() => handleSettingsChanged("removePeopleAlsoSearchFor")}
      />
      <label
        for="removePeopleAlsoSearchFor"
        class="text-xl"
        class:text-white={darkMode}
      >
        Remove <em>People Also Search For</em>
      </label>
      <p class="font-bold text-center" class:text-white={darkMode}>Removes videos people also search for <br /> from appearing in the search page</p>
    </div>
  </div>
  <button class:text-white={darkMode} on:click={handleResetSettings}>
    Reset settings to default
  </button>
</main>