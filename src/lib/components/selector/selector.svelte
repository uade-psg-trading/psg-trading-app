<script lang="ts">
  export let id: string | undefined = undefined;
  export let list: string[];
  export let value: string;
  export let name: string;
  export let labelTitle: string;
</script>

<label class="block tracking-wide text-gray-700 text-sm mb-2" for={name}>
  {labelTitle}
</label>
<select
  {id}
  {name}
  {value}
  class="appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
>
  {#each list as option}
    <option value={option}>
      {option}
    </option>
  {/each}
</select>
