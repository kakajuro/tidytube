<script lang="ts">
  import { onMount } from "svelte";

  import Toastify from 'toastify-js'
  import "toastify-js/src/toastify.css"
  
  import { getDarkMode } from "../util/darkMode";
  import { getSettings, setSettings } from "../util/settingsHandler";

  let settings;
  let darkMode;

  let removeShortsFromSearchToggle;
  let removeAdsFromSeachToggle;

  const toast = Toastify({
    text: "Settings updated. Reload Youtube for changes to take effect.",
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

  const handleRemoveShortsFromSearchToggle = () => {
    removeShortsFromSearchToggle = !removeShortsFromSearchToggle;
    setSettings({"removeShortsFromSearch": removeShortsFromSearchToggle});
    toast.showToast();
  }
  
  const handleRemoveAdsFromSearchToggle = () => {
    removeAdsFromSeachToggle = !removeAdsFromSeachToggle;
    setSettings({"removeAdsFromSearch": removeAdsFromSeachToggle});
    toast.showToast();
  }

  onMount(async () => {
    settings = await getSettings();

    removeShortsFromSearchToggle = settings.removeShortsFromSearch;
    removeAdsFromSeachToggle = settings.removeAdsFromSearch;

    darkMode = await getDarkMode();
  });

</script>

<main class="w-full h-screen p-4 flex flex-col items-center select-none font-jost" class:bg-custom-dark={darkMode}>
  <h1 class="font-semibold text-5xl mt-12 pb-4" class:text-white={darkMode}>Options</h1>
  <h2 class="font-semibold text-3xl mt-4 pb-4" class:text-white={darkMode}>Search</h2>
  <div class="flex flex-col mb-6">
    <div class="space-x-2">
      <input
        id="shortFromSearch" 
        type="checkbox"
        class="w-4 h-4 rounded-sm accent-[#FF0000]"
        checked={removeShortsFromSearchToggle}
        on:change={handleRemoveShortsFromSearchToggle}
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
        id="adsFromSearch" 
        type="checkbox"
        class="w-4 h-4 rounded-sm accent-[#FF0000]"
        checked={removeAdsFromSeachToggle}
        on:change={handleRemoveAdsFromSearchToggle}
      />
      <label 
        for="adsFromSearch"
        class="text-xl" 
        class:text-white={darkMode}>
        Remove ads from search
      </label>
    </div>
    <p class="font-bold" class:text-white={darkMode}>Stops ads from appearing in the search page</p>
  </div>
</main>