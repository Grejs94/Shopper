import {
  MainPage,
  BasketPage,
  ShopPage,
  SettingsPage,
  RoutePage,
  HelperPage,
} from 'pages'

export const mainRoutes = [
  {
    path: '/',
    component: MainPage,
    exact: true,
  },
  {
    path: '/shopHelper',
    component: HelperPage,
  },
  {
    path: '/basket',
    component: BasketPage,
  },
  {
    path: '/route',
    component: RoutePage,
  },
  {
    path: '/settings',
    component: SettingsPage,
  },
  {
    path: '/shop',
    component: ShopPage,
  },
]
