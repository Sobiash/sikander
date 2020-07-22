import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: `Dashboard`,
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: `Search`,
    icon: 'search-outline',
    link: '/pages/search',
  },
  {
    title: `Receive`,
    icon: 'download-outline',
    link: '/pages/receiving',
  },
  {
    title: `Request`,
    icon: 'log-in-outline',
    link: '/pages/kremo',
  },
  {
    title: `Users`,
    icon: 'people-outline',
    link: '/pages/users',
  },
  {
    title: `Roles`,
    icon: 'unlock-outline',
    link: '/pages/roles',
  },
  {
    title: `Notifications`,
    icon: 'bell-outline',
    link: '/pages/notifications',
  },
];
