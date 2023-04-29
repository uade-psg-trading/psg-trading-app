<script lang="ts">
  import { goto } from '$app/navigation';
  import { enhance } from '$app/forms';
  import type { ActionData, PageData } from './$types';
  import SecurityButton from '$lib/components/buttons/security-button.svelte';
  import SsoButton from '$lib/components/buttons/sso-button.svelte';
  import FormInput from '$lib/components/input/input.svelte';
  import CheckBox from '$lib/components/check-box/check-box.svelte';
  import Link from '$lib/components/link/link.svelte';
  import ErrorLabel from '$lib/components/error-label/error-label.svelte';
  import AppLogo from '$lib/components/app-logo/app-logo.svelte';

  export let form: ActionData;
  export let data: PageData;

  let signInButtonLoading = false;
  let redirectLoading = false;

  function onEnhanceSubmit() {
    signInButtonLoading = true;

    return async ({ update }: { update: () => Promise<void> }) => {
      await update();
      signInButtonLoading = false;
    };
  }

  function goToGoogle() {
    redirectLoading = true;
    goto('/sign-in/google');
  }
</script>

<svelte:head>
  <title>Inicia sesión en tu cuenta</title>
</svelte:head>

<div class="flex justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="w-full max-w-md space-y-8">
    <div>
      <AppLogo tenant={data.tenant.id} />
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
        Inicie sesión en su cuenta
      </h2>
      <h4 class="mt-2 text-center text-5x1 tracking-tight">
        o <Link href="/register" title="registrese gratis" />
      </h4>
    </div>
    <form class="mt-8 space-y-6" action="/sign-in" method="POST" use:enhance={onEnhanceSubmit}>
      <input type="hidden" name="remember" value="true" />
      <div class="-space-y-px rounded-md shadow-sm">
        <div>
          <FormInput
            autocomplete="email"
            labelTitle="Email"
            id="email-address"
            name="email"
            isRequired={true}
            placeholder="Email"
            type="email"
            value={form?.email ?? ''}
          />
        </div>
        <div>
          <FormInput
            autocomplete="current-password"
            labelTitle="Contraseña"
            id="password"
            name="password"
            isRequired={true}
            placeholder="Contraseña"
            type="password"
          />
        </div>
        <div />
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <CheckBox id="remember-me" name="remember-me" title="Recordarme" />
        </div>

        <div class="text-sm">
          <Link href="#" title="¿Olvido su contraseña?" />
        </div>
      </div>
      {#if form?.errorMessage}
        <ErrorLabel message={form.errorMessage} />
      {/if}

      <SecurityButton loading={signInButtonLoading} title="Iniciar sesion" buttonType="submit" />
      <SsoButton
        loading={redirectLoading}
        on:click={goToGoogle}
        title="Iniciar sesion con Google"
        ssoProvider="google"
      />
      <div />
    </form>
  </div>
</div>
