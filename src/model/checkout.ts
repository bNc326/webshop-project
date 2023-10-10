namespace CheckoutModel {
  export interface IUser {
    firstName: string;
    lastName: string;
    country: string;
    city: string;
    zipCode: string;
    address: string;
    email: string;
    callingCode: string;
    phone: string;
    shipping: ShippingInformation[];
  }

  export interface IShippingInformation {
    firstName: string;
    lastName: string;
    country: string;
    city: string;
    zipCode: string;
    address: string;
    email: string;
    callingCode: string;
    phone: string;
  }

  export class User implements IUser {
    firstName: string;
    lastName: string;
    country: string;
    city: string;
    zipCode: string;
    address: string;
    email: string;
    callingCode: string;
    phone: string;
    shipping: ShippingInformation[];

    constructor(user: IUser) {
      const {
        firstName,
        lastName,
        country,
        city,
        zipCode,
        address,
        email,
        callingCode,
        phone,
        shipping,
      } = user;
      this.firstName = firstName;
      this.lastName = lastName;
      this.country = country;
      this.city = city;
      this.zipCode = zipCode;
      this.address = address;
      this.email = email;
      this.callingCode = callingCode;
      this.phone = phone;
      this.shipping = shipping;
    }
  }

  export class ShippingInformation implements IShippingInformation {
    firstName: string;
    lastName: string;
    country: string;
    city: string;
    zipCode: string;
    address: string;
    email: string;
    callingCode: string;
    phone: string;

    constructor(user: IShippingInformation) {
      const {
        firstName,
        lastName,
        country,
        city,
        zipCode,
        address,
        email,
        callingCode,
        phone,
      } = user;
      this.firstName = firstName;
      this.lastName = lastName;
      this.country = country;
      this.city = city;
      this.zipCode = zipCode;
      this.address = address;
      this.email = email;
      this.callingCode = callingCode;
      this.phone = phone;
    }
  }
}

export default CheckoutModel;
