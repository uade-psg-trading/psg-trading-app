<script lang="ts">
	import type { LayoutServerData } from './$types';
	import Header from './Header.svelte';
	import '../app.css';
	import './styles.css';

	export let data: LayoutServerData;
</script>

<div class="app">
	<Header username={data?.username} />

	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
