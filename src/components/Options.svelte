<script lang="ts">
  import { onMount } from "svelte";

  import Toastify from 'toastify-js'
  import "toastify-js/src/toastify.css"

  import { getDarkMode } from "../util/darkMode";
  import { getManifestVer } from "../util/getManifestVersion";
  import { clearSettings, getSettings, setSettings } from "../util/settingsHandler";

  import type { settingsType } from "../types/types";
  import { delay } from "../util/helpers";

  import OptionsCard from "./OptionsCard.svelte";

  let settings:settingsType;
  let darkMode;
  let version = getManifestVer();

  let preventShortsToggle;
  let removeShortsFromSearchToggle;
  let removeShortsFromSiteToggle;
  let removeShortsPlaybackToggle;
  let removeShortsRemixingThisVideoToggle;
  let removeShortsWhileWatchingToggle;
  let removeShortsExploreToggle;
  let removeShortsFromChannelToggle;

  let shortsOptionsDisabled;
  let shortsOnSiteDisabled;

  let removeNewChannelsFromSearchToggle;
  let removeLatestPostsFromSearchToggle;
  let removeLastestVideosFromSearchToggle;
  let removePreviouslyWatchedFromSearchToggle;
  let removeForYouFromSearchToggle;
  let removePeopleAlsoWatchedFromSearchToggle;
  let removeFromRelatedSearchedToggle;
  let removePeopleAlsoSearchForToggle;
  let removeExploreMoreFromSearchToggle;

  let removeAdsFromRecommendationsToggle;
  let removeAdCompanionSlotsToggle;
  let removeFeaturedBannersToggle;
  let removePopupsToggle;
  let removeNewsToggle;
  let removeForYouFromChannelPageToggle;
  let autoDisableAutoplayToggle;
  let removeRecommendedTopicsFromSearchToggle;

  let disableTelemetryToggle;

  async function optionsOpened() {
    await delay(500);
    settings = await getSettings();

    preventShortsToggle = settings.preventShorts;
    removeShortsFromSearchToggle = settings.removeShortsFromSearch;
    removeShortsFromSiteToggle = settings.removeShortsFromSite;
    removeShortsPlaybackToggle = settings.removeShortsPlayback;
    removeShortsRemixingThisVideoToggle = settings.removeShortsRemixingThisVideo;
    removeShortsWhileWatchingToggle = settings.removeShortsWhileWatching;
    removeShortsExploreToggle = settings.removeShortsExplore;
    removeShortsFromChannelToggle = settings.removeShortsFromChannel;

    shortsOptionsDisabled = settings.shortsOptionsDisabled;
    shortsOnSiteDisabled = settings.shortsOnSiteDisabled;

    removeNewChannelsFromSearchToggle = settings.removeNewChannelsFromSearch;
    removeLatestPostsFromSearchToggle = settings.removeLatestPostsFromSearch;
    removeLastestVideosFromSearchToggle = settings.removeLastestVideosFromSearch;
    removePreviouslyWatchedFromSearchToggle = settings.removePreviouslyWatchedFromSearch;
    removeForYouFromSearchToggle = settings.removeForYouFromSearch;
    removePeopleAlsoWatchedFromSearchToggle = settings.removePeopleAlsoWatchedFromSearch;
    removeFromRelatedSearchedToggle = settings.removeFromRelatedSearches;
    removePeopleAlsoSearchForToggle = settings.removePeopleAlsoSearchFor;
    removeExploreMoreFromSearchToggle = settings.removeExploreMoreFromSearch;

    removeAdsFromRecommendationsToggle = settings.removeAdsFromRecommendations;
    removeAdCompanionSlotsToggle = settings.removeAdCompanionSlots;
    removeFeaturedBannersToggle = settings.removeFeaturedBanners;
    removePopupsToggle = settings.removePopups;
    removeNewsToggle = settings.removeNews;
    removeForYouFromChannelPageToggle = settings.removeForYouFromChannel;
    autoDisableAutoplayToggle = settings.autoDisableAutoplay;
    removeRecommendedTopicsFromSearchToggle = settings.removeRecommendedTopicsFromSearch;

    disableTelemetryToggle = settings.disableTelemetry;

    darkMode = await getDarkMode();

    if (removeShortsFromSiteToggle) handleRemoveShortsFromSite("nodisable");
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
    await setSettings({"removeShortsFromChannel": true});

    await handleRemoveShortsFromSite();
    setSettings({"shortsOptionsDisabled": newSettings.preventShorts});

    await optionsOpened();
  }

  const handleRemoveShortsFromSite = async (nodisable?:string) => {
    await delay(500);
    let newSettings = await getSettings();

    await setSettings({"removeShortsFromSearch": true});
    await setSettings({"removeShortsRemixingThisVideo": true});
    await setSettings({"removeShortsWhileWatching": true});
    await setSettings({"removeShortsExplore": true});
    await setSettings({"removeShortsFromChannel": true});

    nodisable ? null : setSettings({"shortsOnSiteDisabled": newSettings.removeShortsFromSite});

    await optionsOpened();
  }

  function handleSettingsChanged(setting:string) {

    switch (setting) {
      case "preventShorts":
        preventShortsToggle = !preventShortsToggle;
        setSettings({"preventShorts": preventShortsToggle});
        break;
      case "removeShortsFromSite":
        removeShortsFromSiteToggle = !removeShortsFromSiteToggle;
        setSettings({"removeShortsFromSite": removeShortsFromSiteToggle});
        break;
      case "removeShortsFromSearch":
        removeShortsFromSearchToggle = !removeShortsFromSearchToggle;
        setSettings({"removeShortsFromSearch": removeShortsFromSearchToggle});
        break;
      case "removeAdsFromRecommendations":
        removeAdsFromRecommendationsToggle = !removeAdsFromRecommendationsToggle;
        setSettings({"removeAdsFromRecommendations": removeAdsFromRecommendationsToggle});
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
      case "removeShortsPlayback":
        removeShortsPlaybackToggle = !removeShortsPlaybackToggle;
        setSettings({"removeShortsPlayback": removeShortsPlaybackToggle});
        break;
      case "removeFeaturedBanners":
        removeFeaturedBannersToggle = !removeFeaturedBannersToggle;
        setSettings({"removeFeaturedBanners": removeFeaturedBannersToggle});
        break;
      case "removeShortsRemixingThisVideo":
        removeShortsRemixingThisVideoToggle = !removeShortsRemixingThisVideoToggle;
        setSettings({"removeShortsRemixingThisVideo": removeShortsRemixingThisVideoToggle});
        break;
      case "removeShortsWhileWatching":
        removeShortsWhileWatchingToggle = !removeShortsWhileWatchingToggle;
        setSettings({"removeShortsWhileWatchingToggle": removeShortsWhileWatchingToggle});
        break;
      case "removePopups":
        removePopupsToggle = !removePopupsToggle;
        setSettings({"removePopups": removePopupsToggle});
        break;
      case "removeAdCompanionSlots":
        removeAdCompanionSlotsToggle = !removeAdCompanionSlotsToggle;
        setSettings({"removeAdCompanionSlots": removeAdCompanionSlotsToggle});
        break;
      case "removeShortsExplore":
        removeShortsExploreToggle = !removeShortsExploreToggle;
        setSettings({"removeShortsExplore": removeShortsExploreToggle});
        break;
      case "removeNews":
        removeNewsToggle = !removeNewsToggle;
        setSettings({"removeNews": removeNewsToggle});
        break;
      case "removeForYouFromChannel":
        removeForYouFromChannelPageToggle = !removeForYouFromChannelPageToggle;
        setSettings({"removeForYouFromChannel": removeForYouFromChannelPageToggle});
        break;
      case "removeShortsFromChannel":
        removeNewChannelsFromSearchToggle = !removeShortsFromChannelToggle;
        setSettings({"removeShortsFromChannel": removeShortsFromChannelToggle});
        break;
      case "removeRecommendedTopicsFromSearch":
        removeRecommendedTopicsFromSearchToggle = !removeRecommendedTopicsFromSearchToggle;
        setSettings({"removeRecommendedTopicsFromSearch": removeRecommendedTopicsFromSearchToggle});
        break;
      case "removeExploreMoreFromSearch":
        removeExploreMoreFromSearchToggle = !removeExploreMoreFromSearchToggle;
        setSettings({"removeExploreMoreFromSearch": removeExploreMoreFromSearchToggle});
        break;
      case "autoDisableAutoplay":
        autoDisableAutoplayToggle = !autoDisableAutoplayToggle;
        setSettings({"autoDisableAutoplay": autoDisableAutoplayToggle});
        break;
      case "disableTelemetry":
        disableTelemetryToggle = !disableTelemetryToggle;
        setSettings({"disableTelemetry": disableTelemetryToggle});

        if (disableTelemetryToggle) {
          makeToast("Settings updated. Data will no longer be sent to server.").showToast();
        } else {
          makeToast("Settings updated. Data will be sent to server.").showToast();
        }

        break;
      default:
        break;
    }

    if (!(setting == "disableTelemetry")) {
      makeToast().showToast();
    }

  }

  onMount(async () => {
    optionsOpened();
  });

