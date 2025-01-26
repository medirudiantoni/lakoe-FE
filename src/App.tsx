import { createBrowserRouter, RouterProvider } from 'react-router';
import Fallback from './components/fallback/Fallback';

import { Login } from './page/auth/login';
import { Register } from './page/auth/register';
import { LandingPage } from './page/landing-page/landing-page';
import { Order } from './page/orderpage/component-order/order';
import { OrderDetail } from './page/orderpage/component-order/order-detail';
import { Setting } from './page/settingpage/Setting';

import { useAuthStore } from './features/auth/auth-store/auth-store';
import PrivateRoute from './layouts/private-layout';
import { Dashboard } from './page/dashboard-page/dashboard';
import { AddProductContent } from './page/productpage/add-product-content';
import { Product } from './page/productpage/component-product/product';
import { Detailproduct } from './page/productpage/detail-product';


function App() {
  const user = useAuthStore((state) => state.user);
  const router = createBrowserRouter([
    {
      path: '/',
      Component: LandingPage,
      HydrateFallback: Fallback,
    },
      {
        path: '/login',
        Component: Login,
        HydrateFallback: Fallback,
      },
      {
        path: '/register',
        Component: Register,
        HydrateFallback: Fallback,
      },{
        path: '/',
        element: <PrivateRoute user={user} />,
        children: [
        {
          path: '/dashboard',
          Component: Dashboard,
          HydrateFallback: Fallback,
        },
        {
          path: '/product',
          Component: Product,
          HydrateFallback: Fallback,
        },
        {
          path: '/product-detail/:id',
          Component: Detailproduct,
          HydrateFallback: Fallback,
        },
        {
          path: '/order-list',
          Component: Order,
          HydrateFallback: Fallback,
          children: [],
        },
        {
          path: '/order-detail/:id',
          Component: OrderDetail,
          HydrateFallback: Fallback,
        },
        {
          path: '/setting',
          Component: Setting,
          HydrateFallback: Fallback,
        },
        {
          path: '/add-product',
          Component: AddProductContent,
          HydrateFallback: Fallback,
        },
        {
          path: '/landing-page',
          Component: LandingPage,
          HydrateFallback: Fallback,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
