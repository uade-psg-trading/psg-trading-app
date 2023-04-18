<script lang="ts">
  import { onMount } from 'svelte';
  import WhiteCard from '$lib/components/cards/white-card.svelte';
  import { headerStore } from '$lib/stores';
  import PieChart from '$lib/components/charts/pie-chart/pie-chart.svelte';
  import Table from '$lib/components/table/table.svelte';

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
  const rows = [
    {
      id: 1,
      name: 'Bitcoin',
      price: '$ 45.000',
      quantity: '0.0001',
      variation: '0.5%',
      yield: '$ 0.00',
      realYield: '$ 0.00',
      alert: undefined
    },
    {
      id: 5,
      name: 'Bitcoin',
      price: '$ 45.000',
      quantity: '0.0001',
      variation: '0.5%',
      yield: '$ 0.00',
      realYield: '$ 0.00',
      alert: undefined
    },
    {
      id: 4,
      name: 'Bitcoin',
      price: '$ 45.000',
      quantity: '0.0001',
      variation: '0.5%',
      yield: '$ 0.00',
      realYield: '$ 0.00',
      alert: undefined
    },
    {
      id: 3,
      name: 'Bitcoin',
      price: '$ 45.000',
      quantity: '0.0001',
      variation: '0.5%',
      yield: '$ 0.00',
      realYield: '$ 0.00',
      alert: undefined
    },
    {
      id: 2,
      name: 'Bitcoin',
      price: '$ 45.000',
      quantity: '0.0001',
      variation: '0.5%',
      yield: '$ 0.00',
      realYield: '$ 0.00',
      alert: undefined
    },
    {
      id: 8,
      name: 'Bitcoin',
      price: '$ 45.000',
      quantity: '0.0001',
      variation: '0.5%',
      yield: '$ 0.00',
      realYield: '$ 0.00',
      alert: undefined
    },
    {
      id: 7,
      name: 'Bitcoin',
      price: '$ 45.000',
      quantity: '0.0001',
      variation: '0.5%',
      yield: '$ 0.00',
      realYield: '$ 0.00',
      alert: undefined
    },
    {
      id: 6,
      name: 'Bitcoin',
      price: '$ 45.000',
      quantity: '0.0001',
      variation: '0.5%',
      yield: '$ 0.00',
      realYield: '$ 0.00',
      alert: undefined
    }
  ];
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
        <span class="text-base text-green-400">$345.545,70</span>
      </div>
      <div>
        <h3 class="text-lg text-black">Activos valorizados</h3>
        <span class="text-base text-gray-900">$1.004.234,82</span>
      </div>
    </WhiteCard>
    <WhiteCard classes="col-span-3 md:col-span-4 lg:col-span-5">
      <PieChart />
    </WhiteCard>
    <div class="col-span-6">
      <Table showOptionsMenu={true} {rows} {columns} />
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
