import DataModel from "./datamodel";

namespace InputModel {
  export interface IInputValidate {
    pattern?: RegExp;
    value: string;
    valid: boolean;
    firstTouch: boolean;
    error: string;
    required: boolean;
    callingCode?: null | string;
    country?: DataModel.ICountry | null
  }
  export interface IInputObject {
    [key: string]: IInputValidate;
  }
}

export default InputModel;
