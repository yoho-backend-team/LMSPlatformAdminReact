// assets
import { IconDashboard ,IconLayoutDashboard} from '@tabler/icons';

// constant
const icons = { IconDashboard ,IconLayoutDashboard};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  // title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.IconLayoutDashboard,
      target: false,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
