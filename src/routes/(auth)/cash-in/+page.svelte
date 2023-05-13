<script lang="ts">
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import { headerStore } from '$lib/stores';
  import PrimaryButton from '$lib/components/buttons/primary-button.svelte';
  import FormInput from '$lib/components/input/input-with-title.svelte';
  import CopyText from '$lib/components/text/copy-text.svelte';
  import Swal from 'sweetalert2';
  import { goto } from '$app/navigation';
  import type { ActionData } from './$types';
  import ErrorLabel from '$lib/components/error-label/error-label.svelte';

  // Hay que cambiar esto. No sirve
  // Es 0 reusable
  // Tampoco me copa mucho la idea de crear una libreria de rutas.
  export let form: ActionData;
  let loading = false;
  onMount(() => {
    headerStore.update((value) => {
      value.title = 'Ingresar dinero';
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
          title: 'Ingreso de dinero exitoso',
          text: 'Ingresaste de manera exitosa el dinero.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          goHome();
        });
      }
    };
  }

  function goHome() {
    goto('/');
  }
</script>

<svelte:head>
  <title>Ingresar Dinero</title>
</svelte:head>

<div class="flex pt-0 pb-6 px-4 sm:px-6 lg:px-8">
  <div class="rounded p-6 bg-white w-full max-w-screen-lg space-y-8">
    <div>
      <h2 class="text-left text-lg font-bold text-indigo-800">Transferencia bancaria</h2>
      <p class="text-sm text-gray-500">
        Para ingresar dinero a Workflow podes realizar una transferencia al siguiente numero de
        cuenta.
      </p>
      <div>
        <CopyText title="CBU" text="3220001805006276640017" />
        <CopyText title="Alias" text="WorkflowDeposito" />
      </div>
    </div>
    <div>
      <h2 class="text-left text-lg font-bold text-indigo-800">Tarjeta de crédito</h2>
      <p class="text-sm text-gray-500 mb-4">
        Para ingresar dinero a Workflow con tarjeta de credito podes completar los datos de tu
        tarjeta favorita y cargar saldo con un solo click.
      </p>
      <form action="/cash-in" method="POST" class="w-full" use:enhance={onEnhanceSubmit}>
        <div class="-mx-3">
          <div class="w-3/6 mb-4 px-3">
            <FormInput
              step="0.01"
              id="amount"
              name="amount"
              isRequired={true}
              labelTitle="Importe a cargar"
              inputType="number"
            />
          </div>
          <div class="flex">
            <div class="w-3/6 mb-4 px-3">
              <FormInput
                id="card_number"
                name="card_number"
                isRequired={true}
                labelTitle="Número de tarjeta"
              />
            </div>
            <div class="w-3/6 mb-4 px-3">
              <FormInput
                id="cvc"
                name="cvc"
                isRequired={true}
                labelTitle="CVC"
                inputType="number"
              />
            </div>
          </div>
          <div class="w-3/6 mb-4 px-3">
            <FormInput
              id="full_name"
              name="full_name"
              isRequired={true}
              labelTitle="Nombre y apellido"
            />
          </div>
          <div class="flex">
            <div class="w-2/6 mb-4 px-3">
              <FormInput
                id="month"
                name="month"
                isRequired={true}
                labelTitle="Mes"
                inputType="number"
              />
            </div>
            <div class="w-2/6 mb-4 px-3">
              <FormInput
                id="year"
                name="year"
                isRequired={true}
                labelTitle="Año"
                inputType="number"
              />
            </div>
          </div>
        </div>
        <div class="justify-end flex">
          {#if form?.errors}
            <ErrorLabel message={form?.errors?.message || ''} />
          {/if}
          <div class="px-3 mb-6 md:mb-0">
            <PrimaryButton {loading} title="Ingresar dinero" buttonType="submit" />
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
