<script lang="ts">
	import type { ActionData } from './$types';
	import Button from '$lib/components/button/button.svelte';
	import FormInput from '$lib/components/form-input/form-input.svelte';
	import CheckBox from '$lib/components/check-box/check-box.svelte';
	import Link from '$lib/components/link/link.svelte';

	/** @type {import('./$types').ActionData} */
	export let form: ActionData;
</script>

<svelte:head>
	<title>Sign in</title>
	<!-- <meta name="description" content="About this app" /> -->
</svelte:head>

<!--
  This example requires updating your template:

  ```
  <html class="h-full bg-gray-50">
  <body class="h-full">
  ```
-->
<div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8">
		<div>
			<img
				class="mx-auto h-12 w-auto"
				src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
				alt="Your Company"
			/>
			<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
				Sign in to your account
			</h2>
		</div>
		<form class="mt-8 space-y-6" action="/sign-in" method="POST">
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
						labelTitle="Password"
						id="password"
						name="password"
						isRequired={true}
						placeholder="Password"
						type="password"
					/>
				</div>
				<div />
			</div>
			<div class="flex items-center justify-between">
				<div class="flex items-center">
					<CheckBox id="remember-me" name="remember-me" title="Remember me" />
				</div>

				<div class="text-sm">
					<Link href="#" title="Forgot your password?" />
				</div>
			</div>
			{#if form?.errorMessage}
				<div class="text-red-500 text-sm">{form.errorMessage}</div>
			{/if}

			<Button title="Sign in" buttonType="submit" />
			<div />
		</form>
	</div>
</div>
