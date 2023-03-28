<script lang="ts">
	import type { LayoutServerData } from './$types';
	import Header from './Header.svelte';
	import '../app.css';
	import './styles.css';

	export let data: LayoutServerData;
</script>

<div class="app">
	<Header username={data?.username} />

	<slot />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
