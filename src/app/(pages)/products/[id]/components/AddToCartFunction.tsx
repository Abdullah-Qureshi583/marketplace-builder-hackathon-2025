"use client";
import PinkButton from "@/components/project/PinkButton";
import { CartItemProps } from "@/types/types";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { useShoppingCart } from "use-shopping-cart";

const AddToCartFunction = ({
  children,
  cartItem,
}: {
  children: React.ReactNode;
  cartItem: CartItemProps;
}) => {
  const { addItem, handleCartClick } = useShoppingCart();
  return (
    <div
      className="w-fit"
      onClick={() => {
        addItem(cartItem), handleCartClick();
      }}
    >
      {children}
    </div>
  );
};

export default AddToCartFunction;
