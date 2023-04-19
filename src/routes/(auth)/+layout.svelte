<script lang="ts">
  import { headerStore } from '$lib/stores';
</script>

<header class="mb-8">
  <div class="bg-white p-6 text-gray-900 dark:bg-neutral-700 dark:text-neutral-200">
    <h3 class="ml-6 text-3xl font-bold">{$headerStore.title}</h3>
  </div>
</header>

<div class="flex justify-center">
  <slot />
</div>
