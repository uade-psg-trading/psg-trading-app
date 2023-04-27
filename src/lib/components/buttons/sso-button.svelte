<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import GoogleIcon from '$lib/icons/google.svelte';
  import LoadingSpinner from '$lib/icons/loading-spinner.svelte';

  export let type: HTMLButtonAttributes['type'] = 'button';
  export let ssoProvider: 'google' | 'microsoft' | 'apple' | 'facebook';
  export let title: string;
  export let loading = false;
</script>

<button
  {type}
  class="group relative flex w-full justify-center rounded bg-white py-2 px-3 text-sm font-semibold shadow text-gray-800 hover:bg-gray-100 border border-gray-400"
  on:click
>
  {#if !loading}
    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
      {#if ssoProvider === 'google'}
        <GoogleIcon />
      {/if}
    </span>
    {title}
  {:else}
    <LoadingSpinner classes="h-5" />
  {/if}
</button>
