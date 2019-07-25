import { RouteProps } from 'react-router';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { About } from './pages/About';
import { Product } from './pages/Product';
import { Subproduct } from './pages/Subproduct';
import { ChangePassword } from './pages/ChangePassword';
import { TransitionType } from './SlideSwitch/utils';

export type RouteType = {
  path: string;
  component: RouteProps['component'];
  exact?: boolean;
  transition: TransitionType;
};

export const dataRoutes: RouteType[] = [
  {
    path: '/home',
    component: Home,
    exact: true,
    transition: 'fade'
  },
  {
    path: '/product/:productId',
    component: Product,
    exact: true,
    transition: 'slide'
  },
  {
    transition: 'slide',
    path: '/subproduct/:subproductId',
    component: Subproduct,
    exact: true
  },
  {
    path: '/profile',
    component: Profile,
    transition: 'fade',
    exact: true
  },
  {
    path: '/change-password',
    component: ChangePassword,
    exact: true,
    transition: 'zoom'
  },
  {
    path: '/about',
    component: About,
    exact: true,
    transition: 'fade'
  }
];
