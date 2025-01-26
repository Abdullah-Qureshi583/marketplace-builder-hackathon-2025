"use client";
import Image from "next/image";
import PrimaryHeading from "../PrimaryHeading";
import PinkButton from "../PinkButton";
import SecondaryHeading from "../SecondaryHeading";
import { useEffect, useState } from "react";
import { Product } from "@/types/types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import AddToCartFunction from "@/components/project/AddToCartFunction";

const points = [
  {
    color: "pPink",
    text: "All frames constructed with hardwood solids and laminates",
  },
  {
    color: "chairBgBlue",
    text: "Reinforced with double wood dowels, glue, screw - nails corner blocks and machine nails",
  },
  {
    color: "lineGreen",
    text: "Arms, backs and seats are structurally reinforced",
  },
];

export default function UniqueFeatures() {
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);

  useEffect(() => {
    (async () => {
      const query = `
          *[_type=="product" && isFeaturedProduct == true && image != null][0]{
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
      const response: Product | null = await client.fetch(query);
      setFeaturedProduct(response);
    })();
  }, []);

  if (!featuredProduct) return null;

  return (
    <div className="bg-lightPurple py-6 mt-[150px] tracking-widest ">
      <div className="grid md:grid-cols-2 container mx-auto max-w-[1180px]">
        <div className="py-9  px-[.8rem]">
          <Image
            src={urlFor(featuredProduct.image).url()}
            alt={`${featuredProduct.name} Image`}
            width={700}
            height={700}
          />
        </div>

        <div className="relative  left- px-4 md:px-0 flex items-center">
          <div className="flex flex-col gap-6">
            <SecondaryHeading>
              Unique Features Of Latest & Trending Products
            </SecondaryHeading>
            <div className="flex gap-3 flex-col">
              {points.map((point, index) => (
                <div key={index} className="flex gap-x-4 items-center">
                  <div
                    className={`size-3 aspect-square rounded-full bg-${point.color}`}
                  ></div>
                  <p className="text-subText font-[500]">{point.text}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2 items-center">
              <AddToCartFunction
                cartItem={{
                  name: featuredProduct.name,
                  price: featuredProduct.price,
                  image: featuredProduct.image,
                  id: featuredProduct.id,
                  description: featuredProduct.description || "",
                  currency: "USD",
                }}
              >
                <PinkButton>Add to Cart </PinkButton>
              </AddToCartFunction>
              <div className="flex flex-col">
                <p>{featuredProduct.name} </p>
                <p>
                  $
                  {featuredProduct.price -
                    featuredProduct.price *
                      (featuredProduct.discountPercentage / 100)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
