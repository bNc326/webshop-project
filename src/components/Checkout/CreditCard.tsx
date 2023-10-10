import React, { useContext, useEffect } from "react";
import { ShopContext } from "../../context/Shop";
import InputMask from "react-input-mask";
import InputModel from "../../model/input";

interface Props {
  input: InputModel.IInputObject;
  isBackSide: boolean;
}

const CreditCard: React.FC<Props> = ({ input, isBackSide }) => {
  const shopCtx = useContext(ShopContext);
  return (
    <div className="w-full flex justify-center py-4">
      <div
        className={`bg-gradient-to-tr from-gray-700 select-none to-gray-500 w-full flex flex-col  max-w-[400px] h-[200px] rounded-lg shadow-xl credit-card ${
          isBackSide ? "credit-card-back" : "credit-card-front justify-between"
        } `}
      >
        {isBackSide ? (
          <div className="w-full h-full credit-card-back-design flex flex-col">
            <div className="h-1/3 flex items-end ">
              <div className="w-full bg-black p-6" />
            </div>
            <div className="h-1/3 flex items-center px-2 ">
              <div className="flex gap-4 items-center">
                <div className="w-full bg-gray-400 p-2 rounded-lg">
                  <input
                    placeholder="John Doe"
                    value={input.cardholderName.value}
                    className="w-full bg-black/0 text-gray-700 focus:text-gray-700 active:text-gray-700 font-semibold pointer-events-none"
                    readOnly
                  />
                </div>
                <div className="w-1/5 bg-gray-300 p-2 rounded-lg">
                  <InputMask
                    mask={"999"}
                    placeholder="&#9913;&#9913;&#9913;"
                    maskChar="&#9913;"
                    value={input.cvc.value}
                    className="w-full bg-black/0 text-gray-600 focus:text-gray-600 active:text-gray-600 font-semibold pointer-events-none text-center"
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="h-1/3 flex items-end justify-end p-2 ">
              <img
                src={shopCtx.renderShop.selectedPaymentMethod?.logo}
                alt="Payment provider"
                className="max-w-[64px]"
              />
            </div>
          </div>
        ) : (
          <div className="w-full h-full credit-card-front-design flex flex-col justify-between">
            <div className="w-full h-1/3 flex items-start justify-end p-2">
              <img
                src={shopCtx.renderShop.selectedPaymentMethod?.logo}
                alt="Payment provider"
                className="max-w-[64px]"
              />
            </div>
            <div className="w-full h-1/3 flex items-center justify-center">
              <div className="w-full flex justify-center text-dynamicBtn">
                <InputMask
                  mask={"9999 9999 9999 9999"}
                  placeholder="&#9913;&#9913;&#9913;&#9913; &#9913;&#9913;&#9913;&#9913; &#9913;&#9913;&#9913;&#9913; &#9913;&#9913;&#9913;&#9913;"
                  maskChar="&#9913;"
                  className="w-full text-center text-gray-400 focus:text-gray-400 active:text-gray-400 bg-black/0 font-semibold pointer-events-none"
                  value={input.cardNumber.value}
                  readOnly
                />
              </div>
            </div>
            <div className="w-full h-1/3 flex justify-between items-center p-2">
              <div className="w-full space-y-1 leading-3">
                <h3 className="text-gray-300">Cardholder name</h3>
                <input
                  placeholder="John Doe"
                  value={input.cardholderName.value}
                  className="w-full bg-black/0 text-gray-400 focus:text-gray-400 active:text-gray-400 font-semibold pointer-events-none"
                  readOnly
                />
              </div>
              <div className="w-1/5 space-y-1 leading-3 flex flex-col items-end">
                <h3 className="whitespace-nowrap text-gray-300">Valid THRU</h3>
                <InputMask
                  mask={"99/99"}
                  maskChar="&#9913;"
                  placeholder="MM/YY"
                  value={input.expiryDate.value}
                  className="w-full bg-black/0 text-gray-400 focus:text-gray-400 active:text-gray-400 font-semibold pointer-events-none"
                  readOnly
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditCard;
