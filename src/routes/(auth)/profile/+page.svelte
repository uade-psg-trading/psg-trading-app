<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import logo from '$lib/images/logo/logo.svg';
  import FormInput from '$lib/components/input/input-with-title.svelte';
  import PrimaryButton from '$lib/components/buttons/primary-button.svelte';
  import SecondaryButton from '$lib/components/buttons/secondary-button.svelte';
  export let data;

  function goToHome() {
    goto('/');
  }
</script>

<svelte:head>
  <title>Profile</title>
</svelte:head>

<div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="rounded p-6 bg-white w-full max-w-screen-lg space-y-8">
    <div>
      <img class="mx-auto h-12 w-auto" src={logo} alt="Trading" />
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Editar perfil
      </h2>
    </div>
    <form action="/profile" method="POST" class="w-full" use:enhance>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <FormInput
            id="name"
            name="name"
            autocomplete="name"
            isRequired={true}
            labelTitle="Name"
            value={data.firstName}
          />
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <FormInput
            id="lastName"
            name="lastName"
            isRequired={true}
            labelTitle="Apellido"
            value={data.lastName}
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full flex flex-wrap mb-6">
          <div class="w-3/6 px-3 mb-6">
            <FormInput
              id="dni"
              name="dni"
              isRequired={true}
              labelTitle="DNI"
              value={String(data.dni)}
              readonly={true}
            />
          </div>
          <div class="w-4/6 px-3">
            <FormInput
              id="email"
              name="email"
              autocomplete="email"
              isRequired={true}
              labelTitle="Correo electronico"
              type="email"
              value={data.email}
              readonly={true}
            />
          </div>
        </div>
        <div class="w-full flex flex-wrap mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <FormInput
              id="country"
              name="country"
              isRequired={true}
              labelTitle="País"
              value={data.location?.country}
            />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <FormInput
              id="address"
              name="address"
              isRequired={true}
              labelTitle="Dirección"
              value={data.location?.address}
            />
          </div>
        </div>
        <div class="flex flex-wrap mb-6">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <FormInput
              id="city"
              name="city"
              isRequired={true}
              labelTitle="Ciudad"
              value={data.location?.city}
            />
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <FormInput
              id="state"
              name="state"
              isRequired={true}
              labelTitle="Provincia"
              value={data.location?.province}
            />
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <FormInput
              id="zipCode"
              name="zipCode"
              isRequired={true}
              labelTitle="Código postal"
              value={data.location?.zipCode}
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
            />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <FormInput
              id="confirmPassword"
              name="confirmPassword"
              isRequired={true}
              labelTitle="Repetir contraseña"
              type="password"
            />
          </div>
        </div>
      </div>
      <div class="justify-end items-end flex px-3 mb-6 md:mb-0">
        <div class="md:w-1/2 flex flex-row justify-end">
          <div class="md:w-1/4 mr-2">
            <SecondaryButton on:click={goToHome} title="Cancelar" />
          </div>
          <div class="md:w-1/3">
            <PrimaryButton buttonType="submit" title="Guardar cambios" />
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
