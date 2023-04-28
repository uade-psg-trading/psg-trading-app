<script lang="ts">
  import type { ActionData } from './$types';
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import logo from '$lib/images/logo/logo.svg';
  import FormInput from '$lib/components/input/input-with-title.svelte';
  import PrimaryButton from '$lib/components/buttons/primary-button.svelte';
  import SecondaryButton from '$lib/components/buttons/secondary-button.svelte';
  import ErrorLabel from '$lib/components/error-label/error-label.svelte';
  import Swal from 'sweetalert2';

  /** @type {import('./$types').ActionData} */
  export let form: ActionData;

  let loading = false;

  function goSignIn() {
    goto('/sign-in');
  }
</script>

<svelte:head>
  <title>Register a new account</title>
</svelte:head>

<div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="rounded p-6 bg-white w-full max-w-screen-lg space-y-8">
    <div>
      <img class="mx-auto h-12 w-auto" src={logo} alt="Trading" />
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Registro de cuenta
      </h2>
    </div>
    <form
      action="?/register"
      method="POST"
      class="w-full"
      use:enhance={() => {
        loading = true;
        return async ({ update, result }) => {
          await update();
          loading = false;
          if (result.type === 'success') {
            Swal.fire({
              title: 'Registro finalizado',
              text: 'Serás redirigido a la pantalla de inicio de sesión.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              goSignIn();
            });
          }
        };
      }}
    >
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <FormInput
            id="name"
            name="name"
            autocomplete="name"
            isRequired={true}
            labelTitle="Name"
            value={form?.data?.name ?? ''}
            disabled={loading}
          />
          {#if form?.errors?.name}
            <ErrorLabel message="El campo nombre parece no estar correcto." />
          {/if}
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <FormInput
            id="lastName"
            name="lastName"
            isRequired={true}
            labelTitle="Apellido"
            value={form?.data?.email ?? ''}
            disabled={loading}
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full flex flex-wrap mb-6">
          <div class="w-3/6 px-3 mb-6">
            <FormInput id="dni" name="dni" isRequired={true} labelTitle="DNI" />
            {#if form?.errors?.email}
              <ErrorLabel message="El DNI ingresado no es correcto." />
            {/if}
          </div>
          <div class="w-4/6 px-3 ">
            <FormInput
              id="email"
              name="email"
              autocomplete="email"
              isRequired={true}
              labelTitle="Correo electronico"
              type="email"
              disabled={loading}
            />
            {#if form?.errors?.email}
              <ErrorLabel message="El campo email no parece ser correcto." />
            {/if}
          </div>
        </div>
        <div class="w-full flex flex-wrap mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <FormInput
              disabled={loading}
              id="country"
              name="country"
              isRequired={true}
              labelTitle="País"
            />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <FormInput
              disabled={loading}
              id="address"
              name="address"
              isRequired={true}
              labelTitle="Dirección"
            />
          </div>
        </div>
        <div class="flex flex-wrap mb-6">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <FormInput
              disabled={loading}
              id="city"
              name="city"
              isRequired={true}
              labelTitle="Ciudad"
            />
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <FormInput
              disabled={loading}
              id="state"
              name="state"
              isRequired={true}
              labelTitle="Provincia"
            />
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <FormInput
              disabled={loading}
              id="zipCode"
              name="zipCode"
              isRequired={true}
              labelTitle="Código postal"
            />
          </div>
        </div>
        <div class="w-full flex flex-wrap">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <FormInput
              id="password"
              name="password"
              isRequired={true}
              labelTitle="Contraseña"
              type="password"
              disabled={loading}
            />
            {#if form?.errors?.password}
              <ErrorLabel
                message="La password no cumple con nuestras policies de seguridad. Recuerde que deben tener al menos 1 mayuscula, 1 minuscula, 1 simbolo y al menos 7 letras"
              />
            {/if}
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <FormInput
              id="confirmPassword"
              name="confirmPassword"
              isRequired={true}
              labelTitle="Repetir contraseña"
              type="password"
              disabled={loading}
            />
            {#if form?.errors?.confirmPassword}
              <ErrorLabel message="Las passwords ingresadas no coinciden" />
            {/if}
          </div>
        </div>
      </div>
      <div class="justify-end items-end flex flex-col px-3 mb-6 md:mb-0">
        {#if form?.errors?.register}
          <div class="mb-3">
            <ErrorLabel message="Ha ocurrido un error durante el registro." />
          </div>
        {/if}
        {#if form?.errors?.registerMessage}
          <div class="mb-3">
            <ErrorLabel message={form?.errors?.registerMessage || ''} />
          </div>
        {/if}
        <div class="md:w-1/2 flex flex-row justify-end">
          <div class="md:w-1/4 mr-2">
            <SecondaryButton on:click={goSignIn} disabled={loading} title="Cancelar" />
          </div>
          <div class="md:w-1/4">
            <PrimaryButton {loading} title="Registrarse" buttonType="submit" />
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
