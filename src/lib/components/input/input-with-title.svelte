<script lang="ts">
  import { onMount } from 'svelte';

  export let id: string | undefined = undefined;
  export let name: string;
  export let labelTitle: string;
  export let isRequired: boolean;
  export let autocomplete: string | undefined = undefined;
  export let value = '';
  export let step: string | undefined = undefined;
  export let min: string | undefined = undefined;
  export let max: string | undefined = undefined;
  export let disabled = false;
  export let readonly = false;
  export let type = 'text';

  const setType = (node: HTMLInputElement) => {
    node.type = type;
  };
  const classBase =
    'appearance-none block w-full  text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500';
  const classReadOnly = `${classBase} bg-gray-300`;
  const classDefault = `${classBase} bg-white`;
</script>

<label class="block tracking-wide text-gray-700 text-sm mb-2" for={name}>
  {labelTitle}
</label>
<input
  {step}
  {min}
  {max}
  class={readonly ? classReadOnly : classDefault}
  {id}
  {name}
  {autocomplete}
  bind:value
  required={isRequired}
  {disabled}
  {readonly}
  use:setType
  on:input
/>
