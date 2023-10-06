import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Root from "./pages/Root";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CartRoot from "./pages/CartRoot";
const App = () => {
  const router = createBrowserRouter([{
    path: '/', element: <Root />, children: [
      {index: true, element: <Home />},
      {path: "cart", element: <CartRoot />, children: [
        {index: true, element: <Cart />},
        {path: "checkout", element: <Checkout />},
      ]},
    ]
  }])
  return <RouterProvider router={router} />
}

export default App;
