"use client"
import React from "react";
import CalculateShippingCard from "./CalculateShippingCard";
import CartSubTotals from "./CartSubTotals";
import { useShoppingCart } from "use-shopping-cart";

const Right = () => {
  const { cartCount } = useShoppingCart();
  return (
    <>
      {(cartCount as number) > 0 ? (
        <div className="flex flex-col w-full md:w-[371px] gap-8">
          <div className=" ">
            <div className="flex flex-col items-center gap-10">
              <h6 className="text-xl font-medium ">Cart Totals</h6>
              <CartSubTotals />
            </div>
          </div>

          {/* Calculate Shipping */}
          <div className="">
            <div className="flex flex-col items-center w-full gap-5">
              <h3 className="text-xl font-medium ">Calculate Shipping</h3>
              <CalculateShippingCard />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Right;
