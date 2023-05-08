<script lang="ts">
  import { page } from '$app/stores';
  import { profileRouteStore, globalRouteStore } from '$lib/stores/route-store';
  import AppLogo from '$lib/components/app-logo/app-logo.svelte';
  import type { TenantType } from '$lib/tenant-manager';
  import FloatingMenu from '../floating-menu/floating-menu.svelte';

  type Route = {
    id: string;
    name: string;
    href: string;
    isSubMenuVisible?: boolean;
    subMenuRoutes?: SubMenuRoute[];
  };

  type SubMenuRoute = {
    name: string;
    href: string;
  };

  export let tenant: TenantType;
  let showProfileMenu = false;
  let showMobileMenu = false;

  function toggleUserMenu() {
    showProfileMenu = !showProfileMenu;
  }

  function toggleMobileMenu() {
    showMobileMenu = !showMobileMenu;
  }

  function toggleSubMenu(route: Route) {
    if (route.subMenuRoutes) {
      route.isSubMenuVisible = !route.isSubMenuVisible;
      // reactiveness de svelte
      // Si borras esto no detecta cambios entonces no renderiza.
      routes = routes;
    }
  }

  function isCurrentRoute(currentRoute: string) {
    return $page.url.pathname === currentRoute ? 'bg-gray-900' : '';
  }

  let routes = $globalRouteStore;
  const profileMenuRoutes = $profileRouteStore;
</script>

<nav class="bg-gray-800">
  <div class="mx-auto px-2 sm:px-6 lg:px-8">
    <div class="relative flex h-16 items-center justify-between">
      <div
        id="mobile-button-container"
        class="absolute inset-y-0 left-0 flex items-center sm:hidden"
      >
        <button
          id="mobile-menu-button"
          type="button"
          class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          aria-controls="mobile-menu"
          aria-expanded="false"
          on:click={toggleMobileMenu}
        >
          <svg
            class="pointer-events-none block h-6 w-6 {showMobileMenu && 'hidden'}"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <svg
            class="pointer-events-none h-6 w-6 {!showMobileMenu && 'hidden'}"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div class="flex flex-shrink-0 items-center">
          <AppLogo {tenant} customClasses="block h-8 w-auto lg:hidden" />
          <AppLogo {tenant} customClasses="hidden h-8 w-auto lg:block" />
        </div>
        <div class="hidden sm:ml-6 sm:block">
          <div class="flex space-x-4">
            {#each routes as route}
              <div class="relative">
                <a
                  id={route.id}
                  on:click={() => toggleSubMenu(route)}
                  href={route.href}
                  class="{isCurrentRoute(
                    route.href
                  )} text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >{route.name}</a
                >

                {#if route.subMenuRoutes}
                  <FloatingMenu
                    actionButtonId={route.id}
                    isVisible={route.isSubMenuVisible}
                    classes="top-full left-0 mt-2"
                  >
                    {#each route.subMenuRoutes as subMenuRoute}
                      <a
                        href={subMenuRoute.href}
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left"
                        data-sveltekit-reload
                        data-sveltekit-preload-data="off">{subMenuRoute.name}</a
                      >
                    {/each}
                  </FloatingMenu>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      </div>
      <div
        class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
      >
        <a
          href="#top"
          class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <span class="sr-only">View notifications</span>
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
        </a>

        <!-- Profile dropdown -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div on:click={toggleUserMenu} class="relative ml-3">
          <div>
            <button
              type="button"
              class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <img
                class="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </button>
          </div>
          <FloatingMenu
            isVisible={showProfileMenu}
            classes="right-0 z-10 mt-2"
            actionButtonId="user-menu-button"
          >
            {#each profileMenuRoutes as route, index}
              <a
                href={route.generateRandom ? `${route.href}?random=${Math.random()}` : route.href}
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-{index}"
                data-sveltekit-reload={route.shouldReload ? '' : 'off'}
                data-sveltekit-preload-data={route.preloadData ? '' : 'off'}>{route.name}</a
              >
            {/each}
          </FloatingMenu>
        </div>
      </div>
    </div>
  </div>

  <div hidden={!showMobileMenu} class="sm:hidden" id="mobile-menu">
    <div class="space-y-1 px-2 pt-2 pb-3">
      {#each routes as route}
        <a
          href={route.href}
          class="{isCurrentRoute(
            route.href
          )} text-white block rounded-md px-3 py-2 text-base font-medium"
          aria-current="page">{route.name}</a
        >
      {/each}
    </div>
  </div>
</nav>
