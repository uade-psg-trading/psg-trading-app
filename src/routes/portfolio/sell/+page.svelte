<script lang="ts">
	import psg_logo from '$lib/images/logo/psg_logo.svg';
	import token_chart from '$lib/images/token_chart.svg';
	import FormInput from '$lib/components/input/input-with-title.svelte';
	import PrimaryButton from '$lib/components/buttons/primary-button.svelte';
	import { enhance } from '$app/forms';
</script>

<svelte:head>
	<title>Vender Activo</title>
</svelte:head>

<div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
	<div class="rounded p-6 bg-white w-full max-w-screen-lg space-y-8">
		<div class="flex">
			<div class="w-1/6 ">
				<img class="mx-auto " src={psg_logo} alt="Trading" />
			</div>
			<div class="w-4/6 ">
				<h1 class="mt-6 text-center text-4xl font-bold tracking-tight text-gray-900">
					Paris Saint-Germain Fan Token
				</h1>
			</div>
			<div class="w-1/6">
				<h2 class="mt-10 text-center text-base  text-gray-900">$ 5.2808112</h2>
			</div>
		</div>
		<form action="/portfolio/sell" method="POST" class="w-full" use:enhance>
			<div class="flex flex-wrap">
				<div class="w-full md:w-1/2 px-3 mb-6">
					<FormInput id="token" name="token" isRequired={true} labelTitle="Token" />
				</div>
				<div class="w-full md:w-1/2 px-3 mb-6">
					<FormInput id="amount" name="amount" isRequired={true} labelTitle="Cantidad" />
				</div>
			</div>
			<div class="justify-end items-end flex px-3 mb-6 md:mb-0">
				<div class="md:w-1/2 flex flex-row justify-end">
					<div class="md:w-1/4">
						<PrimaryButton title="Vender" buttonType="submit" />
					</div>
				</div>
			</div>
		</form>
		<img class="mx-auto w-1/2" src={token_chart} alt="Chart" />
	</div>
</div>
