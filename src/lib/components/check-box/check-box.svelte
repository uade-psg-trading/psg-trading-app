<script lang="ts">
  export let title: string;
  export let id: string | undefined;
  export let name: string | undefined;
</script>

<input
  {id}
  {name}
  type="checkbox"
  class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
/>
<label for={name} class="ml-2 block text-sm text-gray-900">{title}</label>
