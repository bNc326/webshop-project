import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableFooter,
  Table,
} from "@mui/material";
import React from "react";

interface Props {
  title: string;
  fields: string[];
  children: JSX.Element;
  maxHeight?: number;
}

const CheckDataTable: React.FC<Props> = ({
  title,
  children,
  fields,
  maxHeight,
}) => {
  return (
    <div>
      <h4 className="text-xl font-semibold opacity-70 py-4 w-full text-center">
        {title}
      </h4>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: maxHeight || "unset" }}
      >
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {fields.map((field, index) => (
                <TableCell key={index} className="w-max">
                  <span className="font-semibold text-base">{field}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {children}
        </Table>
      </TableContainer>
    </div>
  );
};

export default CheckDataTable;
