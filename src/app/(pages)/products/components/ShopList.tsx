"use client";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { HiMagnifyingGlassPlus } from "react-icons/hi2";
import { IconType } from "react-icons/lib";
import PinkButton from "../../../../components/project/PinkButton";
import AddToCartFunction from "@/components/project/AddToCartFunction";

export default function ShopList({ products }: { products: Product[] }) {
  const router = useRouter();

  return (
    <div className="space-y-5  w-full">
      {products.map((chair) => (
        <div
          key={chair.id}
          className="flex  bg-dblLightPurple flex-col md:flex-row w-[313px] md:w-full mx-auto items-center   gap-6"
        >
          {/* Image Section */}
          <div className="w-[310px] h-[310px] flex justify-center items-center p-2 bg-lightPurple ">
            <Image
              className="object-cover "
              src={urlFor(chair.image).url()}
              alt={chair.name}
              width={250}
              height={250}
            />
          </div>

          {/* Content Section */}
          <div className="flex flex-col p-4  flex-1 gap-3 ">
            <div className="flex gap-5  items-center">
              <div className=" text-lg font-bold text-darkTextBlue">
                {chair.name}
              </div>
              {/* colors */}
              <div className="flex gap-2  items-center">
                {["orange", "pink", "purple"].map((item) => (
                  <div
                    key={item}
                    className={`${
                      item == "orange"
                        ? "bg-[#DE9034]"
                        : item == "pink"
                          ? "bg-pPink"
                          : item == "purple"
                            ? "bg-[#8568FF]"
                            : ""
                    } rounded-full aspect-square size-4`}
                  ></div>
                ))}
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex items-center gap-x-3">
                <span className="text-sm text-darkTextBlue ">
                  {chair.price - chair.price * (chair.discountPercentage / 100)}
                </span>
                <span className=" text-[12px] line-through text-pPink">
                  {chair.discountPercentage > 0 && chair.price}
                </span>
              </div>

              <div className="flex items-center">
                {/* Rating Stars */}
                {[...Array(5)].map((_, starIndex) => (
                  <svg
                    key={starIndex}
                    className={`w-4 h-4 ${
                      starIndex < (chair.rating ? chair.rating : 0)
                        ? "text-yellow-300"
                        : "text-gray-300"
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
              </div>
            </div>

            <p className="text-subText">{chair.description}</p>

            <div className={`flex gap-5`}>
              <div
                className={` bg-transparent  cursor-pointer rounded-full p-2 
                      text-darkTextBlue hover:text-white  hover:bg-darkTextBlue 
                      
                  }  flex justify-center items-center   `}
              >
                <AddToCartFunction
                  cartItem={{
                    currency: "USD",
                    name: chair.name,
                    price: chair.price,
                    description: chair.description || "",
                    id: chair.id,
                    image: chair.image,
                  }}
                >
                  <FiShoppingCart className="  size-[19px] " />
                </AddToCartFunction>
              </div>
            </div>
            <div
              onClick={() => router.push(`/products/${chair.id}`)}
              className="w-fit"
            >
              <PinkButton>View Detail</PinkButton>
            </div>

            {/* Reviews Section */}
            {/* <div className="mt-2">
              {chair.reviews.map((review, reviewIndex) => (
                <div key={reviewIndex} className="text-sm text-gray-600">
                  <strong>{review.user}:</strong> {review.comment}{" "}
                  <span>({review.rating} stars)</span>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
}
