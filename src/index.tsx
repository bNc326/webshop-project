import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ShoppingCartContextProvider from "./context/ShoppingCart";
import ShopContextProvider from "./context/Shop";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { enUS } from "@mui/material/locale";
import { LoadScript } from "@react-google-maps/api";
import { CircularProgress } from "@mui/material";
import CheckoutContextProvider from "./context/Checkout";
import { grey } from "@mui/material/colors";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const MUI = createTheme({ palette: {primary: {main: grey[900]}} }, enUS);

root.render(
  <React.StrictMode>
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_API as string}
      libraries={["places"]}
      loadingElement={<CircularProgress color="inherit" size={20} />}
    >
      <ShopContextProvider>
        <ShoppingCartContextProvider>
          <CheckoutContextProvider>
            <ThemeProvider theme={MUI}>
              <App />
            </ThemeProvider>
          </CheckoutContextProvider>
        </ShoppingCartContextProvider>
      </ShopContextProvider>
    </LoadScript>
  </React.StrictMode>
);
