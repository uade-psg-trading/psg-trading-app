<script lang="ts">
  import type { LayoutServerData } from './$types';
  import Header from '$lib/components/header/header.svelte';
  import { headerStore } from '$lib/stores';
  import Toast from '$lib/components/toast/toast.svelte';
  export let data: LayoutServerData;
</script>

<div class="bg-gray-50 app">
  <Toast />
  <Header tenant={data.tenant.id} />
  <header class="mb-8">
    <div class="bg-white p-6 text-gray-900">
      <h3 class="ml-6 text-3xl font-bold">{$headerStore.title}</h3>
    </div>
  </header>

  <main class="flex justify-center">
    <slot />
  </main>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>
