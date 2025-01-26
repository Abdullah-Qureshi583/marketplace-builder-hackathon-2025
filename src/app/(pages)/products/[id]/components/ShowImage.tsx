import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

import PinkButton from "@/components/project/PinkButton";
import { CiHeart } from "react-icons/ci";
import AddToCartFunction from "../../../../../components/project/AddToCartFunction";

export default function ShowImage({ product }: { product: Product }) {
  return (
    <div className="flex  flex-col md:flex-row items-center md:items-start gap-8 md:p-8">
      {/* Left Section: Images */}
      <div className="flex  md:gap-5">
        {/* <div className=" flex-col gap-2  flex">
          <Image
            width={151}
            height={155}
            src="/images/productD/first.png"
            alt="Thumbnail 1"
            className=" object-cover rounded-md text-start"
          />
          <Image
            width={151}
            height={155}
            src="/images/productD/second.png"
            alt="Thumbnail 2"
            className=" object-cover rounded-md"
          />
          <Image
            width={151}
            height={155}
            src="/images/productD/third.png"
            alt="Thumbnail 3"
            className=" object-cover rounded-md"
          />
        </div> */}
        <div className="flex justify-center items-center  w-[400px] h-[450px] ">
          {product && (
            <Image
              width={375}
              height={487}
              src={urlFor(product?.image).url()}
              alt={`${product.name} - image`}
              className="object-cover rounded-md"
            />
          )}
        </div>
      </div>

      {/* Right Section: Product Details */}
      <div className="flex flex-col gap-3 py-3">
        <h4 className="text-4xl font-semibold">{product?.name}</h4>

        <div className="flex items-center">
          {/* Rating Stars */}
          {[...Array(5)].map((_, starIndex) => (
            <svg
              key={starIndex}
              className={`w-4 h-4 ${
                starIndex < (product?.rating ? product?.rating : 0)
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
          <span className=" ml-3 text-sm flex text-darkTextBlue font-semibold">
            {" "}
            {product?.rating}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-base font-semibold text-darkTextBlue">
            $
            {product?.price -
              product?.price * (product?.discountPercentage / 100)}
          </span>
          <span className="text-base font-semibold text-pPink line-through">
            {product?.discountPercentage > 0 && product?.price}
          </span>
        </div>
        <p className=" text-subText text-wrap font-semibold">
          {product?.description}
        </p>

        {/* Add to Cart Button */}

        <AddToCartFunction
          cartItem={{
            name: product?.name as string,
            description: product?.description as string,
            image: product?.image,
            price: (product?.price -
              product?.price * (product?.discountPercentage / 100)) as number,
            currency: "USD",
            id: product?.id,
          }}
        >
          <PinkButton>
            Add to Cart
            <CiHeart />
          </PinkButton>
        </AddToCartFunction>
        {/* <button className="flex gap-6 items-center ml-20 text-darkTextBlue">
          Add To Cart
          <CiHeart />
        </button> */}

        {/* Categories and Tags */}
        <div className="flex flex-col gap-3">
          <p className="font-medium ">Category: {product?.category}</p>

          {product?.tags && (
            <p className="font-medium ">
              Tags:
              {product?.tags?.map((tag: string) => tag)}
            </p>
          )}
          <div className="flex gap-3 items-center">
            <p className="font-medium ">Share:</p>
            {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, index) => (
              <Link
                key={index}
                target="_blank"
                href="#"
                className="bg-darkTextBlue  hover:bg-darkTextBlue/90 hover:scale-105 divide-red-300 rounded-full overflow-hidden p-1"
              >
                <Icon className="text-white size-3" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
