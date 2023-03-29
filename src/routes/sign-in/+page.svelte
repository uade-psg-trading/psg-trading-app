<script lang="ts">
	import { enhance } from '$app/forms';
	import logo from '$lib/images/logo/logo.svg';
	import type { ActionData } from './$types';
	import SecurityButton from '$lib/components/buttons/security-button.svelte';
	import SsoButton from '$lib/components/buttons/sso-button.svelte';
	import FormInput from '$lib/components/input/input.svelte';
	import CheckBox from '$lib/components/check-box/check-box.svelte';
	import Link from '$lib/components/link/link.svelte';

	/** @type {import('./$types').ActionData} */
	export let form: ActionData;
</script>

<svelte:head>
	<title>Inicia sesion en tu cuenta</title>
</svelte:head>

<div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<div>
			<img class="mx-auto h-12 w-auto" src={logo} alt="Trading" />
			<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
				Inicie sesion en su cuenta
			</h2>
			<h4 class="mt-2 text-center text-5x1 tracking-tight">
				o <Link href="/register" title="registrese gratis" />
			</h4>
		</div>
		<form class="mt-8 space-y-6" action="/sign-in" method="POST" use:enhance>
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
				<div class="text-red-500 text-sm">{form.errorMessage}</div>
			{/if}

			<SecurityButton title="Iniciar sesion" buttonType="submit" />
			<SsoButton title="Iniciar sesion con Google" ssoProvider="google" />
			<div />
		</form>
	</div>
</div>
