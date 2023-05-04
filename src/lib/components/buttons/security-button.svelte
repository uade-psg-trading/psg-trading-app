<script lang="ts">
  import PrimaryButton from './primary-button.svelte';
  import LockIcon from '$lib/icons/lock.svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  export let title: string;
  export let buttonType: HTMLButtonAttributes['type'] = 'button';
  export let loading = false;
  export let disabled = false;
</script>

<PrimaryButton on:click {title} {disabled} {buttonType} {loading}>
  <span slot="icon" class="absolute inset-y-0 left-0 flex items-center pl-3">
    <LockIcon />
  </span>
</PrimaryButton>
