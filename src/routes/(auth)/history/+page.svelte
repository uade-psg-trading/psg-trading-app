<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import { headerStore } from '$lib/stores';
  import Table from '$lib/components/table/table.svelte';
  import ErrorLabel from '$lib/components/error-label/error-label.svelte';

  onMount(() => {
    headerStore.update((value) => {
      value.title = 'Historial de transacciones';
      return value;
    });
  });

  export let data: PageData;

  const columns = [
    {
      key: 'id',
      title: 'n° de trans.',
      value: (row: { id: number }) => row.id,
      classes: 'text-gray-900'
    },
    {
      key: 'transactionTime',
      title: 'Fecha de orden',
      value: (row: { transactionTime: Date }) => row.transactionTime.toLocaleDateString()
    },
    { key: 'operation', title: 'Tipo', value: (row: { operation: any }) => row.operation },
    {
      key: 'tokenName',
      title: 'Activo',
      value: (row: { tokenName: any; tokenSymbol: any }) => `${row.tokenName} (${row.tokenSymbol})`,
      classes: 'text-gray-900 font-bold'
    },
    { key: 'quantity', title: 'Cant. Operada', value: (row: { quantity: any }) => row.quantity },
    {
      key: 'price',
      title: 'Precio operado',
      value: (row: { price: number }) => `$ ${row.price.toFixed(2)}`
    },
    {
      key: 'balance',
      title: 'Monto operado',
      value: (row: { price: number; quantity: number }) =>
        `$ ${(row.price * row.quantity).toFixed(2)}`
    }
  ];
</script>

<svelte:head>
  <title>Historial de transacciones</title>
</svelte:head>

<div class="container">
  <div>
    {#if data.errors}
      <ErrorLabel message={data.errors} />
    {/if}

    <Table rows={data.transactions || []} {columns} />
  </div>
</div>
