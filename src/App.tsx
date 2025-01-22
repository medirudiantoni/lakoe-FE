
import { createBrowserRouter, RouterProvider } from "react-router";
import Product from "./components/page/productpage/Product";
import Fallback from "./components/fallback/Fallback";
import Dashboard from "./components/page/dashboardpage/Dashboard";
import Layout from "./components/layout/Layout";
import Order from "./components/page/orderpage/Order";
import Setting from "./components/page/settingpage/Setting";

function App() {
  const router = createBrowserRouter (
    [
      {
        path: "/",
        Component: Layout,
        HydrateFallback: Fallback,
        children: [
          {
              path: "/",
              Component: Dashboard,
              HydrateFallback: Fallback,
          },
          {
              path: "/product",
              Component: Product,
              HydrateFallback: Fallback,
          },
          {
              path: "/order-list",
              Component: Order,
              HydrateFallback: Fallback,
          },
          {
              path: "/setting",
              Component: Setting,
              HydrateFallback: Fallback,
          },
      ],
      }
    ]
  )
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
