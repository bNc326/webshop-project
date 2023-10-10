import React, { useState, useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";
import CreditCard from "./CreditCard";
import CreditCardForm from "./CreditCardForm";
import InputModel from "../../model/input";
import { mapValues, cloneDeep } from "lodash";

const PaymentGateway: React.FC<{
  setPaymentSuccess: React.Dispatch<React.SetStateAction<boolean | null>>;
}> = ({ setPaymentSuccess }) => {
  const [inputValidate, setInputValidate] = useState<InputModel.IInputObject>({
    cardNumber: {
      pattern: /^([\d]{4})+\s([\d]{4})+\s([\d]{4})+\s([\d]{4})$/,
      valid: false,
      firstTouch: false,
      value: "",
      error: "Oops! Please enter a valid card number.",
      required: true,
    },
    cardholderName: {
      pattern: /^(\S\D{1,})$/,
      valid: false,
      firstTouch: false,
      value: "",
      error: "Oops! Please enter a valid cardholder name.",
      required: true,
    },
    expiryDate: {
      pattern: /^[\d]{2}\/[\d]{2}$/,
      valid: false,
      firstTouch: false,
      value: "",
      error: "Oops! Please enter a valid expiry date.",
      required: true,
    },
    cvc: {
      pattern: /^([\d]{3})$/,
      valid: false,
      firstTouch: false,
      value: "",
      error: "Oops! Please enter a valid CVC/CCV",
      required: true,
    },
  });
  const [isBackSide, setBackSide] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean | null>(null);
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isAlertOpen) return;
    const cleanup = setTimeout(handleCloseAlert, 8000);

    return () => clearTimeout(cleanup);
  }, [isAlertOpen]);

  const testInput = (name: string, value: string) => {
    if (inputValidate[name].pattern !== null) {
      const testValid = inputValidate[name].pattern?.test(value);
      testValid
        ? setInputValidate((prev) => {
            return { ...prev, [name]: { ...prev[name], valid: true } };
          })
        : setInputValidate((prev) => {
            return { ...prev, [name]: { ...prev[name], valid: false } };
          });
    }
  };

  const handleChange = (e: React.ChangeEvent) => {
    const target = e.target as any;
    const value = target.value;
    const name = target.name;

    console.log("change", value, name);

    if (!inputValidate[name].firstTouch) {
      setInputValidate((prev) => ({
        ...prev,
        [name]: { ...prev[name], firstTouch: true },
      }));
    }

    setInputValidate((prev) => ({
      ...prev,
      [name]: { ...prev[name], value: value },
    }));

    testInput(name, value);
  };

  const handleBlur = (e: React.ChangeEvent) => {
    const target = e.target as any;
    const value = target.value;
    const name = target.name;
    console.log("blur", value, name);
    if (!inputValidate[name].firstTouch) {
      setInputValidate((prev) => ({
        ...prev,
        [name]: { ...prev[name], firstTouch: true },
      }));
    }
    testInput(name, value);

    if (name === "cvc") {
      setBackSide(false);
    }
  };

  const handleRotateCard = () => {
    setBackSide(true);
  };

  const handlePay = () => {
    setLoading(true);
    setInputValidate((prev) => {
      const update = cloneDeep(prev);
      Object.keys(update).map((key) => (update[key].firstTouch = true));
      return update;
    });

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

    const valid = getValidKeys(inputValidate);

    if (valid) {
      console.log("success");
      setTimeout(() => {
        setLoading(false);
        setPaymentSuccess(true);
      }, 1500);
    } else {
      setAlertOpen(true);
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <Alert
        severity="info"
        variant="filled"
        sx={{ fontSize: "1.125rem", width: "100%" }}
      >
        This is a <span className="font-semibold">FAKE</span> payment gateway!
        <p>Your data will not be saved or stored!</p>
      </Alert>
      <CreditCard input={inputValidate} isBackSide={isBackSide} />
      <CreditCardForm
        input={inputValidate}
        isLoading={isLoading}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleRotateCard={handleRotateCard}
        handlePay={handlePay}
      />
      <Snackbar
        open={isAlertOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleCloseAlert}
      >
        <Alert severity="error" onClose={handleCloseAlert}>
          Please enter your data to the red inputs!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PaymentGateway;
