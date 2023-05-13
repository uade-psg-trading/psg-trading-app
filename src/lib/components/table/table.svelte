<script lang="ts">
  import MenuIcon from '$lib/icons/menu-icon.svelte';
  import FloatingMenu from '../floating-menu/floating-menu.svelte';
  import AlertIcon from '$lib/icons/alert-icon.svelte';

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

  type InternalRow = Row & {
    isMenuActive: boolean;
  };

  type MenuOptions = {
    title: string;
    href?: string;
    calcHref?: (row: Row) => string;
  };

  export let columns: Column[];
  export let rows: Row[];
  export let menuOptions: MenuOptions[] = [];
  export let showOptionsMenu = false;
  export let showCustomButton = false;
  export let name = 'sample';
  export let onCustomButtonClick: undefined | ((row: Row) => void) = undefined;

  function getRowMenuId(rowIndex: number) {
    return `table-row-${name}-${rowIndex}`;
  }

  function handleShowMenu(rowIndex: number) {
    const { isMenuActive } = internalRows[rowIndex];
    internalRows[rowIndex].isMenuActive = !isMenuActive;
    internalRows = internalRows;
  }

  let internalRows: InternalRow[] = rows.map((row) => {
    return {
      isMenuActive: false,
      ...row
    };
  });
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
              {#if showCustomButton}
                <th class="whitespace-nowrap px-6 py-4 font-medium" />
              {/if}
            </tr>
          </thead>
          <tbody class="bg-white text-gray-500">
            {#each internalRows as row, rowIndex}
              <tr class="border">
                {#each columns as column (column.key)}
                  {#if column.visible || column.visible === undefined}
                    <td class={`${column.classes || ''} whitespace-nowrap px-6 py-4`}>
                      {#if column.value(row) === 'showAlert'}
                        <AlertIcon />
                      {:else}
                        {column.value(row)}
                      {/if}
                    </td>
                  {/if}
                {/each}
                {#if showOptionsMenu}
                  <td class="right whitespace-nowrap px-6 py-4 font-medium">
                    <button id={getRowMenuId(rowIndex)} on:click={() => handleShowMenu(rowIndex)}>
                      <MenuIcon />
                    </button>
                    <FloatingMenu
                      actionButtonId={getRowMenuId(rowIndex)}
                      isVisible={row.isMenuActive}
                      classes="z-10 w-20"
                    >
                      {#each menuOptions as options}
                        <a
                          href={options.href || (options.calcHref && options.calcHref(row)) || '#'}
                          class="text-left px-4 py-2 block text-sm text-gray-700 hover:bg-gray-50"
                          >{options.title}</a
                        >
                      {/each}
                    </FloatingMenu>
                  </td>
                {/if}
                {#if showCustomButton}
                  <td class="right whitespace-nowrap px-6 py-4 font-medium">
                    <button on:click={() => onCustomButtonClick && onCustomButtonClick(row)}>
                      <slot name="custom-button" />
                    </button>
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
