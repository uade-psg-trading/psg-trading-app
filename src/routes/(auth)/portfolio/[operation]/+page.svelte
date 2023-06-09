<script lang="ts">
  import { onMount } from 'svelte';
  import type { ActionData, PageData } from './$types';
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { headerStore } from '$lib/stores';
  import FormInput from '$lib/components/input/input-with-title.svelte';
  import PrimaryButton from '$lib/components/buttons/primary-button.svelte';
  import Selector from '$lib/components/selector/selector.svelte';
  import CandleChart from '$lib/components/charts/candle-chart/candle-chart.svelte';
  import AppLogo from '$lib/components/app-logo/app-logo.svelte';
  import ErrorLabel from '$lib/components/error-label/error-label.svelte';
  import Swal from 'sweetalert2';
  import { notifications } from '$lib/components/toast/notifications';
  import { formatNumber } from '$lib/utils/helpers';

  export let data: PageData;
  export let form: ActionData;
  let selectedValue: string | undefined = data.queryStringSymbol;
  let loading = false;
  let amount = '';
  const tokens = data.tokens ?? [];
  const operation = data.operation;
  const operationLabel = data.operation == 'sell' ? 'Vender' : 'Comprar';

  onMount(() => {
    headerStore.update((value) => {
      value.title = `${operationLabel} token`;
      return value;
    });
  });

  function onEnhanceSubmit() {
    loading = true;
    return async ({ update, result }: any) => {
      await update();
      loading = false;
      if (result.type === 'success') {
        Swal.fire({
          title: 'Operación exitosa',
          text: 'Pudiste ' + operationLabel + ' de manera exitosa el Token',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          goto(`/portfolio/${operation}`);
        });
      }
      if (result.type === 'failure') {
        console.log(result);
        notifications.danger(result?.data?.errors.message, 5000);
      }
    };
  }
</script>

<svelte:head>
  <title>{operationLabel} Activo</title>
</svelte:head>

<div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-w-full">
  <div class="rounded p-6 bg-white w-full max-w-screen-lg space-y-8">
    <div class="flex">
      <div class="w-1/6">
        <AppLogo tenant={data.tenant.id} />
      </div>
      <div class="w-4/6">
        <h1 class="mt-6 text-center text-4xl font-bold tracking-tight text-gray-900">
          {tokens.find((token) => token.value == selectedValue)?.symbolName ?? 'Fan Token'}
        </h1>
      </div>
      <div class="w-1/6">
        <h2 class="mt-10 text-center text-base text-gray-900">
          $ {formatNumber(tokens.find((token) => token.value == selectedValue)?.price || 0)}
        </h2>
        <h2
          class="text-base text-center {Number(
            tokens.find((token) => token.value == selectedValue)?.variation
          ) < 0
            ? 'text-red-400'
            : 'text-green-400'}"
        >
          % {tokens.find((token) => token.value == selectedValue)?.variation || 0}
        </h2>
      </div>
    </div>
    <form
      action="/portfolio/{operation}"
      method="POST"
      class="w-full"
      use:enhance={onEnhanceSubmit}
    >
      <div class="flex flex-wrap">
        <div class="w-full md:w-1/2 px-3 mb-1.5">
          <Selector
            id="tokenSelection"
            name="tokenSelection"
            bind:value={selectedValue}
            list={tokens}
            labelTitle="Token"
          />
        </div>
        <div class="w-full md:w-1/2 px-3 mb-1.5">
          <FormInput
            step={'0.01'}
            min={'1'}
            type="number"
            id="amount"
            name="amount"
            isRequired={true}
            labelTitle="Cantidad"
            bind:value={amount}
          />
        </div>
        <div class="w-full justify-end items-end flex flex-col px-3">
          {#if operation == 'sell'}
            <div class="mb-4">
              <p class="text-xs text-gray-400">
                Cantidad disponible {tokens.find((token) => token.value == selectedValue)?.amount ||
                  0}
              </p>
            </div>
          {/if}
          <div class="mb-4">
            <p class="text-sm text-gray-700">
              $ {formatNumber(tokens.find((token) => token.value == selectedValue)?.price || 0)} * {amount ||
                0} = $ {formatNumber(
                Number(tokens.find((token) => token.value == selectedValue)?.price) *
                  Number(amount) || 0
              )}
            </p>
          </div>
        </div>
        {#if operation == 'buy'}
          <div class="px-3 my-6 flex flex-row justify-between w-full">
            <h1 class="text-center text-lg font-bold tracking-tight text-gray-700">
              Saldo disponible para operar: $ {data.fiatBalance}
            </h1>
            <a class="text-indigo-800 underline self-center" href="/cash-in"
              >Ingresar dinero en la plataforma</a
            >
          </div>
        {/if}
      </div>
      <div class="justify-end items-end flex px-3 mb-6 md:mb-0">
        <div class="md:w-1/2 flex flex-row justify-end">
          <!-- {#if form?.errors?.message}
            {notifications.danger(form?.errors.message, 5000)}
          {/if} -->
          <div class="md:w-1/4">
            <PrimaryButton {loading} title={operationLabel} buttonType="submit" />
          </div>
        </div>
      </div>
    </form>
    <CandleChart symbol={selectedValue || 'PSG'} />
  </div>
</div>
