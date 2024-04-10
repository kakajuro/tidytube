<script lang="ts">
  import { onMount } from "svelte";

  import Toastify from 'toastify-js'
  import "toastify-js/src/toastify.css"
  
  import { getDarkMode } from "../util/darkMode";
  import { clearSettings, getSettings, setSettings } from "../util/settingsHandler";

  import type { settingsType } from "../types/types";
  import { delay } from "../util/helpers";
  
  import OptionsCard from "./OptionsCard.svelte";

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
  <OptionsCard 
    {darkMode} 
    toggle={removeAdsFromReccomenationsToggle} 
    handleChange={() => handleSettingsChanged("removeAdsFromReccomendations")}
    optionName="Remove ads from reccomendations"
    optionsDesc="Stops ads from appearing in the search page and homepage (does not block ads during video playback)"
  />
  <h2 class="font-semibold text-3xl mt-4 pb-4" class:text-white={darkMode}>Shorts</h2>
  <div class="grid gap-y-1 gap-x-1 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
    <OptionsCard 
      {darkMode} 
      toggle={preventShortsToggle} 
      handleChange={() => {
        handleSettingsChanged("preventShorts");
        handlePreventShortsChange();
      }}
      optionName="Block Shorts"
      optionsDesc="Completely block Shorts from the site"
    />
    <OptionsCard 
      {darkMode} 
      toggle={removeShortsFromSearchToggle} 
      handleChange={() => handleSettingsChanged("removeShortsFromSearch")}
      optionName="Remove Shorts from search"
      optionsDesc="Stops Shorts from appearing in the search page"
    />
    <OptionsCard 
      {darkMode} 
      toggle={removeShortsFromSiteToggle} 
      handleChange={() => handleSettingsChanged("removeShortsFromSite")}
      optionName="Remove Shorts from site"
      optionsDesc="Removes Shorts from being displayed anywhere on the site"
    />
    <OptionsCard 
      {darkMode} 
      toggle={removeShortsPlaybackToggle} 
      handleChange={() => handleSettingsChanged("removeShortsPlayback")}
      optionName="Prevent Shorts Playback"
      optionsDesc="Prevents all Shorts videos from playing once clicked"
    />
  </div>
  <h2 class="font-semibold text-3xl mt-4 pb-4" class:text-white={darkMode}>Search</h2>
  <div class="grid gap-y-1 gap-x-1 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
    <OptionsCard 
      {darkMode} 
      toggle={removeNewChannelsFromSearchToggle} 
      handleChange={() => handleSettingsChanged("removeNewChannelsFromSearch")}
      optionName="Remove <em>Channels New To You </em>"
      optionsDesc="Stops ads from appearing in the search page and homepage (does not block ads during video playback)"
    />
    <OptionsCard 
      {darkMode} 
      toggle={removeLatestPostsFromSearchToggle} 
      handleChange={() => handleSettingsChanged("removeLatestPostsFromSearch")}
      optionName="Remove <em>Latest Posts from ...</em>"
      optionsDesc="Removes the lastest community posts from <br /> channels appearing in the search page"
    />
    <OptionsCard 
      {darkMode} 
      toggle={removeLastestVideosFromSearchToggle} 
      handleChange={() => handleSettingsChanged("removeLastestVideosFromSearch")}
      optionName="Remove <em>Latest Videos from ...</em>"
      optionsDesc="Removes the lastest videos from <br /> channels appearing in the search page"
    />
    <OptionsCard 
      {darkMode} 
      toggle={removePreviouslyWatchedFromSearchToggle} 
      handleChange={() => handleSettingsChanged("removePreviouslyWatchedFromSearchToggle")}
      optionName="Remove <em>Previously Watched</em>"
      optionsDesc="Removes previously watched videos <br /> from appearing in the search page"
    />
    <OptionsCard 
      {darkMode} 
      toggle={removeForYouFromSearchToggle} 
      handleChange={() => handleSettingsChanged("removeForYouFromSearch")}
      optionName="Remove <em>For You</em>"
      optionsDesc="Removes general Youtube reccomendations <br /> from appearing in the search page"
    />
    <OptionsCard 
      {darkMode} 
      toggle={removePeopleAlsoWatchedFromSearchToggle} 
      handleChange={() => handleSettingsChanged("removePeopleAlsoWatchedFromSearch")}
      optionName="Remove <em>People Also Watched</em>"
      optionsDesc="Removes videos the people also watched <br /> from appearing in the search page"
    />
    <OptionsCard 
      {darkMode} 
      toggle={removeFromRelatedSearchedToggle} 
      handleChange={() => handleSettingsChanged("removeFromRelatedSearches")}
      optionName="Remove <em>From Related Searches</em>"
      optionsDesc="Removes videos suggested from related searches <br /> from appearing in the search page"
    />
    <OptionsCard 
      {darkMode} 
      toggle={removeFromRelatedSearchedToggle} 
      handleChange={() => handleSettingsChanged("removePeopleAlsoSearchFor")}
      optionName="Remove <em>People Also Search For</em>"
      optionsDesc="Removes videos people also search for <br /> from appearing in the search page"
    />
  </div>
  <button class="w-48 h-8 border border-black rounded transition-all hover:scale-105 ease-in-out duration-300" class:border-white={darkMode} class:text-white={darkMode} on:click={handleResetSettings}>
    Reset settings to default
  </button>
</main>