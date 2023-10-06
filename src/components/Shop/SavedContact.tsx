import React from "react";
import CheckoutModel from "../../model/checkout";
import { MdLocationOn } from "react-icons/md";

interface Props {
  userShipping: CheckoutModel.ShippingInformation;
  handleChangeShipping: (shipping: CheckoutModel.ShippingInformation) => void;
}

const SavedContact: React.FC<Props> = ({ userShipping, handleChangeShipping }) => {
  return (
    <div className="w-full flex justify-between border-gray-300 border p-4 rounded-lg select-none hover:opacity-50 transition-all ease-in-out duration-300 cursor-pointer" onClick={() => handleChangeShipping(userShipping)}>
      <div>
        <p className="font-semibold text-2xl">
          {userShipping.firstName} {userShipping.lastName}
        </p>
        <p className="text-lg">
          {userShipping.zipCode} {userShipping.city}, {userShipping.country}
        </p>
        <p className="text-lg">{userShipping.address}</p>
        <p className="text-lg">{userShipping.email}</p>
        <p className="text-lg">
          <span className="font-medium">{userShipping.callingCode}</span>{""}
          {userShipping.phone}
        </p>
      </div>
      <div className="flex justify-center items-center opacity-30">
        <MdLocationOn size={60} />
      </div>
    </div>
  );
};

export default SavedContact;
