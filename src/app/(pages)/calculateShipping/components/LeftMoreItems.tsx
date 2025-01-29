"use client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useShoppingCart } from "use-shopping-cart";

export default function LeftMoreItems() {
  const router = useRouter();
  const { cartDetails } = useShoppingCart();
  

  return (
    <div className=" flex flex-col gap-4 w-full  ">
      {Object.values(cartDetails || {}).map((cartItem) => (
        <div
          key={cartItem.id}
          onClick={() => {
            router.push(`/products/${cartItem.id}`);
          }}
          className="flex flex-col  gap-y-4"
        >
          <div className="flex justify-between">
            <div className="h-20 md:h-24 w-20 md:w-24 overflow-hidden bg-lightPurple rounded-md aspect-square flex justify-center items-center ">
              <Image
                src={urlFor(cartItem.image as any).url() || "/placeholder.jpg"}
                width={96}
                height={96}
                alt={cartItem.name || "Product Image"}
              />
            </div>

            <div className="ml-3 max-w-[110px] md:max-w-[200px] flex flex-col justify-center">
              <h3 className="text-lg text-nowrap overflow-hidden text-ellipsis">
                {cartItem?.name}
              </h3>
              <p className="text-subText text-nowrap text-sm  text-ellipsis overflow-hidden">
                {cartItem?.description}
              </p>
            </div>
            {/* price */}
            <div className="py-1 text-base text-darkTextBlue font-semibold">
              ${cartItem?.price}
            </div>
          </div>
          <div className="w-full h-[1px] bg-subText"></div>
        </div>
      ))}
    </div>
  );
}
