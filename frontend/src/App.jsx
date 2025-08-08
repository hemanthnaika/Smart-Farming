// App.jsx
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import SellProduct from "./pages/SellProduct";
import DiseaseDetection from "./pages/DiseaseDetection";
import MarketPrices from "./pages/MarketPrices";
import About from "./pages/About";
import FertilizerPredict from "./pages/FertilizerPredict";
import UserProfile from "./pages/UserProfile";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import ContactForm from "./pages/Contact";

gsap.registerPlugin(ScrollTrigger, SplitText);

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
          path: "/products/:id",
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
          element: <FertilizerPredict />,
        },
        {
          path: "/market-prices",
          element: <MarketPrices />,
        },
        {
          path: "/user-dashboard",
          element: <UserProfile />,
        },
        {
          path: "/update-product/:id",
          element: <SellProduct />,
        },
        {
          path: "/category/:categoryName",
          element: <Products />,
        },
        {
          path: "/about-us",
          element: <About />,
        },
        {
          path: "/contact",
          element: <ContactForm />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
