<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';

  export let title: string;
  export let buttonType: HTMLButtonAttributes['type'] = 'button';
  export let disabled = false;
</script>

<button
  {disabled}
  type={buttonType}
  class="group relative flex w-full justify-center rounded bg-white py-2 px-3 text-sm font-semibold shadow text-indigo-600 hover:bg-gray-100 border border-indigo-400"
  on:click
>
  {title}
</button>
