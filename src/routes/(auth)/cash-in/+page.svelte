<script>
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import { headerStore } from '$lib/stores';
  import PrimaryButton from '$lib/components/buttons/primary-button.svelte';
  import FormInput from '$lib/components/input/input-with-title.svelte';
  import CopyText from '$lib/components/text/copy-text.svelte';

  // Hay que cambiar esto. No sirve
  // Es 0 reusable
  // Tampoco me copa mucho la idea de crear una libreria de rutas.
  onMount(() => {
    headerStore.update((value) => {
      value.title = 'Ingresar dinero';
      return value;
    });
  });
</script>

<svelte:head>
  <title>Ingresar Dinero</title>
</svelte:head>

<div class="flex pt-0 pb-6 px-4 sm:px-6 lg:px-8">
  <div class="rounded p-6 bg-white w-full max-w-screen-lg space-y-8">
    <div>
      <h2 class="text-left text-lg font-bold text-indigo-800">Transferencia bancaria</h2>
      <p class="text-sm  text-gray-500">
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
      <form action="/cash-in" method="POST" class="w-full" use:enhance>
        <div class="-mx-3">
          <div class="w-3/6 mb-4 px-3">
            <FormInput
              id="amount"
              name="amount"
              isRequired={true}
              labelTitle="Importe a cargar"
              type="number"
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
              <FormInput id="cvc" name="cvc" isRequired={true} labelTitle="CVC" type="number" />
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
              <FormInput id="day" name="day" isRequired={true} labelTitle="Día" type="number" />
            </div>
            <div class="w-2/6 mb-4 px-3">
              <FormInput id="month" name="month" isRequired={true} labelTitle="Mes" type="number" />
            </div>
            <div class="w-2/6 mb-4 px-3">
              <FormInput id="year" name="year" isRequired={true} labelTitle="Año" type="number" />
            </div>
          </div>
        </div>
        <div class="justify-end flex ">
          <div class="px-3 mb-6 md:mb-0">
            <PrimaryButton title="Ingresar dinero" buttonType="submit" />
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
