import { IconKey, IconShieldLock, IconUser, IconUsers } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconShieldLock,
  IconUser,
  IconUsers
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'subscription-management',
  title: '',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Subscriptions',
      type: "item",
      icon: icons.IconShieldLock,
      url: '/subscription-management/plans-and-features',
      target: false,
      breadcrumbs: false,
      // children: [
      //   {
      //     id: 'plans-and-features',
      //     title: 'Plans and Features',
      //     type: 'item',
      //     url: '/subscription-management/plans-and-features',
      //     icon: icons.IconUsers,
      //     target: false,
      //     breadcrumbs: false
      //   }
      // ]
    }
  ]
};

export default pages;
