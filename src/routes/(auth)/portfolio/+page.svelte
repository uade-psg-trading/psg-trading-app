<script lang="ts">
  import { onMount } from 'svelte';
  import WhiteCard from '$lib/components/cards/white-card.svelte';
  import { headerStore } from '$lib/stores';
  import PieChart from '$lib/components/charts/pie-chart/pie-chart.svelte';
  import Table from '$lib/components/table/table.svelte';
  import { balance } from '$lib/api/endpoints.js';

  // Hay que cambiar esto. No sirve
  // Es 0 reusable
  // Tampoco me copa mucho la idea de crear una libreria de rutas.
  onMount(() => {
    headerStore.update((value) => {
      value.title = 'Portfolio';
      return value;
    });
  });

  const columns = [
    { key: 'id', title: 'ID', value: (row) => row.id, visible: false },
    { key: 'name', title: 'Activo', value: (row) => row.name, classes: 'text-gray-900' },
    { key: 'price', title: 'Precio', value: (row) => row.price },
    { key: 'quantity', title: 'Cantidad', value: (row) => row.quantity },
    { key: 'variation', title: 'Variacion diaria', value: (row) => row.variation },
    { key: 'yield', title: 'Rendimiento', value: (row) => row.yield },
    { key: 'realYield', title: 'Valorizado', value: (row) => row.realYield },
    { key: 'alert', title: 'Alarma', value: (row) => row.alert ?? '' }
  ];
  const rowDefault = [
    {
      id: 1,
      name: '',
      price: '',
      quantity: '',
      variation: '',
      yield: '',
      realYield: '',
      alert: undefined
    }
  ];
  export let data;
</script>

<svelte:head>
  <title>Tu portfolio</title>
</svelte:head>

<div class="container">
  <div class="max-sm:ml-6 mb-6">
    <h2 class="text-2xl text-gray-900 font-sans">Resumen de portfolio</h2>
  </div>
  <div class="grid grid-cols-6 gap-4">
    <WhiteCard classes="col-span-3 md:col-span-2 lg:col-span-1 flex flex-col justify-between">
      <div class="mb-4">
        <h3 class="text-lg text-black">Ganancia - Pérdida</h3>
        <span
          class="text-base {Number(data.summary?.totalRealYield) >= 0
            ? 'text-green-400'
            : 'text-red-400'}">$ {data.summary?.totalRealYield}</span
        >
      </div>
      <div>
        <h3 class="text-lg text-black">Activos valorizados</h3>
        <span class="text-base text-gray-900">{data.summary?.totalYield}</span>
      </div>
    </WhiteCard>
    <WhiteCard classes="col-span-3 md:col-span-4 lg:col-span-5">
      <PieChart />
    </WhiteCard>
    <div class="col-span-6">
      <Table showOptionsMenu={true} rows={data.balances ?? rowDefault} {columns} />
    </div>
  </div>
  <!-- <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="rounded p-6 bg-white w-full max-w-screen-lg space-y-8">
      <div class="buttons">
        <a href="/portfolio/sell"><button class="large row">Vender</button></a>
        <a href="/portfolio/buy"><button class="large row">Comprar</button></a>
      </div>
    </div>
  </div> -->
</div>
