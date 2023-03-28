<script lang="ts">
	import logo from '$lib/images/logo/logo.svg';
	import type { ActionData } from './$types';
	import FormInput from '$lib/components/input/input-with-title.svelte';
	import PrimaryButton from '$lib/components/buttons/primary-button.svelte';
	import SecondaryButton from '$lib/components/buttons/secondary-button.svelte';
	import { enhance } from '$app/forms';

	/** @type {import('./$types').ActionData} */
	export let form: ActionData;
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
		<form action="?/register" method="POST" class="w-full" use:enhance>
			<div class="flex flex-wrap -mx-3 mb-6">
				<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
					<FormInput
						id="name"
						name="name"
						autocomplete="name"
						isRequired={true}
						labelTitle="Name"
						value={form?.data?.name ?? ''}
					/>
					{#if form?.errors?.name}
						<p class="error">Name is required</p>
					{/if}
				</div>
				<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
					<FormInput
						id="lastName"
						name="lastName"
						isRequired={true}
						labelTitle="Apellido"
						value={form?.data?.email ?? ''}
					/>
				</div>
			</div>
			<div class="flex flex-wrap -mx-3 mb-6">
				<div class="w-full flex flex-wrap mb-6">
					<div class="w-3/6 px-3 mb-6">
						<FormInput id="dni" name="dni" isRequired={true} labelTitle="DNI" />
					</div>
					<div class="w-4/6 px-3 ">
						<FormInput
							id="email"
							name="email"
							autocomplete="email"
							isRequired={true}
							labelTitle="Correo electronico"
							type="email"
						/>
						{#if form?.errors?.email}
							<p class="error">Email is required</p>
						{/if}
					</div>
				</div>
				<div class="w-full flex flex-wrap mb-6">
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<FormInput id="country" name="country" isRequired={true} labelTitle="País" />
					</div>
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<FormInput id="address" name="address" isRequired={true} labelTitle="Dirección" />
					</div>
				</div>
				<div class="flex flex-wrap mb-6">
					<div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
						<FormInput id="city" name="city" isRequired={true} labelTitle="Ciudad" />
					</div>
					<div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
						<FormInput id="state" name="state" isRequired={true} labelTitle="Provincia" />
					</div>
					<div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
						<FormInput
							id="postalCode"
							name="postalCode"
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
						/>
						{#if form?.errors?.password}
							<p class="error">Password is not valid</p>
						{/if}
					</div>
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<FormInput
							id="confirmPassword"
							name="confirmPassword"
							isRequired={true}
							labelTitle="Repetir contraseña"
							type="password"
						/>
						{#if form?.errors?.confirmPassword}
							<p class="error">Password don't match</p>
						{/if}
					</div>
				</div>
			</div>
			<div class="justify-end items-end flex px-3 mb-6 md:mb-0">
				<div class="md:w-1/2 flex flex-row justify-end">
					<div class="md:w-1/4 mr-2">
						<SecondaryButton title="Cancelar" />
					</div>
					<div class="md:w-1/4">
						<PrimaryButton title="Registrarse" buttonType="submit" />
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
