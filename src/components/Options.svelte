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

  let removeShortsFromSearchToggle;
  let removeAdsFromReccomenationsToggle;
  let removeNewChannelsFromSearchToggle;
  let removeLatestPostsFromSearchToggle;
  let removeLastestVideosFromSearchToggle;

  async function optionsOpened() {
    await delay(500);
    settings = await getSettings();

    removeShortsFromSearchToggle = settings.removeShortsFromSearch;
    removeAdsFromReccomenationsToggle = settings.removeAdsFromReccomendations;
    removeNewChannelsFromSearchToggle = settings.removeNewChannelsFromSearch;
    removeLatestPostsFromSearchToggle = settings.removeLatestPostsFromSearch;
    removeLastestVideosFromSearchToggle = settings.removeLastestVideosFromSearch;

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

  function handleSettingsChanged(setting:string) {

    switch (setting) {
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
      default:
        break;
    }

    makeToast().showToast();
  }

  onMount(async () => {
    optionsOpened();
  });

</script>

<main class="w-full h-screen p-4 flex flex-col items-center select-none font-jost" class:bg-custom-dark={darkMode}>
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
    <p class="font-bold" class:text-white={darkMode}>Stops ads from appearing in the search page and homepage</p>
  </div>
  <h2 class="font-semibold text-3xl mt-4 pb-4" class:text-white={darkMode}>Search</h2>
  <div class="flex flex-col mb-6">
    <div class="space-x-2">
      <input
        id="shortsFromSearch" 
        type="checkbox"
        class="w-4 h-4 rounded-sm accent-[#FF0000]"
        checked={removeShortsFromSearchToggle}
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
      <p class="font-bold text-center" class:text-white={darkMode}>Stops new unwanted channels being suggested <br /> in the search page</p>
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
  <button class:text-white={darkMode} on:click={handleResetSettings}>
    Reset settings to default
  </button>
</main>