<script lang="ts">
  import { onMount } from "svelte";

  import { browser } from "webextension-polyfill-ts";
  
  import { getDarkMode } from "../util/darkMode";
  import { getSettings, setSettings } from "../util/settingsHandler";

  let settings;
  let darkMode;

  let removeShortsFromSearchToggle;
  let removeAdsFromSeachToggle;

  const handleRemoveShortsFromSearchToggle = () => {
    removeShortsFromSearchToggle = !removeShortsFromSearchToggle;
    setSettings({"removeShortsFromSearch": removeShortsFromSearchToggle});
  }
  const handleRemoveAdsFromSearchToggle = () => {
    removeAdsFromSeachToggle = !removeAdsFromSeachToggle;
    setSettings({"removeAdsFromSearch": removeAdsFromSeachToggle});
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