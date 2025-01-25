"use client";
import React from "react";

import Imagecomponent from "../../../../components/project/Imagecomponent";
import { useRouter } from "next/navigation";
import { Product } from "@/types/types";
import { urlFor } from "@/sanity/lib/image";

const ShopGrid = ({ products }: { products: Product[] }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center   ">
      {/* chair images */}
      <div className="flex flex-wrap   w-full justify-center gap-6  ">
        {products.map((chair) => (
          <div key={chair.id} className=" group   w-[260px]  shadow-sm   ">
            <Imagecomponent
              imageBg="shopDefault"
              image={chair.image}
              // width={201}
              // height={201}
              buttonPosition="colBottomleft"
              // showHover
              name={chair.name}
              description={chair?.description || ""}
              price={
                chair.price - chair.price * (chair.discountPercentage / 100)
              }
              id={chair.id}
            />

            <div className="flex flex-col justify-center items-center mt-4 text-center mb-2 p-2">
              {/* name */}
              <div className=" text-lg font-bold text-darkTextBlue">
                {chair.name}
              </div>
              {/* colors */}
              <div className="flex gap-2 mt-3 items-center">
                {["orange", "pink", "purple"].map((item) => (
                  <div
                    key={item}
                    className={`
                      ${
                        item == "orange"
                          ? "bg-[#DE9034]"
                          : item == "pink"
                            ? "bg-pPink"
                            : item == "purple"
                              ? "bg-[#8568FF]"
                              : ""
                      } rounded-full w-[10px] h-[10px]`}
                  ></div>
                ))}
              </div>
              {/* price */}
              <div className="flex mt-4 items-center gap-x-3">
                <span className="text-sm text-darkTextBlue ">
                  $
                  {chair.price - chair.price * (chair.discountPercentage / 100)}
                </span>
                <span className=" text-[12px] line-through text-pPink">
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

export default ShopGrid;
