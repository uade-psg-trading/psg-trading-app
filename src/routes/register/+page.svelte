<script lang="ts">
	import type { ActionData } from './$types';
	import FormInput from '$lib/components/form-input/form-input.svelte';
	import Button from '$lib/components/button/button.svelte';
	import { enhance } from '$app/forms';

	export let form: ActionData;
</script>

<main class="relative min-h-screen w-full bg-white">
	<div class="p-6">
		<form action="?/register" method="POST" class="mx-auto max-w-sm text-center" use:enhance>
			<div class="space-y-4">
				<header class="mb-3 text-2xl font-bold">Create your profile</header>
				<div class="w-full  px-4 focus-within:ring-blue-400">
					<FormInput
						id="name"
						name="name"
						autocomplete="name"
						isRequired={true}
						labelTitle="Name"
						placeholder="Name"
						type="text"
						value={form?.data?.name ?? ''}
					/>
					{#if form?.errors?.name}
						<p class="error">Name is required</p>
					{/if}
				</div>
				<div class="w-full px-4 focus-within:ring-blue-400">
					<FormInput
						id="email"
						name="email"
						autocomplete="email"
						isRequired={true}
						labelTitle="Email"
						placeholder="Email"
						type="email"
						value={form?.data?.email ?? ''}
					/>
					{#if form?.errors?.email}
						<p class="error">Email is required</p>
					{/if}
				</div>
				<div class="w-full px-4 focus-within:ring-blue-400">
					<FormInput
						id="password"
						name="password"
						autocomplete="password"
						isRequired={true}
						labelTitle="Password"
						placeholder="Password"
						type="password"
					/>
					{#if form?.errors?.password}
						<p class="error">Password is not valid</p>
					{/if}
				</div>
				<div class="w-full px-4 focus-within:ring-blue-400">
					<FormInput
						id="confirmPassword"
						name="confirmPassword"
						isRequired={true}
						labelTitle="Confirm Password"
						placeholder="Confirm Password"
						type="password"
					/>
					{#if form?.errors?.confirmPassword}
						<p class="error">Password don't match</p>
					{/if}
				</div>
				<Button title="Crear cuenta" buttonType="submit" />
			</div>
		</form>
	</div>
</main>
