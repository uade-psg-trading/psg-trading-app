<script lang="ts">
  import { onMount } from 'svelte';
  import AlertIcon from '$lib/icons/alert-icon.svelte';
  import WhiteCard from '$lib/components/cards/white-card.svelte';
  import { headerStore } from '$lib/stores';
  import PieChart from '$lib/components/charts/pie-chart/pie-chart.svelte';
  import Table from '$lib/components/table/table.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  onMount(() => {
    headerStore.update((value) => {
      value.title = 'Portfolio';
      return value;
    });
  });

  const columns = [
    { key: 'id', title: 'ID', value: (row: { id: any }) => row.id, visible: false },
    {
      key: 'name',
      title: 'Activo',
      value: (row: { name: string }) => row.name,
      parentClasses: 'text-gray-900'
    },
    { key: 'price', title: 'Precio', value: (row: { price: any }) => row.price },
    {
      key: 'quantity',
      title: 'Cantidad',
      value: (row: { quantity: any }) => row.quantity
    },
    {
      key: 'variation',
      title: 'Variacion diaria',
      value: (row: { variation: any }) => row.variation,
      valueClasses: (row: { positiveVariation: boolean }) =>
        `${
          row.positiveVariation ? 'bg-green-100 text-green-800' : 'bg-red-400 text-red-800'
        } w-16 rounded font-bold h-100 m-auto text-center`
    },
    {
      key: 'yield',
      title: 'Rendimiento',
      value: (row: { yield: any }) => row.yield,
      valueClasses: (row: { positiveYield: boolean }) =>
        `${row.positiveYield ? 'text-green-600' : 'text-red-400'}`
    },
    { key: 'realYield', title: 'Valorizado', value: (row: { realYield: any }) => row.realYield },
    {
      key: 'alert',
      title: 'Alarma',
      value: (row: { isAlerted: any }) => {
        if (row.isAlerted) {
          return { component: AlertIcon };
        }

        return '';
      }
    }
  ];

  const tableMenuOptions = [
    { title: 'Comprar', calcHref: (row: { id: string }) => `/portfolio/buy?symbol=${row.id}` },
    { title: 'Vender', calcHref: (row: { id: string }) => `/portfolio/sell?symbol=${row.id}` }
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
    <WhiteCard classes="col-span-3 md:col-span-4 lg:col-span-2 flex flex-col justify-between">
      <div class="mb-4">
        <h3 class="text-lg text-black font-bold">Ganancia - Pérdida</h3>
        <span
          class="text-base {Number(data.summary?.totalYield) >= 0
            ? 'text-green-400'
            : 'text-red-400'}">$ {data.summary?.totalYield}</span
        >
      </div>
      <div>
        <h3 class="text-lg text-black font-bold">Activos valorizados</h3>
        <span class="text-base text-gray-900">$ {data.summary?.totalRealYield}</span>
      </div>
      <div>
        <h3 class="text-lg text-black font-bold">Disponible para operar</h3>
        <span class="text-base text-gray-900">$ {data.fiatBalance}</span>
      </div>
    </WhiteCard>
    <WhiteCard classes="col-span-3 md:col-span-4 lg:col-span-4">
      <PieChart labels={data.dataset?.labels ?? []} data={data.dataset?.labelsData ?? []} />
    </WhiteCard>
    <div class="col-span-6">
      <Table
        showOptionsMenu={true}
        rows={data.balances || []}
        {columns}
        menuOptions={tableMenuOptions}
      />
    </div>
  </div>
</div>
