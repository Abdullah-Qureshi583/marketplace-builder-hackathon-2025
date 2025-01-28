"use client";
import React, { useEffect, useState } from "react";
import Imagecomponent from "../../Imagecomponent";
import { Product } from "@/types/types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";

const ShowlatestProducts = ({ tagName }: { tagName: string }) => {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const query = `
            *[_type=="product" && image != null && ${tagName == "featured" ? `isFeaturedProduct == true` : ` "${tagName}" in tags[]->name`} ]  | order(_updatedAt desc)[0..6] {
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
      console.log("in the all in one the response is: ", response);
      setProducts(response);
    })();
  }, [tagName]);

  return (
    <div className="">
      <div className="flex flex-wrap mt-[58px] justify-center gap-6 gap-y-[120px] ">
        {products?.slice(0, 6).map((chair) => (
          <div key={chair.id} className=" group min-w-[200px] w-full md:w-[46%] lg:w-[30%]">
            <div className="bg-chairBgOffWhite group-hover:bg-white h-[320px] flex justify-center items-center">
              <Imagecomponent
                imageBg="offWhite"
                image={chair?.image}
                buttonPosition="colBottomleft"
                buttonType="sale"
                name={chair.name}
                price={
                  chair.price - chair.price * (chair.discountPercentage / 100)
                }
                id={chair.id}
                description={chair.description || ""}
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="text-darkTextBlue">{chair.name}</div>
              <div className="flex  items-center gap-x-3">
                <span className="text-sm text-darkTextBlue ">
                  $
                  {chair.price - chair.price * (chair.discountPercentage / 100)}
                </span>
                <span className=" text-[12px] line-through text-red-500">
                  {chair.discountPercentage > 0 && chair.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowlatestProducts;
