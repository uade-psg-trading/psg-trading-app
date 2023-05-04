<script lang="ts">
  import type { ActionData, PageData } from './$types';
  import FormInput from '$lib/components/input/input-with-title.svelte';
  import PrimaryButton from '$lib/components/buttons/primary-button.svelte';
  import Selector from '$lib/components/selector/selector.svelte';
  import { enhance } from '$app/forms';
  import CandleChart from '$lib/components/charts/candle-chart/candle-chart.svelte';
  import AppLogo from '$lib/components/app-logo/app-logo.svelte';
  import Swal from 'sweetalert2';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { headerStore } from '$lib/stores';
  import ErrorLabel from '$lib/components/error-label/error-label.svelte';
  import { error } from '@sveltejs/kit';

  export let data: PageData;
  export let form: ActionData;
  let selectedValue: string;
  const tokenList = data.result;
  const operation = data.operation;
  const operationLabel = data.operation == 'sell' ? 'Vender' : 'Comprar';

  function goHome() {
    goto('/');
  }

  onMount(() => {
    headerStore.update((value) => {
      value.title = `${operationLabel} token`;
      return value;
    });
  });

  function onEnhanceSubmit() {
    return async ({ update, result }: any) => {
      await update();
      if (result.type === 'success') {
        Swal.fire({
          title: 'Venta exitosa',
          text: 'Vendiste de manera exitosa el Token',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          goHome();
        });
      }
    };
  }
</script>

<svelte:head>
  <title>{operationLabel} Activo</title>
</svelte:head>

<div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="rounded p-6 bg-white w-full max-w-screen-lg space-y-8">
    <div class="flex">
      <div class="w-1/6">
        <AppLogo tenant={data.tenant.id} />
      </div>
      <div class="w-4/6">
        <h1 class="mt-6 text-center text-4xl font-bold tracking-tight text-gray-900">
          Paris Saint-Germain Fan Token
        </h1>
      </div>
      <div class="w-1/6">
        <h2 class="mt-10 text-center text-base text-gray-900">$ 5.2808112</h2>
      </div>
    </div>
    <form
      action="/portfolio/{operation}"
      method="POST"
      class="w-full"
      use:enhance={() => {
        return async ({ update, result }) => {
          await update();
          if (result.type === 'success') {
            Swal.fire({
              title: 'Operación exitosa',
              text: 'Pudiste ' + operationLabel + ' de manera exitosa el Token',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              goHome();
            });
          }
        };
      }}
    >
      <div class="flex flex-wrap">
        <div class="w-full md:w-1/2 px-3 mb-6">
          <Selector
            id="tokenSelection"
            name="tokenSelection"
            value={selectedValue}
            list={tokenList
              ?.filter((symbol) => symbol.symbol != 'USD')
              .map((symbol) => symbol.symbol) || []}
            labelTitle="Token"
          />
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6">
          <FormInput id="amount" name="amount" isRequired={true} labelTitle="Cantidad" />
        </div>
      </div>
      <div class="justify-end items-end flex px-3 mb-6 md:mb-0">
        <div class="md:w-1/2 flex flex-row justify-end">
          {#if data.error}
            <ErrorLabel message={data.error} />
          {/if}
          {#if form?.errors?.message}
            <ErrorLabel message={form.errors?.message} />
          {/if}
          <div class="md:w-1/4">
            <PrimaryButton title={operationLabel} buttonType="submit" />
          </div>
        </div>
      </div>
    </form>
    <CandleChart />
  </div>
</div>
