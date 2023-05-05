import { readable } from 'svelte/store';

export const globalRouteStore = readable([
  {
    id: 'portfolio-header',
    name: 'Portfolio',
    href: '/portfolio'
  },
  {
    id: 'history-header',
    name: 'Historial de Operaciones',
    href: '/history'
  },
  {
    id: 'cash-in-header',
    name: 'Ingresar Dinero',
    href: '/cash-in'
  },
  {
    id: 'buy-sell-header',
    name: 'Operar',
    href: '#',
    isSubMenuVisible: false,
    subMenuRoutes: [
      {
        name: 'Vender',
        href: '/portfolio/sell'
      },
      {
        name: 'Comprar',
        href: '/portfolio/buy'
      }
    ]
  }
]);

export const profileRouteStore = readable([
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
]);
