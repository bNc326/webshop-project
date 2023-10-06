import React, { useContext } from "react";
import { TextField, Card, Divider, CircularProgress, Fade } from "@mui/material";
import Button from "@mui/material/Button";
import {
  MdCreditCard,
  MdPerson,
  MdDateRange,
  MdPassword,
} from "react-icons/md";
import ReactInputMask from "react-input-mask";
import InputModel from "../../model/input";
import { ShoppingCartContext } from "../../context/ShoppingCart";

interface Props {
  input: InputModel.IInputObject;
  isLoading: boolean | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.ChangeEvent) => void;
  handleRotateCard: () => void;
  handlePay: () => void;
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  onBlur: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const CardNumberMask = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, onBlur, ...other } = props;
    return (
      <ReactInputMask
        {...other}
        mask="9999 9999 9999 9999"
        inputRef={ref}
        maskChar=""
        onChange={(e) => {
          onChange({
            target: {
              name: props.name,
              value: e.target.value,
            },
          });
        }}
        onBlur={(e) => {
          onBlur({
            target: {
              name: props.name,
              value: e.target.value,
            },
          });
        }}
      />
    );
  }
);

const ExpiryDateMask = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, onBlur, ...other } = props;
    return (
      <ReactInputMask
        {...other}
        mask="99/99"
        onChange={(e) => {
          onChange({
            target: {
              name: props.name,
              value: e.target.value,
            },
          });
        }}
        onBlur={(e) => {
          onBlur({
            target: {
              name: props.name,
              value: e.target.value,
            },
          });
        }}
        inputRef={ref}
        maskChar=""
      />
    );
  }
);

const CVCMask = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, onBlur, ...other } = props;
    return (
      <ReactInputMask
        {...other}
        mask="999"
        inputRef={ref}
        maskChar=""
        onChange={(e) => {
          onChange({
            target: {
              name: props.name,
              value: e.target.value,
            },
          });
        }}
        onBlur={(e) => {
          onBlur({
            target: {
              name: props.name,
              value: e.target.value,
            },
          });
        }}
      />
    );
  }
);

const CreditCardForm: React.FC<Props> = ({
  input,
  isLoading,
  handleChange,
  handleBlur,
  handleRotateCard,
  handlePay
}) => {
  const shoppingCartCtx = useContext(ShoppingCartContext);
  return (
    <Card variant="outlined" sx={{width: "100%", maxWidth: "800px"}}>
      <div className="w-full border flex flex-col gap-8 p-4">
        <div className="w-full">
          <TextField
            size="small"
            name="cardNumber"
            variant="outlined"
            label="Card number"
            placeholder="5262 1010 &#9913;&#9913;&#9913;&#9913; &#9913;&#9913;&#9913;&#9913;"
            className="text-gray-400 focus:text-gray-400 active:text-gray-400"
            value={input.cardNumber.value}
            required={input.cardNumber.required}
            helperText={
              input.cardNumber.firstTouch
                ? input.cardNumber.valid
                  ? ""
                  : input.cardNumber.error
                : ""
            }
            error={input.cardNumber.firstTouch && !input.cardNumber.valid}
            onChange={handleChange}
            onBlur={handleBlur}
            InputProps={{
              inputComponent: CardNumberMask as any,
              endAdornment: <MdCreditCard size={24} />,
            }}
            fullWidth
          />
        </div>
        <div className="w-full flex gap-4">
          <TextField
            size="small"
            name="cardholderName"
            variant="outlined"
            label="Cardholder name"
            placeholder="John Doe"
            value={input.cardholderName.value}
            required={input.cardholderName.required}
            helperText={
              input.cardholderName.firstTouch
                ? input.cardholderName.valid
                  ? ""
                  : input.cardholderName.error
                : ""
            }
            error={
              input.cardholderName.firstTouch && !input.cardholderName.valid
            }
            onChange={handleChange}
            onBlur={handleBlur}
            InputProps={{
              endAdornment: <MdPerson size={24} />,
            }}
            fullWidth
          />
          <TextField
            size="small"
            name="expiryDate"
            variant="outlined"
            label="Expiry date"
            placeholder="07/23"
            value={input.expiryDate.value}
            required={input.expiryDate.required}
            helperText={
              input.expiryDate.firstTouch
                ? input.expiryDate.valid
                  ? ""
                  : input.expiryDate.error
                : ""
            }
            error={input.expiryDate.firstTouch && !input.expiryDate.valid}
            onChange={handleChange}
            onBlur={handleBlur}
            InputProps={{
              inputComponent: ExpiryDateMask as any,
              endAdornment: <MdDateRange size={24} />,
            }}
            fullWidth
          />
        </div>
        <div className="w-full">
          <TextField
            type="text"
            name="cvc"
            size="small"
            variant="outlined"
            label="CVC/CCV"
            value={input.cvc.value}
            required={input.cvc.required}
            helperText={
              input.cvc.firstTouch
                ? input.cvc.valid
                  ? ""
                  : input.cvc.error
                : ""
            }
            error={input.cvc.firstTouch && !input.cvc.valid}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleRotateCard}
            InputProps={{
              inputComponent: CVCMask as any,
              endAdornment: <MdPassword size={24} />,
            }}
            fullWidth
          />
        </div>
        <div className="w-full flex justify-center">
          <Button
            onClick={handlePay}
            disabled={isLoading as boolean}
            variant="contained"
            sx={{ width: "50%" }}
            startIcon={<Fade in={isLoading as boolean}><CircularProgress size={20} /></Fade>}
          >
            <span className="text-base">Pay now</span>
            <Divider
              orientation="vertical"
              sx={{
                bgcolor: "#f0f0f0",
                marginX: ".4rem",
                width: "3px",
                borderRadius: "1rem",
              }}
            />{" "}
            <span className="font-semibold text-base">
              ${shoppingCartCtx.renderCart.totalPrice.toFixed(2)}
            </span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CreditCardForm;
