import { RouteComponentProps, RouteProps } from 'react-router';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { About } from './pages/About';
import { Product } from './pages/Product';
import { Subproduct } from './pages/Subproduct';
import { ChangePassword } from './pages/ChangePassword';

export type RouteType = {
  path: string;
  component: RouteProps['component'];
  exact?: boolean;
  slideChildren?: RouteType[];
  zoomChildren?: RouteType[];
  fadeChildren?: RouteType[];
};

export const routes: RouteType[] = [
  {
    path: '/home',
    component: Home,
    exact: true,
    slideChildren: [
      {
        path: '/product/:productId',
        component: Product,
        exact: true,
        slideChildren: [
          {
            path: '/subproduct/:subproductId',
            component: Subproduct,
            exact: true
          }
        ]
      }
    ]
  },
  {
    path: '/profile',
    component: Profile,
    zoomChildren: [
      {
        path: '/change-password',
        component: ChangePassword,
        exact: true
      }
    ],
    exact: true
  },
  {
    path: '/about',
    component: About,
    exact: true
  }
];
