import React from "react";
import {
  TableContainer,
  Table,
  TableBody,
} from "@mui/material";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const PreviewCartTable: React.FC<Props> = ({ children }) => {
  return (
    <TableContainer sx={{ maxHeight: "300px" }}>
      <Table size="small" stickyHeader>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default PreviewCartTable;
