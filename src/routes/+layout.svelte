<script lang="ts">
  import Header from '$lib/components/header/header.svelte';
  import '../app.css';
  import type { LayoutServerData } from './$types';
  import './styles.css';

  export let data: LayoutServerData;
</script>

<div class="app">
  <Header username={data?.username} />

  <main class="bg-gray-50 min-h-screen flex justify-center">
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
