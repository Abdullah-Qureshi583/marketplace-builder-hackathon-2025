// "use client";
import React, { useState } from "react";
import { SignIn, useUser } from "@clerk/nextjs";
import { useShoppingCart } from "use-shopping-cart";
import { CartItemProps } from "@/types/types";
import Login from "./Login";
import { useRouter } from "next/navigation";

const AddToCartFunction = ({
  children,
  cartItem,
}: {
  children: React.ReactNode;
  cartItem: CartItemProps;
}) => {
  // const router = useRouter();
  // const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const { addItem, handleCartClick } = useShoppingCart();
  // const { isSignedIn } = useUser();

  const handleAddToCart = () => {
    // if (isSignedIn) {
      addItem(cartItem); 
      handleCartClick(); 
    // } else {
    //   router.push("/sign-in");
    // }
  };

  // const closeSignInModal = () => {
  //   setIsSignInModalOpen(false);
  // };

  return (
    <>
      <div
        className="w-fit"
        onClick={handleAddToCart} // Handle Add to Cart logic
      >
        {children}
      </div>

      {/* {isSignInModalOpen && (
        <Login />
      )} */}
    </>
  );
};

export default AddToCartFunction;
