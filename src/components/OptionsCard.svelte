<script lang="ts">
  export let darkMode;

  export let toggle:boolean;
  export let handleChange:Function;
  export let optionName:string;
  export let optionsDesc:string;
  export let disabled:boolean = null;
  export let newFeatureBadge:boolean = null;

  let id = optionName.trim();

</script>

<div class="flex flex-col items-center justify-start text-wrap min-h-24 min-w-[345px]">
  <div class="flex flex-row items-center justify-center space-x-2">
    <input
      id={id} 
      type="checkbox"
      class="w-4 h-4 rounded-sm accent-[#FF0000]"
      checked={toggle}
      on:change={() => { handleChange(); }}
      disabled={disabled}
    />
    <label 
      for={id}
      class="text-xl" 
      class:text-white={darkMode}>
      {@html optionName}
    </label>
    {#if newFeatureBadge}
      <span class="text-[0.8rem] bg-[#d90000] rounded px-2" class:text-white={darkMode}>New</span>
    {/if}
  </div>
  <p class="font-bold text-wrap max-w-[270px]" class:text-white={darkMode}>{@html optionsDesc}</p>
</div>