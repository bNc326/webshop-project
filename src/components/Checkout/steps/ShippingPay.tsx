import { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ShopContext } from "../../../context/Shop";
import ShippingMethod from "../ShippingMethod";
import PaymentMethod from "../PaymentMethod";
const ShippingPay = () => {
  const shopCtx = useContext(ShopContext);
  return (
    <div className="space-y-8">
      <TableContainer component={Paper}>
        <h3 className="text-3xl font-semibold opacity-70 py-4 w-full text-center">
          Shipping Methods
        </h3>
        <Table
          className={`${
            shopCtx.renderShop.selectedShippingMethod === null
              ? "bg-red-300"
              : ""
          }`}
        >
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <span className="font-semibold">Company</span>
              </TableCell>
              <TableCell>
                <span className="font-semibold">title</span>
              </TableCell>
              <TableCell>
                <span className="font-semibold">shipping day/s</span>
              </TableCell>
              <TableCell>
                <span className="font-semibold">price</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shopCtx.renderShop.shippingMethods.map((shipping, index) => (
              <ShippingMethod key={index} {...shipping} index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper}>
        <h3 className="text-3xl font-semibold opacity-70 py-4 w-full text-center">
          Payment Methods
        </h3>
        <Table
          className={`${
            shopCtx.renderShop.selectedPaymentMethod === null
              ? "bg-red-300"
              : ""
          }`}
        >
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <span className="font-semibold">Provider</span>
              </TableCell>
              <TableCell>
                <span className="font-semibold">Title</span>
              </TableCell>
              <TableCell>
                <span className="font-semibold">Price</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shopCtx.renderShop.paymentMethods.map((payment, index) => (
              <PaymentMethod key={index} {...payment} index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ShippingPay;
