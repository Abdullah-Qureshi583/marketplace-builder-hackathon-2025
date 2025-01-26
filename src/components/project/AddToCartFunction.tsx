"use client";
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
  const router = useRouter();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const { addItem, handleCartClick } = useShoppingCart();
  const { isSignedIn } = useUser();

  const handleAddToCart = () => {
    if (isSignedIn) {
      addItem(cartItem); // Add item to cart
      handleCartClick(); // Open the cart UI
    } else {
      router.push("/sign-in");
      // setIsSignInModalOpen(true); // Open the SignIn modal
    }
  };

  const closeSignInModal = () => {
    setIsSignInModalOpen(false);
  };

  return (
    <>
      <div
        className="w-fit"
        onClick={handleAddToCart} // Handle Add to Cart logic
      >
        {children}
      </div>

      {isSignInModalOpen && (
        <Login />
        // <div
        //   className="fixed z-[100] inset- flex items-center justify-center bg-black bg-opacity-50"
        //   onClick={closeSignInModal} // Close modal when clicking outside
        // >
        //   <div
        //     className="bg-white rounded-lg shadow-lg p-4"
        //     onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        //   >
        //     <SignIn
        //       routing="hash"
        //       appearance={{
        //         layout: {
        //           socialButtonsPlacement: "bottom",
        //         },
        //       }}
        //     />
        //   </div>
        // </div>
      )}
    </>
  );
};

export default AddToCartFunction;
