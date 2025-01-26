"use client";
import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useShoppingCart } from "use-shopping-cart";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PinkButton from "./PinkButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AddToCartSidebar = () => {
  const router = useRouter();
  const { cartCount, cartDetails, shouldDisplayCart, handleCartClick } =
    useShoppingCart();

  return (
    <div>
      <Sheet open={shouldDisplayCart} onOpenChange={handleCartClick}>
        <SheetContent className="w-[80vw] sm:max-w-lg text-darkTextBlue overflow-y-auto ">
          <SheetHeader>
            <SheetTitle className="text-darkTextBlue text-4xl">
              Shopping Cart
            </SheetTitle>
            <div className="flex flex-col gap-y-5 ">
              {cartCount === 0 ? (
                <h3 className="text-xl mt-5">You don&apos;t have any items</h3>
              ) : (
                <div className=" flex flex-col gap-2">
                  <Link
                    onClick={() => handleCartClick()}
                    className="w-full"
                    href="/shoppingCart"
                  >
                    <PinkButton wFull>View Cart</PinkButton>
                  </Link>
                  {Object.values(cartDetails || {}).map((cartItem) => (
                    <div
                      key={cartItem.id}
                      onClick={() => {
                        router.push(`/products/${cartItem.id}`);
                        handleCartClick();
                      }}
                      className="flex flex-col cursor-pointer items-center bg-dblLightPurple  rounded-md w-full"
                    >
                      <div className=" w-full flex justify-start items-center md:px-2">
                        <div className="h-20 md:h-24 w-20 md:w-24 bg-lightPurple rounded-md aspect-square flex justify-center items-center ">
                          <Image
                            src={
                              urlFor(cartItem.image as any).url() ||
                              "/placeholder.jpg"
                            }
                            width={96}
                            height={96}
                            alt={cartItem.name || "Product Image"}
                          />
                        </div>
                        <div className="flex flex-col gap-2 justify-center text-start ml-3 max-w-[70%]">
                          <h4 className="md:text-lg font-semibold line-clamp-2">
                            {cartItem.name}
                          </h4>
                          <p className="hidden md:block text-base text-nowrap overflow-hidden text-ellipsis">
                            {cartItem.description}
                          </p>
                        </div>
                        {/* <div className="text-xl font-bold flex justify-center items-center">
                          {cartItem.price}
                        </div> */}
                      </div>
                      {/* <div className="md:hidden flex flex-col gap-2 justify-center text-center">
                        <h4 className="text-xl font-bold">{cartItem.name}</h4>
                      </div> */}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddToCartSidebar;
