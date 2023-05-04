<script lang="ts">
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import { headerStore } from '$lib/stores';
  import type { ActionData, PageData } from './$types';
  import WhiteCard from '$lib/components/cards/white-card.svelte';
  import FormInput from '$lib/components/input/input-with-title.svelte';
  import PrimaryButton from '$lib/components/buttons/primary-button.svelte';
  import Table from '$lib/components/table/table.svelte';
  import Selector from '$lib/components/selector/selector.svelte';
  import Swal from 'sweetalert2';
  import { goto } from '$app/navigation';
  import ErrorLabel from '$lib/components/error-label/error-label.svelte';

  export let data: PageData;
  export let form: ActionData;

  onMount(() => {
    headerStore.update((value) => {
      value.title = 'Mis Alarmas';
      return value;
    });
  });

  let loading = false;
  let selectedToken: string | undefined = undefined;
  let selectedReason: string | undefined = undefined;
  const { tokens, reasons } = data;
  const columns = [
    { key: 'id', title: 'ID', value: (row: { id: any }) => row.id, visible: false },
    { key: 'symbolName', title: 'Simbolo', value: (row: { tokenName: any }) => row.symbolName },
    { key: 'reason', title: 'Avisarme si', value: (row: { reason: any }) => row.reason },
    { key: 'amount', title: 'Valor', value: (row: { amount: any }) => row.amount }
  ];

  function onEnhanceSubmit() {
    loading = true;
    return async ({ update, result }: any) => {
      await update();
      loading = false;
      if (result.type === 'success') {
        Swal.fire({
          title: 'Operación exitosa',
          text: 'Se ha creado una nueva alerta',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          goto('/portfolio/notifications');
        });
      }
    };
  }
</script>

<svelte:head>
  <title>Mis Alarmas</title>
</svelte:head>

<div class="container">
  <div class="py-12">
    <WhiteCard>
      <div class="mb-4">
        <h2 class="text-left text-lg font-bold text-indigo-800">Agregar una alarma</h2>
        <form action="notifications" method="POST" class="w-full" use:enhance={onEnhanceSubmit}>
          <div class="flex -mx-3 mt-4">
            <div class="w-1/4 mb-4 px-3">
              <Selector
                id="tokenName"
                name="tokenName"
                value={selectedToken}
                list={tokens}
                labelTitle="Simbolo"
              />
              {#if form?.errors?.tokenName}
                <ErrorLabel message={form.errors.tokenName} />
              {/if}
            </div>
            <div class="w-1/4 mb-4 px-3">
              <Selector
                id="reason"
                name="reason"
                value={selectedReason}
                list={reasons}
                labelTitle="Avisarme si"
              />
              {#if form?.errors?.reason}
                <ErrorLabel message={form.errors.reason} />
              {/if}
            </div>
            <div class="w-1/4 mb-4 px-3">
              <FormInput
                min={'0'}
                max={'100000'}
                id="amount"
                name="amount"
                isRequired={true}
                labelTitle="Valor"
                type="number"
              />
              {#if form?.errors?.amount}
                <ErrorLabel message={form.errors.amount} />
              {/if}
            </div>
            <div class="w-1/4 px-3 mt-8">
              <PrimaryButton {loading} title="Agregar" buttonType="submit" />
              {#if form?.errors?.createAlertError}
                <ErrorLabel message={form.errors.createAlertError} />
              {/if}
            </div>
          </div>
        </form>
      </div>
    </WhiteCard>
  </div>

  <WhiteCard>
    <h2 class="text-left text-lg font-bold text-indigo-800">Mis alarmas configuradas</h2>
    <Table showOptionsMenu={true} rows={data.alerts || []} {columns} />
    {#if data.errors?.alertsError}
      <ErrorLabel message={data.errors.alertsError} />
    {/if}
  </WhiteCard>
</div>
