<script lang="ts">
  import { onMount } from 'svelte';

  export let actionButtonId: string;
  export let classes = '';
  export let style = '';
  export let isVisible = false;

  onMount(() => {
    const menuListener = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        if (e.target.closest(`#${actionButtonId}`)) {
          return;
        }
      }

      isVisible = false;
    };

    document.addEventListener('click', menuListener);
    return () => {
      document.removeEventListener('click', menuListener);
    };
  });
</script>

<div
  {style}
  hidden={!isVisible}
  class={`absolute origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-48 ${classes}`}
  role="menu"
  aria-orientation="vertical"
  aria-labelledby={actionButtonId}
  tabindex="-1"
>
  <slot />
</div>
