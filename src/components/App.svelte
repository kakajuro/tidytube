<script lang="ts">
  import { onMount } from "svelte";

  import Toggle from "svelte-switcher";

  import Gear from "phosphor-svelte/lib/Gear";
  import Warning from "phosphor-svelte/lib/Warning";
  import Sun from "phosphor-svelte/lib/Sun";
  import Moon from "phosphor-svelte/lib/Moon";

  import { getDarkMode, setDarkMode } from "../util/darkMode";
  import { getManifestVer } from "../util/getManifestVersion";
  
  let version = getManifestVer();
  let darkMode;
  let extensionRunningToggle;

  const handleDarkModeSwitch = () => {
    darkMode = !darkMode;
    setDarkMode(darkMode);
  }
  
  onMount(async ()  => {
    darkMode = await getDarkMode();
  });

</script>

<main class="container min-w-[21rem] p-4 flex flex-col select-none" class:bg-custom-dark={darkMode}>
  <nav class="flex flex-row content-center justify-between items-center w-full">
    <h1 class="text-custom-light-mode font-bold text-3xl underline" class:text-white={darkMode}>simpletube</h1>
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
      <Gear class="hover:cursor-pointer" color={darkMode ? "#FFFFFF" : "#09090B"} size="{20}"/>
      <div id="toggle-styles">
          <Toggle 
            id="extensionRunningToggle"
            bind:checked={extensionRunningToggle}
            defaultChecked={false}
          />
      </div>
    </div>
  </nav>
  <div class="flex flex-row content-center justify-between w-full mt-1">
    <div>
      <p class="font-semibold pt-[2px] pb-[1px]" class:text-white={darkMode}>Declutering Youtube</p>
      <p class="text-custom-ver-text mb-4">Version {version}</p>
    </div>
  </div>
  <div class="flex flex-col content-center justify-center">
    <h1 class="text-custom-light-mode font-bold text-2xl mb-2 text-center" class:text-white={darkMode}>Sections removed:</h1>
    <h1 class="text-custom-light-mode font-bold text-6xl text-center" class:text-white={darkMode}>XXXXX</h1>
  </div>
  <div class="flex flex-col content-center justify-center mt-8">
    <h1 class="text-custom-light-mode font-bold text-2xl mb-2 text-center" class:text-white={darkMode}>In total:</h1>
    <h1 class="text-custom-light-mode font-bold text-6xl text-center" class:text-white={darkMode}>XXXXX</h1>
  </div>
  <div class="mb-[50px]"/>
  <div class="flex flex-col mb-auto mt-auto">
    <button class="flex flex-row content-center justify-center font-semibold items-center text-center h-10 border-2 rounded-lg button-effect" class:text-white={darkMode} class:border-white={darkMode} class:border-[#4a4a4a]={!darkMode}>
      <Warning color={darkMode ? "#FFFFFF" : "#09090B"} size="{22}" class="space-x-4"/>
      <p class="ml-2">Report a bug</p>
    </button>
  </div>
</main>

<style>
  #toggle-styles
    > :global(.svelte-toggle.svelte-toggle--checked:hover:not(.svelte-toggle--disabled)
      .svelte-toggle--track) {
    background-color: #19ab27 !important;
  }

  #toggle-styles
    > :global(.svelte-toggle:hover:not(.svelte-toggle--disabled) .svelte-toggle--track) {
    background-color: #4d4d4d !important;
  }
</style>