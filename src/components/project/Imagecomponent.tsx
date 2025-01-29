import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { HiMagnifyingGlassPlus } from "react-icons/hi2";

import { FaSearchPlus } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import AddToCartFunction from "@/components/project/AddToCartFunction";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";

interface ImageCompType {
  imageBg: string;
  image: any;
  buttonPosition?: string;
  buttonType?: string;
  buttonHref?: string;
  width?: number;
  height?: number;
  showHover?: boolean;
  hoverIcons?: boolean;
  name: string;
  price: number;
  description: string;
  id: string;
}

const Imagecomponent = ({
  imageBg,
  image,
  buttonPosition,
  buttonType,
  buttonHref = "",
  width,
  height,
  showHover,
  hoverIcons = true,
  name,
  price,
  description,
  id,
}: ImageCompType) => {
  const router = useRouter();
  return (
    <div
      className={`relative w-full ${
        imageBg == "lightPurple"
          ? "bg-dblLightPurple group-hover:bg-chairBgOffWhite"
          : imageBg == "offWhite"
            ? "bg-chairBgOffWhite group-hover:bg-white"
            : imageBg == "shopDefault"
              ? "bg-chairBgOffWhite group-hover:bg-[#EBF4F3]  "
              : ""
      }   flex items-center flex-grow justify-center  p-3 `}
    >
      <div className="w-[230px]  overflow-hidden h-[230px] flex justify-center items-center">
        <Image
          className=" object-cover"
          height={500}
          width={500}
          src={urlFor(image).url()}
          alt="Chair"
        />
      </div>

      {/*  hover effects */}
      {/* {showHover && ( */}
      <div className="absolute inset-0  flex flex-col  justify-end  items-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <div
          className={` ${
            buttonPosition == "rowTopLeft"
              ? "flex-row  self-start top-3"
              : buttonPosition == "colBottomleft"
                ? "flex-col self-start bottom-10"
                : ""
          }  absolute left-3  flex space-4`}
        >
          {/* {[FiShoppingCart, CiHeart, HiMagnifyingGlassPlus].map(
                (Icon, index) => ( */}
          <div
            // key={index}
            className={`group bg-transparent  cursor-pointer rounded-full p-2 ${
              imageBg == "shopDefault"
                ? "text-darkTextBlue hover:bg-white "
                : "hover:bg-lightPurple text-blue-500 hover:text-darkTextBlue"
            }  flex justify-center items-center   `}
          >
            <AddToCartFunction
              cartItem={{
                currency: "USD",
                name: name,
                price: price,
                description: description,
                id: id,
                image: image,
              }}
            >
              <FiShoppingCart className="  size-[19px] " />
            </AddToCartFunction>

            {/* <Icon className="  size-[19px] " /> */}
          </div>
          {/* )
              )} */}
        </div>
        {/* {buttonType == "viewDetail" && ( */}
        <Button
          onClick={() => router.push(`/products/${id}`)}
          className="bg-bgLightGreen  hover:bg-bgLightGreen hover:scale-105 duration-300 cursor-pointer hover:shadow-lg text-sm"
        >
          View Detail
        </Button>
        {/* )} */}
        {/* {buttonType == "viewShop" && (
            <Button
              className="bg-bgLightGreen  hover:bg-bgLightGreen hover:scale-105 duration-300 hover:shadow-lg text-sm"
              asChild
            >
              <Link href={buttonHref}>View Shop</Link>
            </Button>
          )} */}
        {buttonType == "sale" && (
          <Image
            className="absolute top-3 left-3"
            src="/images/imageComponent/sale.png"
            width={84}
            height={56}
            alt="Sale Tag"
          />
        )}{" "}
      </div>
      {/* )} */}
    </div>
  );
};

export default Imagecomponent;
