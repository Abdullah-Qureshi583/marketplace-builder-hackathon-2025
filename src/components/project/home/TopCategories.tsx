"use client";
import React, { useEffect, useState } from "react";
import Imagecomponent from "../Imagecomponent";
import PrimaryHeading from "../PrimaryHeading";
import { useRouter } from "next/navigation";
import { Product } from "@/types/types";
import { client } from "@/sanity/lib/client";
const TopCategories = () => {
  const router = useRouter();

  const [topCategories, setTopCategories] = useState<Product[]>([]);
  useEffect(() => {
    (async () => {
      const query = `
                *[_type == "product" && image != null  && "topCategory" in tags[]->name ]
                  | order(_updatedAt asc)[0..4] {
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
      setTopCategories(response);
    })();
  }, []);
  return (
    <div className="mt-[150px]">
        <PrimaryHeading>
          {" "}
          {topCategories.length > 0 && "Top Categories"}
        </PrimaryHeading>
      <div className="flex flex-wrap gap-10 mt-[56px] justify-center">
        {topCategories.slice(0, 4).map((item) => (
          <div
            onClick={() => router.push(item.id)}
            key={item.id}
            className="flex flex-col gap-3   w-[230px] group items-center "
          >
            <div className="bg-pViolet/60 size-[250px] aspect-square  rounded-full">
              <div className="w-full h-full rounded-full  bg-chairBgOffWhite group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:bg-white  overflow-hidden aspect-square   flex justify-center items-center ">
                <Imagecomponent
                  imageBg="offWhite"
                  image={item.image}
                  buttonPosition="rowTopLeft"
                  buttonType="viewShop"
                  name={item.name}
                  description={item.description || ""}
                  id={item.id}
                  price={
                    item.price - item.price * (item.discountPercentage / 100)
                  }
                  hoverIcons={false}
                />
              </div>
            </div>
            <div className="text-xl text-darkTextBlue text-center ">
              {item.name}
            </div>
            <div className="text-darkTextBlue text-base">${item.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
