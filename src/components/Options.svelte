<script>
  import { onMount } from "svelte";
  
  import { getDarkMode } from "../util/darkMode";

  let darkMode;

  onMount(async () => {
    darkMode = await getDarkMode();
  });
</script>

<main class="w-full h-screen p-4 flex flex-col items-center select-none font-jost" class:bg-custom-dark={darkMode}>
  <h1 class="font-semibold text-5xl mt-12 pb-4" class:text-white={darkMode}>Options</h1>
  <h2 class="font-semibold text-3xl mt-4 pb-4" class:text-white={darkMode}>Search</h2>
</main>