<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  export let id: string | undefined = undefined;
  export let name: string;
  export let labelTitle: string;
  export let isRequired: boolean;
  export let autocomplete: string | undefined = undefined;
  export let type: HTMLInputAttributes['type'] = 'text';
  export let value = '';
  export let readonly = false;
  const classBase =
    'appearance-none block w-full  text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500';
  const classReadOnly = `${classBase} bg-gray-300`;
  const classDefault = `${classBase} bg-white`;
</script>

<label class="block tracking-wide text-gray-700 text-sm mb-2" for={name}>
  {labelTitle}
</label>
<input
  class={readonly ? classReadOnly : classDefault}
  {id}
  {name}
  {type}
  {autocomplete}
  {value}
  required={isRequired}
  {readonly}
  on:input
/>
