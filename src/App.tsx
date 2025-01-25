import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/layout/Layout';
import Fallback from './components/fallback/Fallback';

import { Login } from './page/auth/login';
import { Register } from './page/auth/register';
import { LandingPage } from './page/landing-page/landing-page';
import { Dashboard } from './page/dashboard-page/Dashboard';
import { Product } from './page/productpage/component-product/product';
import { Order } from './page/orderpage/component-order/order';
import { Setting } from './page/settingpage/Setting';
import { OrderDetail } from './page/orderpage/component-order/order-detail';
import { AddProductContent } from './page/productpage/component-product/add-product-content';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      Component: Layout,
      HydrateFallback: Fallback,
      children: [
        {
          path: '/',
          Component: Dashboard,
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
        },
        {
          path: '/product',
          Component: Product,
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
