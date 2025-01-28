"use client";
import React, { useEffect, useState } from "react";
import Imagecomponent from "../Imagecomponent";
import PrimaryHeading from "../PrimaryHeading";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/types/types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface Props {
  title: string;
  linklable: string;
  linkHref: string;
  imageUrl: string;
  bg: "pink" | "purple";
  width: number;
  height: number;
}
const LSCard = ({
  title,
  linklable,
  linkHref,
  imageUrl,
  bg,
  width,
  height,
}: Props) => {
  return (
    <div
      className={`${
        bg == "pink" ? "bg-[#FFF6FB]" : bg == "purple" ? "bg-lightPurple" : ""
      } flex flex-grow w-full h-full  p-9 pr-2 flex-col justify-between `}
    >
      <div className="flex gap-3 flex-col">
        <div className="text-darkTextBlue text-[26px] font-[600]">{title}</div>
        <Link className="text-pPink hover:underline" href={linkHref}>
          {linklable}
        </Link>
      </div>
      <Image
        className="self-end"
        src={imageUrl}
        width={width}
        height={height}
        alt="Product image"
      />
    </div>
  );
};

const TrendingProducts = () => {
  const router = useRouter();
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [twentyThreePercentOff, setTwentyThreePercentOff] = useState<Product[]>(
    []
  );
  useEffect(() => {
    // fetch the trending products
    (async () => {
      const query = `
              *[_type == "product" && image != null  && "trendingProduct" in tags[]->name && discountPercentage == 23]
                | order(_updatedAt desc)[0..1] {
                  name,
                  description,
                  "id": _id,
                  category,
                  discountPercentage,
                  price,
                  isFeaturedProduct,
                  stockLevel,
                  image
                }
            `;
      const response: Product[] = await client.fetch(query);
      setTwentyThreePercentOff(response);
    })();

    (async () => {
      const query = `
              *[_type=="product"  && image != null   && "trendingProduct" in tags[]->name] | order(_updatedAt desc )[0..8] {
                name,
                description,
                "id":_id,
                category,
                discountPercentage,
                price,
                isFeaturedProduct,
                stockLevel,
                image
              }
            `;
      const response: Product[] = await client.fetch(query);
      setTrendingProducts(response);
    })();
  }, []);

  return (
    <div className="flex flex-col items-center  mt-[130px] ">
      {/* heading */}
      <PrimaryHeading>Trending Products</PrimaryHeading>
      {/* chair images */}
      <div className="flex flex-wrap mt-[58px]   w-full justify-center gap-6  ">
        {trendingProducts.slice(0, 4).map((chair) => (
          <div
            key={chair.id}
            className=" group hover:cursor-pointer p-3 shadow-sm w-full md:w-[30%] lg:w-[22%]  "
          >
            <Imagecomponent
              imageBg="offWhite"
              buttonPosition="rowTopLeft"
              image={chair.image}
              name={chair.name}
              price={
                chair.price - chair.price * (chair.discountPercentage / 100)
              }
              description={chair.description || ""}
              id={chair.id}
            />

            <div className="flex flex-col text-center justify-center items-center mt-4 pb-8">
              <div className="text-darkTextBlue">{chair.name}</div>
              <div className="flex  items-center gap-x-3">
                <span className="text-sm text-darkTextBlue ">
                  {/* discounted price */}$
                  {chair.price - chair.price * (chair.discountPercentage / 100)}
                </span>
                <span className=" text-[12px] line-through text-subText">
                  {chair.discountPercentage > 0 && chair.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* next section  */}
      <div className="flex w-full flex-col gap-4 md:flex-row ">
        {twentyThreePercentOff.slice(0, 2).map((product, index) => (
          <div key={product.id} className="w-full">
            <LSCard
              title="23% off in all products"
              linklable="Shop Now"
              linkHref={`/products/${product.id}`}
              imageUrl={urlFor(product.image).url()}
              bg={index == 0 ? "pink" : "purple"}
              width={213}
              height={207}
            />
          </div>
        ))}

        <div className=" md:hidden lg:flex flex-col gap-5">
          {trendingProducts?.slice(1, 4).map((chair, index) => (
            <div
              key={chair.id}
              onClick={() => router.push(`/products/${chair.id}`)}
              className=" hover:cursor-pointer w-[272px] flex bg-white "
            >
              <div className="bg-chairBgOffWhite  flex justify-center items-center p-5 size-[110px] aspect-square">
                <Image
                  src={urlFor(chair.image).url()}
                  width={64}
                  height={71}
                  alt="Chair Image"
                />
              </div>
              <div className="flex flex-col gap-2 justify-center items-center p-1 ">
                <div className="text-darkTextBlue">{chair.name}</div>
                <div className="flex gap-6">
                  <p className="text-[12px]   text-darkTextBlue">
                    ${" "}
                    {chair.price -
                      chair.price * (chair.discountPercentage / 100)}
                  </p>
                  <p className="text-[12px]  line-through text-darkTextBlue">
                    {chair.discountPercentage > 0 && chair.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;
