<script lang="ts">
  type Column = {
    key: string;
    title: string;
    value: (row: Row) => string | number | undefined;
    sortable?: boolean;
    visible?: boolean;
    classes?: string;
  };

  type Row = {
    [key: string]: string | number | undefined;
  };

  export let columns: Column[];
  export let rows: Row[];
  export let showOptionsMenu = false;
</script>

<div class="flex flex-col">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="shadow min-w-full text-center text-sm font-light table-fixed">
          <thead class="uppercase border bg-gray-50 font-medium text-gray-500">
            <tr>
              {#each columns as column (column.key)}
                {#if column.visible || column.visible === undefined}
                  <th scope="col" class="px-6 py-3">
                    {column.title}
                  </th>
                {/if}
              {/each}
              {#if showOptionsMenu}
                <th class="whitespace-nowrap px-6 py-4 font-medium" />
              {/if}
            </tr>
          </thead>
          <tbody class="bg-white text-gray-500">
            {#each rows as row}
              <tr class="border">
                {#each columns as column (column.key)}
                  {#if column.visible || column.visible === undefined}
                    <td class={`${column.classes || ''} whitespace-nowrap px-6 py-4`}>
                      {column.value(row)}
                    </td>
                  {/if}
                {/each}
                {#if showOptionsMenu}
                  <td class="whitespace-nowrap px-6 py-4 font-medium">
                    <svg
                      class="cursor-pointer h-8 w-8 text-black"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" /> <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="19" r="1" /> <circle cx="12" cy="5" r="1" /></svg
                    >
                  </td>
                {/if}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
