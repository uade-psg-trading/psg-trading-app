<script lang="ts">
  import { onMount } from 'svelte';
  import WhiteCard from '$lib/components/cards/white-card.svelte';
  import { headerStore } from '$lib/stores';
  import { enhance } from '$app/forms';
  import FormInput from '$lib/components/input/input-with-title.svelte';
  import PrimaryButton from '$lib/components/buttons/primary-button.svelte';
  import Table from '$lib/components/table/table.svelte';
  import Selector from '$lib/components/selector/selector.svelte';

  onMount(() => {
    headerStore.update((value) => {
      value.title = 'Mis Alarmas';
      return value;
    });
  });
  let selectedValue: string;
  let tokenList = [`$PSG`, `$BAR`, `$CITY`];
  let reasonList = [`SUBE`, `BAJA`];
  const columns = [
    { key: 'id', title: 'ID', value: (row) => row.id, visible: false },
    { key: 'tokenName', title: 'Simbolo', value: (row) => row.tokenName },
    { key: 'reason', title: 'Avisarme si', value: (row) => row.reason },
    { key: 'amount', title: 'Valor', value: (row) => row.amount }
  ];
  const rows = [
    {
      id: 1,
      tokenName: '$PSG',
      reason: 'BAJA',
      amount: '100'
    },
    {
      id: 2,
      tokenName: '$BAR',
      reason: 'BAJA',
      amount: '150'
    }
  ];
</script>

<svelte:head>
  <title>Mis Alarmas</title>
</svelte:head>

<div class="container">
  <div class="py-12">
    <WhiteCard>
      <div class="mb-4">
        <h2 class="text-left text-lg font-bold text-indigo-800">Agregar una alarma</h2>
        <form action="/notifications" method="POST" class="w-full" use:enhance>
          <div class="flex -mx-3 mt-4">
            <div class="w-1/4 mb-4 px-3">
              <Selector
                id="tokenName"
                name="tokenName"
                value={selectedValue}
                list={tokenList}
                labelTitle="Simbolo"
              />
            </div>
            <div class="w-1/4 mb-4 px-3">
              <Selector
                id="reason"
                name="reason"
                value={selectedValue}
                list={reasonList}
                labelTitle="Avisarme si"
              />
            </div>
            <div class="w-1/4 mb-4 px-3">
              <FormInput
                id="amount"
                name="amount"
                isRequired={true}
                labelTitle="Valor"
                type="number"
              />
            </div>
            <div class="w-1/4 px-3 mt-8">
              <PrimaryButton title="Agregar" buttonType="submit" />
            </div>
          </div>
        </form>
      </div>
    </WhiteCard>
  </div>

  <WhiteCard>
    <h2 class="text-left text-lg font-bold text-indigo-800">Mis alarmas configuradas</h2>
    <Table showOptionsMenu={true} {rows} {columns} />
  </WhiteCard>
</div>
