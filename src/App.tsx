import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/layout/Layout';
import Fallback from './components/fallback/Fallback';
import Dashboard from './page/dashboard-page/dashboard';
import Order from './page/orderpage/order';
import OrderDetail from './page/orderpage/order-detail';
import Setting from './page/settingpage/Setting';
import { AddProduct } from './page/productpage/add-product';
import Product from './page/productpage/product';
import { Login } from './page/auth/login';
import { Register } from './page/auth/register';

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
          Component: AddProduct,
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
