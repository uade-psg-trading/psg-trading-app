<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	export let id: string | undefined = undefined;
	export let name: string;
	export let labelTitle: string;
	export let placeholder: string;
	export let isRequired: boolean;
	export let autocomplete: string | undefined = undefined;
	export let type: HTMLInputAttributes['type'] = 'text';
	export let value: string = '';
</script>

<label for={name} class="sr-only">{labelTitle}</label>
<input
	{id}
	{name}
	{type}
	{autocomplete}
	required={isRequired}
	class="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
	{placeholder}
	{value}
	on:input
/>
