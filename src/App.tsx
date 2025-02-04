import { createBrowserRouter, RouterProvider } from 'react-router';
import Fallback from './components/fallback/Fallback';

import { Login } from './page/auth/login';
import { Register } from './page/auth/register';
import { LandingPage } from './page/landing-page/landing-page';
import { Order } from './page/orderpage/component-order/order';
import { OrderDetail } from './page/orderpage/component-order/order-detail';
import { Setting } from './page/settingpage/Setting';

import PrivateRoute from './layouts/private-layout';
import { Dashboard } from './page/dashboard-page/dashboard';
import { AddProductContent } from './page/productpage/add-product-content';
import { Product } from './page/productpage/component-product/product';
import { Detailproduct } from './page/productpage/detail-product';
import { Toaster } from 'react-hot-toast';
import AboutPage from './page/landing-page/about-page';
import PricingPage from './page/pricing/Pricing';
import { RegisterStore } from './page/auth/register-store';
import PaymentPage from './page/payment-page/PaymentPage';
import { LoadingScreen } from './components/loading-screen/loading-screen';
import SellerPage from './page/seller/pages/seller-layout';
import SellerHomepage from './page/seller/pages/home-page';
import SellerDetailProduct from './page/seller/pages/detail-product';
import SellerCartPage from './page/seller/pages/cart-page';
import SellerCheckoutPage from './page/seller/pages/checkout-page';
import SellerBillingPage from './page/seller/pages/billing-page';
import BuyerLayout from './page/seller/pages/user/buyer-layout';
import NotFound from './page/404/not-found';
import CobaTanstack from './page/seller/pages/coba-tanstack';
import CobaCache from './page/seller/pages/coba-cache';

function App() {
  // const user = useAuthStore((state: any) => state.user);
  
  const router = createBrowserRouter([
    {
      path: '/tanstack',
      Component: CobaTanstack,
      HydrateFallback: Fallback
    },
    {
      path: '/cache',
      Component: CobaCache,
      HydrateFallback: Fallback
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
          path: 'detail-product/:productId',
          Component: SellerDetailProduct,
          HydrateFallback: Fallback,
        },
        {
          path: 'cart',
          Component: SellerCartPage,
          HydrateFallback: Fallback,
        },
        {
          path: 'checkout',
          Component: SellerCheckoutPage,
          HydrateFallback: Fallback,
        },
        {
          path: 'payment',
          Component: SellerBillingPage,
          HydrateFallback: Fallback,
        },
        {
          path: 'buyer',
          Component: BuyerLayout,
          HydrateFallback: Fallback,
        }
      ]
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
   
      ],
    },
    {
      path: '/not-found',
      Component: NotFound,
      HydrateFallback: Fallback
    },
    {
      path: '/*',
      Component: NotFound,
      HydrateFallback: Fallback
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
