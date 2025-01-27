"use client";
import React from "react";
import { useShoppingCart } from "use-shopping-cart";

const CartSubTotals = () => {
  const { totalPrice } = useShoppingCart();
  return (
    <div className="bg-dblLightPurple p-6 w-full">
      <div className="flex justify-between mb-6">
        <span className="">Subtotal:</span>
        <span className="">${totalPrice?.toFixed(2)}</span>
      </div>
      <div className="w-full h-[2px] bg-[#E8E6F1] mb-6"></div>
      {/* <div className="flex justify-between mb-2">
        <span className="">Total:</span>
        <span className="">$</span>
      </div>
      <div className="w-full h-[2px] bg-[#E8E6F1] mb-6"></div>
      <div className="flex items-start  gap-x-2">
        <input
          type="checkbox"
          name="taxes"
          className="accent-green-500 mt-1"
          id=""
        />
        <label className="text-green-500 text-sm mb-8" htmlFor="taxes">
          Shipping & taxes calculated at checkout.
        </label>
      </div>
      <button className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600">
        Proceed to Checkout
      </button> */}
    </div>
  );
};

export default CartSubTotals;
