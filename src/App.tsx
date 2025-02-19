import { createBrowserRouter, RouterProvider } from 'react-router';
import Fallback from './components/fallback/Fallback';

import { Login } from './page/auth/login';
import { Register } from './page/auth/register';
import { LandingPage } from './page/landing-page/landing-page';
import { Order } from './page/orderpage/component-order/order';
import { OrderDetail } from './page/orderpage/component-order/order-detail';
import { Setting } from './page/settingpage/Setting';

import 'leaflet/dist/leaflet.css';
import { Toaster } from 'react-hot-toast';
import { LoadingScreen } from './components/loading-screen/loading-screen';
import PrivateRoute from './layouts/private-layout';
import NotFound from './page/404/not-found';
import { RegisterStore } from './page/auth/register-store';
import { Dashboard } from './page/dashboard-page/dashboard';
import AboutPage from './page/landing-page/about-page';
import PaymentPage from './page/payment-page/PaymentPage';
import PricingPage from './page/pricing/Pricing';
import { Detailproduct } from './page/productpage/detail-product';
import { Product } from './page/productpage/product';
import { Profile } from './page/profile-page/profile';
import SellerBillingPage from './page/seller/pages/billing-page';
import SellerCartPage from './page/seller/pages/cart-page';
import SellerCheckoutPage from './page/seller/pages/checkout-page';
import CobaCache from './page/seller/pages/coba-cache';
import CobaTanstack from './page/seller/pages/coba-tanstack';
import SellerHomepage from './page/seller/pages/home-page';
import SellerPage from './page/seller/pages/seller-layout';
import BuyerLayout from './page/seller/pages/user/buyer-layout';
import SearchArea from './page/settingpage/data-territory/test';

import { LoadingScreenBuyer } from './components/loading-screen/loading-screen-buyer';
import PrivateRouteBuyer from './layouts/private-layout-buyer';
import AddProductForm from './page/productpage/add-product';
import { LoginBuyer } from './page/seller/pages/login-page';
import SellerProductDetail from './page/seller/pages/product-detail';
import { RegisterBuyer } from './page/seller/pages/register-page';
import PaymentCheckingPage from './page/seller/pages/payment-checking';
import { LoadingScreenBuyerGoogle } from './components/loading-screen/loading-screen-buyer-google';
import { Admin } from './page/admin/pages/admin-page';
import { AdminLogin } from './page/admin/pages/login-admin-page';
import PrivateRouteAdmin from './layouts/private-layout-admin';

function App() {
  // const user = useAuthStore((state: any) => state.user);

  const router = createBrowserRouter([
    {
      path: '/login-admin',
      Component: AdminLogin,
      HydrateFallback: Fallback
    },
    {
      path: '',
      element: <PrivateRouteAdmin/>,
      children: [
        {
          path: '/admin',
          Component: Admin,
          HydrateFallback: Fallback
        },
      ]
    },
    {
      path: '/tanstack',
      Component: CobaTanstack,
      HydrateFallback: Fallback,
    },
    {
      path: '/cache',
      Component: CobaCache,
      HydrateFallback: Fallback,
    },
    {
      path: '/',
      Component: LandingPage,
      HydrateFallback: Fallback,
    },
    {
      path: '/tentang',
      Component: AboutPage,
      HydrateFallback: Fallback,
    },
    {
      path: '/pricing',
      Component: PricingPage,
      HydrateFallback: Fallback,
    },
    {
      path: '/payment',
      Component: PaymentPage,
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
      path: '/register-store',
      Component: RegisterStore,
      HydrateFallback: Fallback,
    },
    {
      path: '/register-store',
      Component: RegisterStore,
      HydrateFallback: Fallback,
    },
    {
      path: '/loading-screen',
      Component: LoadingScreen,
      HydrateFallback: Fallback,
    },
    {
      path: '/loading-screen-buyer',
      Component: LoadingScreenBuyerGoogle,
      HydrateFallback: Fallback,
    },
    {
      path: '/:storeName',
      Component: SellerPage,
      HydrateFallback: Fallback,
      children: [
        {
          path: '',
          Component: SellerHomepage,
          HydrateFallback: Fallback,
        },
        {
          path: 'search',
          Component: SellerHomepage,
          HydrateFallback: Fallback,
        },
        {
          path: 'product-detail/:productUrl',
          Component: SellerProductDetail,
          HydrateFallback: Fallback,
        },
        {
          path: 'cart',
          Component: SellerCartPage,
          HydrateFallback: Fallback,
        },
        {
          path: 'payment-checking',
          Component: PaymentCheckingPage,
          HydrateFallback: Fallback,
        },
        {
          path: '',
          element: <PrivateRouteBuyer />,
          children: [
            {
              path: 'checkout',
              Component: SellerCheckoutPage,
              HydrateFallback: Fallback,
            },
            {
              path: 'payment/:orderId',
              Component: SellerBillingPage,
              HydrateFallback: Fallback,
            },
            {
              path: 'buyer',
              Component: BuyerLayout,
              HydrateFallback: Fallback,
            },
            {
              path: 'buyer/order',
              Component: BuyerLayout,
              HydrateFallback: Fallback,
            },
          ],
        },

        // **Rute Public (Tetap Bisa Diakses Tanpa Login)**
        {
          path: 'login-buyer',
          Component: LoginBuyer,
          HydrateFallback: Fallback,
        },
        {
          path: 'register-buyer',
          Component: RegisterBuyer,
          HydrateFallback: Fallback,
        },
      ],
    },
    {
      path: '/',
      element: <PrivateRoute />,
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
          path: '/test',
          Component: SearchArea,
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
          Component: AddProductForm,
          HydrateFallback: Fallback,
        },
        {
          path: '/edit-product/:productId',
          Component: AddProductForm,
          HydrateFallback: Fallback,
        },

        {
          path: '/profile',
          Component: Profile,
          HydrateFallback: Fallback,
        },
      ],
    },
    {
      path: '/not-found',
      Component: NotFound,
      HydrateFallback: Fallback,
    },
    {
      path: '/*',
      Component: NotFound,
      HydrateFallback: Fallback,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
