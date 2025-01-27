import React from "react";
import CartSubTotals from "../../shoppingCart/components/CartSubTotals";
import LeftMoreItems from "./LeftMoreItems";

const CalcShipRight = () => {
  return (
    <div className="flex flex-col gap-10">
      <LeftMoreItems />
      <CartSubTotals />
    </div>
  );
};

export default CalcShipRight;
