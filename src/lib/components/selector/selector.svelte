<script lang="ts">
  export let id: string | undefined = undefined;
  export let list: { value: string; label: string }[];
  export let value = '-1';
  export let name: string;
  export let labelTitle: string;
</script>

<label class="block tracking-wide text-gray-700 text-sm mb-2" for={name}>
  {labelTitle}
</label>
<select
  {id}
  {name}
  bind:value
  class="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
>
  <option value="-1">--Seleccionar--</option>
  {#each list as item}
    <option value={item.value}>
      {item.label}
    </option>
  {/each}
</select>
