<script lang="ts">
  import { onMount } from "svelte";

  import { browser } from "webextension-polyfill-ts";

  import Toggle from "svelte-switcher";

  import Gear from "phosphor-svelte/lib/Gear";
  import Warning from "phosphor-svelte/lib/Warning";
  import Sun from "phosphor-svelte/lib/Sun";
  import Moon from "phosphor-svelte/lib/Moon";

  import ToggleWrapper from "./ToggleWrapper.svelte";
  import { getDarkMode, setDarkMode } from "../util/darkMode";
  import { getExtensionRunning, setExtensionRunning } from "../util/extensionRunning";
  import { getManifestVer } from "../util/getManifestVersion";
  import { getSectionsRemovedPage, getSectionsRemovedTotal, setSectionsRemovedPage } from "../util/sectionsRemoved";
  import { getTabStore } from "../util/tabStore";
  
  let version = getManifestVer();
  let darkMode;
  let extensionRunningToggle;
  let sectionsRemovedPage;
  let sectionsRemovedTotal;
  let tabStore;

  const handleDarkModeSwitch = () => {
    darkMode = !darkMode;
    setDarkMode(darkMode);
  }

  const handleExtensionToggle = () => {
    extensionRunningToggle = !extensionRunningToggle;
    setExtensionRunning(extensionRunningToggle);

    // Alert content script that extension state has changed
    browser.tabs.query({currentWindow: true, active: true})
    .then((tabs) => {
      let tab:number = tabs[0].id;

      browser.tabs.sendMessage(tab, "extensionStateChanged")
      .catch((error) => console.error(`Error sending message: ${error}`))
    })
    .catch((error) => console.error(`${error}`))

  }

  const handleOptionsClicked = () => {
    browser.tabs.create({ url: "./options.html" })
  }

  onMount(async ()  => {
    darkMode = await getDarkMode();
    extensionRunningToggle = await getExtensionRunning();
    sectionsRemovedPage = await getSectionsRemovedPage();
    sectionsRemovedTotal = await getSectionsRemovedTotal();
    tabStore = await getTabStore();
  });

  onMount(async () => {
    let { previousTab } = await browser.storage.local.get("previousTab");
    let tabStore = await getTabStore();

    browser.tabs.query({active: true, currentWindow:true})
    .then((tabs) => {
      let currentTab = tabs[0].id;

      if (previousTab != currentTab) {
        if (tabStore[currentTab]) {
          setSectionsRemovedPage(tabStore[currentTab]);
        } else {
          setSectionsRemovedPage(0);
        }

      }
    })

  });

  // Popup event listener
  browser.runtime.onMessage.addListener(msg => {

    if (msg === "sectionsRemovedPageChanged") {
      (async () => {
        sectionsRemovedPage = await getSectionsRemovedPage();
      })
    } 

    if (msg === "sectionsRemovedBothChanged") {
      (async () => {
        sectionsRemovedPage = await getSectionsRemovedPage();
        sectionsRemovedTotal = await getSectionsRemovedTotal();
      })
    }
  })

</script>

<main class="container min-w-[21rem] p-4 flex flex-col select-none" class:bg-custom-dark={darkMode}>
  <nav class="flex flex-row content-center justify-between items-center w-full">
    <h1 class="text-light-mode-title font-bold text-3xl underline" class:text-white={darkMode}>simpletube</h1>
    <div class="flex flex-row space-x-3 content-center pt-3">
      {#if darkMode}
      <button class="w-[20px] h-[20px]" on:click={handleDarkModeSwitch}>
        <Sun class="hover:cursor-pointer" color={darkMode ? "#FFFFFF" : "#09090B"} size="{20}"/>
      </button>
      {:else}
      <button class="w-[20px] h-[20px]" on:click={handleDarkModeSwitch} >
        <Moon class="hover:cursor-pointer" color={darkMode ? "#FFFFFF" : "#09090B"} size="{20}"/>
      </button>
      {/if}
      <button class="w-[20px] h-[20px]" on:click={handleOptionsClicked}>
        <Gear class="hover:cursor-pointer" color={darkMode ? "#FFFFFF" : "#09090B"} size="{20}"/>
      </button>   
      <ToggleWrapper>
          <Toggle 
            id="extensionRunningToggle"
            on:toggle={handleExtensionToggle}
            checked={extensionRunningToggle}
          />
      </ToggleWrapper>
    </div>
  </nav>
  <div class="flex flex-row content-center justify-between w-full mt-1">
    <div>
      <p class="font-semibold pt-[2px] pb-[1px]" class:text-white={darkMode}>Decluttering Youtube</p>
      <p class="text-custom-ver-text mb-4">Version {version}</p>
    </div>
  </div>
  <div class="container">
    <div class="flex flex-col content-center justify-center">
      <h1 class="text-custom-light-mode font-bold text-2xl text-center" class:text-white={darkMode}>Sections removed:</h1>
      {#if sectionsRemovedPage === undefined}
        <div class="mb-16" />
      {:else}
        <h1 class="text-custom-light-mode font-bold text-4xl text-center" class:text-white={darkMode}>{sectionsRemovedPage}</h1>
      {/if}
    </div>
    <div class="flex flex-col content-center justify-center mt-8">
      <h1 class="text-custom-light-mode font-bold text-2xl text-center" class:text-white={darkMode}>In total:</h1>
      {#if sectionsRemovedTotal === undefined}
        <div class="mb-4" />
      {:else}
        <h1 class="text-custom-light-mode font-bold text-4xl text-center" class:text-white={darkMode}>{sectionsRemovedTotal}</h1>
      {/if}
    </div>
  </div>
  <div class="mb-[50px]"/>
  <div class="flex flex-col mb-auto mt-auto">
    <button class="flex flex-row content-center justify-center font-semibold items-center text-center h-10 border-2 rounded-lg button-effect" class:text-white={darkMode} class:border-white={darkMode} class:border-[#4a4a4a]={!darkMode}>
      <Warning color={darkMode ? "#FFFFFF" : "#09090B"} size="{22}" class="space-x-4"/>
      <p class="ml-2">Report a bug</p>
    </button>
  </div>
</main>