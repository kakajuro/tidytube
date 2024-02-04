<script>
  import Gear from "phosphor-svelte/lib/Gear";
  import ArrowClockwise from "phosphor-svelte/lib/ArrowClockwise";
  import Warning from "phosphor-svelte/lib/Warning";

  const getVersion = () => {
    const manifestData = chrome.runtime.getManifest();
    return manifestData.version;
  }

  let version = getVersion();

</script>

<main class="container bg-custom-bg min-w-[20rem] p-4 flex flex-col select-none">
  <nav class="flex flex-row content-center justify-between w-full">
    <h1 class="font-bold text-white text-3xl underline">simpletube</h1>
    <div class="flex flex-row space-x-3 content-center pt-3">
      <ArrowClockwise class="hover:cursor-pointer" color="#FFFFFF" size="{20}"/>
      <Gear class="hover:cursor-pointer" color="#FFFFFF" size="{20}"/>
    </div>
  </nav>
  <p class="text-white font-semibold pt-[2px] pb-[2px]">Creating a simpler Youtube experience</p>
  <p class="text-custom-ver-text mb-8">Version {version}</p>
  <div class="flex flex-col content-center justify-center">
    <h1 class="text-white font-bold text-2xl mb-2 text-center">Sections removed:</h1>
    <h1 class="text-white font-bold text-6xl text-center">XXXXX</h1>
  </div>
  <div class="flex flex-col content-center justify-center mt-8">
    <h1 class="text-white font-bold text-2xl mb-2 text-center">In total:</h1>
    <h1 class="text-white font-bold text-6xl text-center">XXXXX</h1>
  </div>
  <div class="mb-[50px]"/>
  <div class="flex flex-col mb-auto mt-auto">
    <button class="flex flex-row content-center justify-center text-white font-semibold items-center text-center h-10 border-2 rounded-lg border-white">
      <Warning color="#FFFFFF" size="{25}" class="space-x-4"/>
      Report a bug
    </button>
  </div>
</main>
