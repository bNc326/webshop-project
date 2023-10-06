import React from "react";
import InputModel from "../../model/input";
import { TableBody, TableRow, TableCell } from "@mui/material";
interface Props {
  input: InputModel.IInputObject;
}

const CheckDataTableBody: React.FC<Props> = ({ input }) => {
  return (
    <TableBody>
      <DataRow field="First Name" data={input.firstName.value} />
      <DataRow field="Last Name" data={input.lastName.value} />
      <DataRow field="Country" data={input.country.value} />
      <DataRow field="City" data={input.city.value} />
      <DataRow field="Zip code" data={input.zipCode.value} />
      <DataRow field="Address" data={input.address.value} />
      <DataRow field="Email" data={input.email.value} />
      <DataRow field="Phone" data={`(${input.phone.callingCode}) ${input.phone.value}`} />
    </TableBody>
  );
};

export default CheckDataTableBody;

const DataRow: React.FC<{ field: string; data: string }> = ({
  field,
  data,
}) => {
  return (
    <TableRow>
      <DataCell value={field} />
      <DataCell value={data} />
    </TableRow>
  );
};

const DataCell: React.FC<{ value: string }> = ({ value }) => {
  return <TableCell><span className="text-base">{value}</span></TableCell>;
};

