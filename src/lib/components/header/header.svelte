<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  export let username: string | undefined;

  let showUserMenu = false;
  let showMobileMenu = false;
  function toggleUserMenu() {
    showUserMenu = !showUserMenu;
  }

  function toggleMobileMenu() {
    showMobileMenu = !showMobileMenu;
  }

  function isCurrentRoute(currentRoute: string) {
    return $page.url.pathname === currentRoute ? 'bg-gray-900' : '';
  }

  onMount(() => {
    const userMenuListener = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        if (e.target.closest('#user-menu-button')) {
          return;
        }
      }

      showUserMenu = false;
    };

    const mobileMenuListener = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        if (e.target.closest('#mobile-button-container')) {
          return;
        }
      }

      showMobileMenu = false;
    };

    document.addEventListener('click', userMenuListener);
    document.addEventListener('click', mobileMenuListener);
    return () => {
      document.removeEventListener('click', userMenuListener);
      document.removeEventListener('click', mobileMenuListener);
    };
  });

  const routes = [
    {
      name: 'Portfolio',
      href: '/portfolio'
    },
    {
      name: 'Ingresar Dinero',
      href: '/cash-in'
    },
    {
      name: 'Historial de Operaciones',
      href: '/history'
    }
  ];

  const profileMenuRoutes = [
    {
      name: 'Perfil',
      href: '/profile'
    },
    {
      name: 'Cerrar Sesión',
      href: '/sign-out',
      shouldReload: true,
      preloadData: false,
      generateRandom: true
    }
  ];
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
          <img
            class="block h-8 w-auto lg:hidden"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
          <img
            class="hidden h-8 w-auto lg:block"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
        </div>
        <div class="hidden sm:ml-6 sm:block">
          <div class="flex space-x-4">
            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
            <a
              href="/"
              class="{isCurrentRoute('/')} text-white rounded-md px-3 py-2 text-sm font-medium"
              aria-current="page"
              data-sveltekit-reload>Inicio</a
            >
            {#if username}
              {#each routes as route}
                <a
                  href={route.href}
                  class="{isCurrentRoute(
                    route.href
                  )} text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  data-sveltekit-reload
                  data-sveltekit-preload-data="off">{route.name}</a
                >
              {/each}
            {/if}
          </div>
        </div>
      </div>
      {#if username}
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <a
            href="/notifications"
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
            <div
              hidden={!showUserMenu}
              class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabindex="-1"
            >
              {#each profileMenuRoutes as route, index}
                <a
                  href={route.generateRandom ? `${route.href}?random=${Math.random()}` : route.href}
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-{index}"
                  data-sveltekit-reload={!!route.shouldReload ? '' : 'off'}
                  data-sveltekit-preload-data={!!route.preloadData ? '' : 'off'}>{route.name}</a
                >
              {/each}
            </div>
          </div>
        </div>
      {:else}
        <div>
          <a
            href="/sign-in"
            class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >Ingresar</a
          >
          <a
            href="/register"
            class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >Registrarse</a
          >
        </div>
      {/if}
    </div>
  </div>

  <div hidden={!showMobileMenu} class="sm:hidden" id="mobile-menu">
    <div class="space-y-1 px-2 pt-2 pb-3">
      <a
        href="/"
        class="{isCurrentRoute('')} text-white block rounded-md px-3 py-2 text-base font-medium"
        aria-current="page">Inicio</a
      >
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
