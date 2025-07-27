// App.jsx
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import SellProduct from "./pages/SellProduct";
import DiseaseDetection from "./pages/DiseaseDetection";
import FertilizerRecommendation from "./pages/FertilizerRecommendation";
import MarketPrices from "./pages/MarketPrices";
import UserDashboard from "./pages/UserDashboard";
const App = () => {
  const router = createBrowserRouter([
    {
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/products/:productId",
          element: <Product />,
        },
        {
          path: "/sell-product",
          element: <SellProduct />,
        },
        {
          path: "/detect-disease",
          element: <DiseaseDetection />,
        },
        {
          path: "/fertilizer-guide",
          element: <FertilizerRecommendation />,
        },
        {
          path: "/market-prices",
          element: <MarketPrices />,
        },
        {
          path: "/user-dashboard",
          element: <UserDashboard />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
