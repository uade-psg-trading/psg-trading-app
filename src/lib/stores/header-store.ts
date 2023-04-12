import { writable } from 'svelte/store';

export const headerStore = writable({
  title: 'Trading app'
});
