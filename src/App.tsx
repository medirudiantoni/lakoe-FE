import { createBrowserRouter, RouterProvider } from 'react-router';
import Product from './components/page/productpage/Product';
import Fallback from './components/fallback/Fallback';
import Dashboard from './components/page/dashboardpage/Dashboard';
import Layout from './components/layout/Layout';
import Order from './components/page/orderpage/Order';
import Setting from './components/page/settingpage/Setting';
import { AddProduct } from './components/page/productpage/add-product';
import OrderDetail from './components/page/orderpage/order-detail';

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
