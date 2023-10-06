import { createContext, useState, useEffect, useContext } from "react";
import InputModel from "../model/input";
import { cloneDeep, mapValues } from "lodash";
import { Alert, Snackbar } from "@mui/material";
import { ShopContext } from "./Shop";

interface Context {
  inputValidate: InputModel.IInputObject;
  setInputValidate: React.Dispatch<
    React.SetStateAction<InputModel.IInputObject>
  >;
  shippingInputValidate: InputModel.IInputObject;
  setShippingInputValidate: React.Dispatch<
    React.SetStateAction<InputModel.IInputObject>
  >;
  activeStep: number;
  isDifferentShippingInformation: null | boolean;
  handleForwardStep: () => void;
  handleBackwardStep: () => void;
  handleDifferentShippingInformation: () => void;
  resetCheckout: () => void;
}

export const CheckoutContext = createContext<Context>({
  inputValidate: {},
  setInputValidate: () => {},
  shippingInputValidate: {},
  setShippingInputValidate: () => {},
  activeStep: 0,
  isDifferentShippingInformation: null,
  handleForwardStep: () => {},
  handleBackwardStep: () => {},
  handleDifferentShippingInformation: () => {},
  resetCheckout: () => {},
});

const CheckoutContextProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [inputValidate, setInputValidate] = useState<InputModel.IInputObject>({
    firstName: {
      pattern: /^(\S\D{1,})$/,
      valid: false,
      firstTouch: false,
      value: "",
      error: "Oops! Please enter your first name.",
      required: true,
    },
    lastName: {
      pattern: /^(\S\D{1,})$/,
      valid: false,
      firstTouch: false,
      value: "",
      error: "Oops! Please enter your last name.",
      required: true,
    },
    country: {
      pattern: /^([\s\S]{1,})/,
      valid: false,
      firstTouch: false,
      value: "",
      error: "Oops! Please enter your country.",
      required: true,
    },

    city: {
      pattern: /^(\S\D{1,})$/,
      valid: false,
      firstTouch: false,
      value: "",
      error: "Oops! Please enter your city.",
      required: true,
    },
    zipCode: {
      pattern: /^\d{4,}$/,
      valid: false,
      firstTouch: false,
      value: "",
      error: "Oops! Please enter your zip/postal code.",
      required: true,
    },
    address: {
      pattern: /^(\S\D{1,})+(\s\d{1,})+(\/)?([\s\S]{1,})?$/,
      valid: false,
      firstTouch: false,
      value: "",
      error: "Oops! Please enter your name.",
      required: true,
    },
    email: {
      pattern: /^\S+@\S+\.\S+$/,
      valid: false,
      firstTouch: false,
      value: "",
      error: "Oops! Please enter your valid email.",
      required: true,
    },
    phone: {
      pattern:
        /^((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/,
      valid: false,
      firstTouch: false,
      value: "",
      error: "Oops! Please enter your valid phone number.",
      required: true,
      callingCode: null,
    },
  });

  const [shippingInputValidate, setShippingInputValidate] =
    useState<InputModel.IInputObject>({
      firstName: {
        pattern: /^(\S\D{1,})$/,
        valid: false,
        firstTouch: false,
        value: "",
        error: "Oops! Please enter your first name.",
        required: true,
      },
      lastName: {
        pattern: /^(\S\D{1,})$/,
        valid: false,
        firstTouch: false,
        value: "",
        error: "Oops! Please enter your last name.",
        required: true,
      },
      country: {
        pattern: /^([\s\S]{1,})/,
        valid: false,
        firstTouch: false,
        value: "",
        error: "Oops! Please enter your country.",
        required: true,
      },

      city: {
        pattern: /^(\S\D{1,})$/,
        valid: false,
        firstTouch: false,
        value: "",
        error: "Oops! Please enter your city.",
        required: true,
      },
      zipCode: {
        pattern: /^\d{4,}$/,
        valid: false,
        firstTouch: false,
        value: "",
        error: "Oops! Please enter your zip/postal code.",
        required: true,
      },
      address: {
        pattern: /^(\S\D{1,})+(\s\d{1,})+(\/)?([\s\S]{1,})?$/,
        valid: false,
        firstTouch: false,
        value: "",
        error: "Oops! Please enter your name.",
        required: true,
      },
      email: {
        pattern: /^\S+@\S+\.\S+$/,
        valid: false,
        firstTouch: false,
        value: "",
        error: "Oops! Please enter your valid email.",
        required: true,
      },
      phone: {
        pattern:
          /^((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/,
        valid: false,
        firstTouch: false,
        value: "",
        error: "Oops! Please enter your valid phone number.",
        required: true,
        callingCode: null,
      },
    });

  const [activeStep, setActiveStep] = useState<number>(0);
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isDifferentShippingInformation, setDifferentShippingInformation] =
    useState<null | boolean>(null);
  const shopCtx = useContext(ShopContext);
  useEffect(() => {
    const cleanup = setTimeout(() => {
      window.scrollTo({ behavior: "smooth", top: 0 });
    });
    return () => clearTimeout(cleanup);
  }, [activeStep]);

  useEffect(() => {
    if (!isAlertOpen) return;
    const cleanup = setTimeout(handleCloseAlert, 8000);

    return () => clearTimeout(cleanup);
  }, [error, isAlertOpen]);

  const handleForwardStep = () => {
    const getValidKeys = (obj: InputModel.IInputObject): boolean => {
      const baseKeys = mapValues(obj, "valid");
      for (let baseKey in baseKeys) {
        if (obj[baseKey].required) {
          if (!baseKeys[baseKey] && baseKeys[baseKey] !== undefined) {
            return false;
          }
        }
      }
      return true;
    };

    const showError = (message: string) => {
      setError(message);
      setAlertOpen(true);
    };

    if (activeStep + 1 !== 5) {
      switch (activeStep) {
        case 0:
          if (!isDifferentShippingInformation) {
            setInputValidate((prev) => {
              const update = cloneDeep(prev);
              Object.keys(update).map((key) => (update[key].firstTouch = true));
              return update;
            });

            const valid = getValidKeys(inputValidate);
            console.log("valid", valid);
            if (!valid) {
              showError("Please enter your data to the red inputs!");
              return;
            }
          }

          if (isDifferentShippingInformation) {
            setInputValidate((prev) => {
              const update = cloneDeep(prev);
              Object.keys(update).map((key) => (update[key].firstTouch = true));
              return update;
            });

            setShippingInputValidate((prev) => {
              const update = cloneDeep(prev);
              Object.keys(update).map((key) => (update[key].firstTouch = true));
              return update;
            });

            const valid = getValidKeys(inputValidate);
            const shippingValid = getValidKeys(shippingInputValidate);

            if (!valid || !shippingValid) {
              showError("Please enter your data to the red inputs!");
              return;
            }
          }
          break;
        case 1:
          console.log(
            shopCtx.renderShop.selectedShippingMethod,
            shopCtx.renderShop.selectedPaymentMethod
          );
          const shippingMethod = shopCtx.renderShop.selectedShippingMethod;
          const paymentMethod = shopCtx.renderShop.selectedPaymentMethod;

          if (!shippingMethod && !paymentMethod) {
            showError("Please select a shipping method & payment method!");
            shopCtx.handleSetShippingNull();
            shopCtx.handleSetPaymentNull();
            return;
          }

          if (!shippingMethod) {
            showError("Please select a shipping method!");
            shopCtx.handleSetShippingNull();
            return;
          }

          if (!paymentMethod) {
            showError("Please select a payment method!");
            shopCtx.handleSetPaymentNull();
            return;
          }
          break;
        case 2:
          break;
        default:
      }
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBackwardStep = () => {
    if (activeStep - 1 !== -1) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleCloseAlert = () => {
    if (!isAlertOpen) return;
    setAlertOpen(false);
    setError("");
  };

  const handleDifferentShippingInformation = () => {
    setDifferentShippingInformation((prev) => !prev);
  };

  const resetCheckout = () => {
    setActiveStep(0);
    setDifferentShippingInformation(null);
  };

  const value: Context = {
    inputValidate,
    setInputValidate,
    shippingInputValidate,
    setShippingInputValidate,
    activeStep,
    isDifferentShippingInformation,
    handleForwardStep,
    handleBackwardStep,
    handleDifferentShippingInformation,
    resetCheckout,
  };
  return (
    <CheckoutContext.Provider value={value}>
      {children}
      <Snackbar
        open={isAlertOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleCloseAlert}
      >
        <Alert severity="error" onClose={handleCloseAlert}>
          {error}
        </Alert>
      </Snackbar>
    </CheckoutContext.Provider>
  );
};

export default CheckoutContextProvider;
