<div id="toggle-styles">
  <slot />
</div>

<style>
  #toggle-styles > :global(.svelte-toggle.svelte-toggle--checked .svelte-toggle--track) {
    background-color: #FF0000;
  }

  #toggle-styles > :global(.svelte-toggle.svelte-toggle--checked:hover:not(.svelte-toggle--disabled) .svelte-toggle--track) {
      background-color: #FF0000 !important;
  }
  
  #toggle-styles > :global(.svelte-toggle:hover:not(.svelte-toggle--disabled) .svelte-toggle--track) {
    background-color: #4d4d4d !important;
  }
  
  #toggle-styles > :global(.svelte-toggle--checked .svelte-toggle--thumb) {
    border-color: #FF0000 !important;
  }
</style>