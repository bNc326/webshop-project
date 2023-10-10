import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import {
  Autocomplete,
  CircularProgress,
  Box,
  InputAdornment,
} from "@mui/material";
import { Autocomplete as GoogleAutocomplete } from "@react-google-maps/api";
import { MdEmail, MdPhone } from "react-icons/md";
import DataModel from "../../model/datamodel";
import InputModel from "../../model/input";

interface Props {
  isFirstForm?: boolean;
  input: {
    get: InputModel.IInputObject;
    set: React.Dispatch<React.SetStateAction<InputModel.IInputObject>>;
  };
}

const CheckoutForm: React.FC<Props> = ({ input, isFirstForm }) => {
  const [countries, setCountries] = useState<DataModel.ICountry[]>([]);
  const [openCountryInput, setOpenCountryInput] = useState<null | boolean>(
    null
  );
  const [isLoading, setLoading] = useState<null | boolean>(null);
  const googleAutocompleteRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const url = "https://restcountries.com/v3.1/all";
        const res = await fetch(url);

        const data: any[] = await res.json();
        const updateCountries: DataModel.ICountry[] = [];
        data.map((item) => {
          const updateCountry: DataModel.ICountry = {
            id: item.cca2,
            name: item.name.common,
            callingCode: `${item.idd.root}${
              item.idd.suffixes ? item.idd.suffixes[0] : ""
            }`,
            flag: item.flags.png,
          };
          updateCountries.push(updateCountry);
          setLoading(false);
        });
        setCountries(updateCountries);
      } catch (error) {
        setLoading(false);
        console.log("error", error);
      }
    };
    if (openCountryInput) {
      setLoading(true);
    } else {
      setCountries([]);
      setLoading(false);
    }

    const cleanup = setTimeout(() => {
      if (openCountryInput) {
        fetchCountry();
      }
    }, 500);

    return () => clearTimeout(cleanup);
  }, [openCountryInput]);

  const testInput = (name: string, value: string) => {
    if (input.get[name].pattern !== null) {
      const testValid = input.get[name].pattern?.test(value);
      testValid
        ? input.set((prev) => {
            return { ...prev, [name]: { ...prev[name], valid: true } };
          })
        : input.set((prev) => {
            return { ...prev, [name]: { ...prev[name], valid: false } };
          });
    }
  };

  const handleChange = (e: React.ChangeEvent) => {
    if (
      !(
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
    )
      return;

    const value = e.target.value;
    const name = e.target.name;

    if (!input.get[name].firstTouch) {
      input.set((prev) => ({
        ...prev,
        [name]: { ...prev[name], firstTouch: true },
      }));
    }

    input.set((prev) => ({
      ...prev,
      [name]: { ...prev[name], value: value },
    }));

    testInput(name, value);
  };

  const handleBlur = (e: React.ChangeEvent) => {
    if (
      !(
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
    )
      return;
    const value = e.target.value.trimEnd();
    const name = e.target.name;
    if (!input.get[name].firstTouch) {
      input.set((prev) => ({
        ...prev,
        [name]: { ...prev[name], firstTouch: true },
      }));
    }

    testInput(name, value);
  };

  const handleChangeAutocomplete = (
    value: DataModel.ICountry | null,
    name: string
  ) => {
    if (!input.get[name].firstTouch) {
      input.set((prev) => ({
        ...prev,
        [name]: { ...prev[name], firstTouch: true },
      }));
    }

    if (value) {
      input.set((prev) => {
        const update = { ...prev };
        update[name].value = `${value.name} (${value.id})`;
        update[name].country = value;
        update.phone.callingCode = value.callingCode;
        return update;
      });

      testInput(name, `${value.name} (${value.id})`);
    } else {
      input.set((prev) => {
        const update = { ...prev };
        update[name].value = "";
        update[name].country = null;
        update.phone.callingCode = null;
        return update;
      });

      testInput(name, "");
    }
  };

  const handleGoogleAutocomplete = () => {
    const value = googleAutocompleteRef.current?.value as string;
    console.log("fn value", value);

    if (!input.get.city.firstTouch) {
      input.set((prev) => ({
        ...prev,
        city: { ...prev.city, firstTouch: true },
      }));
    }

    input.set((prev) => ({
      ...prev,
      city: { ...prev.city, value: value },
    }));

    testInput("city", value);
  };

  console.log(input.get.city);

  return (
    <div className="space-y-4">
      <div className="w-full flex flex-col laptop:flex-row gap-4">
        <TextField
          variant="outlined"
          label="First Name"
          fullWidth
          size={"small"}
          placeholder="John"
          name="firstName"
          required={input.get.firstName.required}
          value={input.get.firstName.value}
          helperText={
            input.get.firstName.firstTouch
              ? input.get.firstName.valid
                ? ""
                : input.get.firstName.error
              : ""
          }
          error={input.get.firstName.firstTouch && !input.get.firstName.valid}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          variant="outlined"
          label="Last Name"
          fullWidth
          size={"small"}
          placeholder="Doe"
          name="lastName"
          required={input.get.lastName.required}
          value={input.get.lastName.value}
          helperText={
            input.get.lastName.firstTouch
              ? input.get.lastName.valid
                ? ""
                : input.get.lastName.error
              : ""
          }
          error={input.get.lastName.firstTouch && !input.get.lastName.valid}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="w-full flex flex-col laptop:flex-row gap-4">
        <Autocomplete
          options={countries}
          open={openCountryInput as boolean}
          onOpen={() => setOpenCountryInput(true)}
          onClose={() => setOpenCountryInput(false)}
          getOptionLabel={(option) => `${option.name} (${option.id})`}
          disablePortal
          fullWidth
          loading={isLoading as boolean}
          value={input.get.country.country || null}
          onChange={(
            e: React.SyntheticEvent<Element, Event>,
            value: DataModel.ICountry | null
          ) => handleChangeAutocomplete(value, "country")}
          size="small"
          renderOption={(props, option) => (
            <Box
              component={"li"}
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                srcSet={option.flag}
                src={option.flag}
                alt=""
              />
              <span>
                {`${option.name} (${option.id}) ${option.callingCode}`}
              </span>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Country"
              name="country"
              required={input.get.country.required}
              value={input.get.country.value}
              helperText={
                input.get.country.firstTouch
                  ? input.get.country.valid
                    ? ""
                    : input.get.country.error
                  : ""
              }
              error={input.get.country.firstTouch && !input.get.country.valid}
              onBlur={handleBlur}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
        <GoogleAutocomplete
          className="w-full"
          onPlaceChanged={handleGoogleAutocomplete}
        >
          <TextField
            variant="outlined"
            label="City"
            fullWidth
            size={"small"}
            placeholder="Budapest"
            name="city"
            required={input.get.city.required}
            inputProps={{ ref: googleAutocompleteRef }}
            helperText={
              input.get.city.firstTouch
                ? input.get.city.valid
                  ? ""
                  : input.get.city.error
                : ""
            }
            error={input.get.city.firstTouch && !input.get.city.valid}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </GoogleAutocomplete>
      </div>
      <div className="w-full flex flex-col laptop:flex-row gap-4">
        <TextField
          variant="outlined"
          label="Zip code"
          fullWidth
          size={"small"}
          placeholder="12314"
          name="zipCode"
          required={input.get.zipCode.required}
          value={input.get.zipCode.value}
          helperText={
            input.get.zipCode.firstTouch
              ? input.get.zipCode.valid
                ? ""
                : input.get.zipCode.error
              : ""
          }
          error={input.get.zipCode.firstTouch && !input.get.zipCode.valid}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          variant="outlined"
          label="Address"
          fullWidth
          size={"small"}
          placeholder="Example street 3/a"
          name="address"
          required={input.get.address.required}
          value={input.get.address.value}
          helperText={
            input.get.address.firstTouch
              ? input.get.address.valid
                ? ""
                : input.get.address.error
              : ""
          }
          error={input.get.address.firstTouch && !input.get.address.valid}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div className="w-full flex flex-col laptop:flex-row gap-4">
        <TextField
          variant="outlined"
          label="Email"
          fullWidth
          size={"small"}
          placeholder="example@example.com"
          name="email"
          required={input.get.email.required}
          value={input.get.email.value}
          helperText={
            input.get.email.firstTouch
              ? input.get.email.valid
                ? ""
                : input.get.email.error
              : ""
          }
          error={input.get.email.firstTouch && !input.get.email.valid}
          onChange={handleChange}
          onBlur={handleBlur}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdEmail size={20} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          variant="outlined"
          label="Phone"
          fullWidth
          size={"small"}
          placeholder="01512512"
          name="phone"
          required={input.get.phone.required}
          value={input.get.phone.value}
          helperText={
            input.get.phone.firstTouch
              ? input.get.phone.valid
                ? ""
                : input.get.phone.error
              : ""
          }
          error={input.get.phone.firstTouch && !input.get.phone.valid}
          onChange={handleChange}
          onBlur={handleBlur}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdPhone size={20} />
                <span className={`font-semibold ml-2 `}>
                  ({input.get.phone.callingCode})
                </span>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default CheckoutForm;
