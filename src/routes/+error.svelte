<script>
  import { page } from '$app/stores';
</script>

<main class="grid min-h-full place-items-center py-24 px-6 sm:py-32 lg:px-8">
  <div class="text-center">
    <p class="text-base font-semibold text-indigo-600">{$page.status}</p>
    <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
      {$page.error?.message || 'Page not found'}
    </h1>
    {#if $page.status === 404}
      <p class="mt-6 text-base leading-7 text-gray-600">
        No pudimos encontrar el sitio al que intentabas llegar
      </p>
    {/if}
    <div class="mt-10 flex items-center justify-center gap-x-6">
      <a
        href="/"
        class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >Volver a inicio</a
      >
    </div>
  </div>
</main>
