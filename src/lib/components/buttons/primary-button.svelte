<script lang="ts">
  import LoadingSpinner from '$lib/icons/loading-spinner.svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  export let title: string;
  export let buttonType: HTMLButtonAttributes['type'] = 'button';
  export let disabled = false;
  export let loading = false;
</script>

<button
  type={buttonType}
  disabled={disabled || loading}
  class="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  on:click
>
  {#if !loading}
    <slot name="icon" />
    {title}
  {:else}
    <LoadingSpinner classes="h-5" />
  {/if}
</button>