</script>

<main class="w-full p-4 flex flex-col items-center select-none font-jost text-center" class:bg-custom-dark={darkMode}>
  <h1 class="font-semibold text-5xl mt-12 pb-4" class:text-white={darkMode}>Options</h1>
  <h2 class="font-semibold text-3xl mt-4 pb-4" class:text-white={darkMode}>General</h2>
  <div class="grid gap-x-1 gap-y-1 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
    <OptionsCard
      {darkMode}
      toggle={removeAdsFromRecommendationsToggle}
      handleChange={() => handleSettingsChanged("removeAdsFromRecommendations")}
      optionName="Remove ads from recommendations"
      optionsDesc="Stops ads from appearing in the search page and homepage (does not block ads during video playback)"
    />
    <OptionsCard
      {darkMode}
      toggle={removeFeaturedBannersToggle}
      handleChange={() => handleSettingsChanged("removeFeaturedBanners")}
      optionName="Remove featured banners"
      optionsDesc="Stops featured banners from appearing on the homepage of search"
    />
    <OptionsCard
      {darkMode}
      toggle={removePopupsToggle}
      handleChange={() => handleSettingsChanged("removePopups")}
      optionName="Remove popups"
      optionsDesc="Stops promotional popups from appearing"
    />
    <OptionsCard
      {darkMode}
      toggle={removeAdCompanionSlotsToggle}
      handleChange={() => handleSettingsChanged("removeAdCompanionSlots")}
      optionName="Remove Ad Companions"
      optionsDesc="Stops ad companion slots from appearing (small clickable ad widgets next to videos)"
    />
    <OptionsCard
      {darkMode}
      toggle={removeForYouFromChannelPageToggle}
      handleChange={() => handleSettingsChanged("removeForYouFromChannel")}
      optionName="Remove <em>For You</em> From Channel page"
      optionsDesc="Removes <em>For You</em> recommended videos appearing on a channel's page"
    />
    <OptionsCard
      {darkMode}
      toggle={removeNewsToggle}
      handleChange={() => handleSettingsChanged("removeNews")}
      optionName="Remove News Sections"
      optionsDesc="Remove the news sections from appearing on the homepage"
    />
    <OptionsCard
      {darkMode}
      toggle={autoDisableAutoplayToggle}
      handleChange={() => handleSettingsChanged("autoDisableAutoplay")}
      optionName="Auto Disable Autoplay"
      optionsDesc="Sets autoplay to always be disabled by default"
    />
  </div>
  <h2 class="font-semibold text-3xl mt-4 pb-4" class:text-white={darkMode}>Shorts</h2>
  <div class="grid gap-x-1 gap-y-1 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
    <OptionsCard
      {darkMode}
      toggle={preventShortsToggle}
      handleChange={() => {
        handleSettingsChanged("preventShorts");
        handlePreventShortsChange();
      }}
      optionName="Block Shorts"
      optionsDesc="Completely block Shorts from the site (prevents Shorts playback)"
    />
    <OptionsCard
      {darkMode}
      toggle={removeShortsFromSiteToggle}
      handleChange={() => {
        handleSettingsChanged("removeShortsFromSite");
        handleRemoveShortsFromSite();
      }}
      disabled={shortsOptionsDisabled}
      optionName="Remove Shorts from site"
      optionsDesc="Removes Shorts from being displayed anywhere on the site"
    />
    <OptionsCard
      {darkMode}
      toggle={removeShortsFromSearchToggle}
      handleChange={() => handleSettingsChanged("removeShortsFromSearch")}
      disabled={shortsOptionsDisabled || shortsOnSiteDisabled}
      optionName="Remove Shorts from search"
      optionsDesc="Stops Shorts from appearing in the search page"
    />
    <OptionsCard
      {darkMode}
      toggle={removeShortsExploreToggle}
      handleChange={() => handleSettingsChanged("removeShortsExplore")}
      disabled={shortsOptionsDisabled || shortsOnSiteDisabled}
      optionName="Remove Shorts from homepage"
      optionsDesc="Stops Shorts from appearing on non-search pages (homepage, subscriptions, trending etc.)"
    />
    <OptionsCard
      {darkMode}
      toggle={removeShortsPlaybackToggle}
      handleChange={() => handleSettingsChanged("removeShortsPlayback")}
      disabled={shortsOptionsDisabled}
      optionName="Prevent Shorts Playback"
      optionsDesc="Prevents all Shorts videos from playing once clicked"
    />
    <OptionsCard
      {darkMode}
      toggle={removeShortsRemixingThisVideoToggle}
      handleChange={() => handleSettingsChanged("removeShortsRemixingThisVideo")}
      disabled={shortsOptionsDisabled || shortsOnSiteDisabled}
      optionName="Remove <em>Shorts Remixing This Video</em>"
      optionsDesc="Removes Shorts Remixing This Video section under videos"
    />
    <OptionsCard
      {darkMode}
      toggle={removeShortsWhileWatchingToggle}
      handleChange={() => handleSettingsChanged("removeShortsWhileWatching")}
      disabled={shortsOptionsDisabled || shortsOnSiteDisabled}
      optionName="Remove Shorts From Video Reccommendations"
      optionsDesc="Removes Shorts next from video reccommendations while videos are playing"
    />
    <OptionsCard
      {darkMode}
      toggle={removeShortsFromChannelToggle}
      handleChange={() => handleSettingsChanged("removeShortsFromChannel")}
      disabled={shortsOptionsDisabled || shortsOnSiteDisabled}
      optionName="Remove Shorts From Channel Pages"
      optionsDesc="Prevents Shorts from being displayed on channel pages"
    />
  </div>
  <h2 class="font-semibold text-3xl mt-4 pb-4" class:text-white={darkMode}>Search</h2>
  <div class="grid gap-y-1 gap-x-1 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
    <OptionsCard
      {darkMode}
      toggle={removeNewChannelsFromSearchToggle}
      handleChange={() => handleSettingsChanged("removeNewChannelsFromSearch")}
      optionName="Remove <em>Channels New To You </em>"
      optionsDesc="Removes new unrelated channel recommendations <br /> from appearing in the search page"
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
      handleChange={() => handleSettingsChanged("removePreviouslyWatchedFromSearch")}
      optionName="Remove <em>Previously Watched</em>"
      optionsDesc="Removes previously watched videos <br /> from appearing in the search page"
    />
    <OptionsCard
      {darkMode}
      toggle={removeForYouFromSearchToggle}
      handleChange={() => handleSettingsChanged("removeForYouFromSearch")}
      optionName="Remove <em>For You</em>"
      optionsDesc="Removes Youtube recommendations unrelated to the search query <br /> from appearing in the search page"
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
      optionsDesc="Removes videos suggested from related searches from appearing <br /> in the search page"
    />
    <OptionsCard
      {darkMode}
      toggle={removePeopleAlsoSearchForToggle}
      handleChange={() => handleSettingsChanged("removePeopleAlsoSearchFor")}
      optionName="Remove <em>People Also Search For</em>"
      optionsDesc="Removes videos people also search for <br /> from appearing in the search page"
    />
    <OptionsCard
      {darkMode}
      toggle={removeRecommendedTopicsFromSearchToggle}
      handleChange={() => handleSettingsChanged("removeRecommendedTopicsFromSearch")}
      optionName="Remove recommended topics from search"
      optionsDesc="Removes recommended topics from appearing in the search page e.g. <em>Christmas Lofi hiphop &#10024;</em>"
    />
    <OptionsCard 
      {darkMode}
      toggle={removeExploreMoreFromSearchToggle}
      handleChange={() => handleSettingsChanged("removeExploreMoreFromSearch")}
      optionName="Remove <em>Explore More</em>"
      optionsDesc="Removes the explore more suggested videos from appearing in the search page"
      newFeatureBadge={true}
    />
  </div>
  <h2 class="font-semibold text-3xl mt-4 pb-4" class:text-white={darkMode}>Other</h2>
  <div class="grid gap-y-1 gap-x-1 grid-cols-1 md:grid-cols-1 xl:grid-cols-1">
    <OptionsCard
      {darkMode}
      toggle={disableTelemetryToggle}
      handleChange={() => handleSettingsChanged("disableTelemetry")}
      optionName="Disable Telemetry"
      optionsDesc="Prevent the extension sending data to the server about what sections are removed."
    />
  </div>
  <div class="mt-6">
    <button class="w-48 h-8 border border-black rounded transition-all hover:scale-105 ease-in-out duration-300" class:border-white={darkMode} class:text-white={darkMode} on:click={handleResetSettings}>
      Reset settings to default
    </button>
    <p class="mt-5 text-custom-ver-text">Version: {version}</p>
  </div>
</main>
