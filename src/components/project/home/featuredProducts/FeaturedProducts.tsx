"use client";
import "./featuredProducts.css";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Imagecomponent from "../../Imagecomponent";
import PrimaryHeading from "../../PrimaryHeading";
import { Product } from "@/types/types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

function FeaturedProducts() {
  const [featuredChairs, setFeaturedChairs] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const query = `
        *[_type=="product" && isFeaturedProduct == true && image != null][0..8] | order(_updatedAt asc) {
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
      console.log(response);
      setFeaturedChairs(response);
    })();
  }, []);

  const mainSetting = {
    dots: true,
    infinite: true, // Changed from false to true
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    swipeToSlide: false, // Enables swiping to slide
    draggable: true,
    touchMove: true,
    fade: false,
    swipe: true,

    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="  pb-12  mt-[120px]">
      <PrimaryHeading>Featured Products</PrimaryHeading>
      <Slider className="mt-12 " {...mainSetting}>
        {featuredChairs.map((chair) => (
          <div
            key={chair.id}
            className=" md:max-w-[95%] lg:max-w-[300px] xl:max-w-[270px] hover:bg-chairBgBlue h-[430px] group overflow-hidden shadow-lg  "
          >
            {/* <div className="bg-dblLightPurple h-[210px] w-full md:h-auto flex items-center justify-center "> */}
            <Imagecomponent
              imageBg="lightPurple"
              image={chair.image && chair.image}
              buttonPosition="rowTopLeft"
              name={chair.name}
              price={
                chair.price - chair.price * (chair.discountPercentage / 100)
              }
              description={chair?.description || ""}
              id={chair.id}
            />
            {/* </div> */}

            {/* detail */}
            <div className="flex flex-col items-center  py-4 gap-3 bg-white group-hover:bg-chairBgBlue px-3 ">
              <div className="font-bold text-center text-lg text-pPink group-hover:text-white ">
                {chair.name}
              </div>
              <div className="flex gap-x-1">
                {["bg-lineGreen", "bg-pPink", "bg-darkTextBlue"].map(
                  (color) => (
                    <div
                      key={color}
                      className={`w-[14px] h-[4px] rounded-lg cursor-pointer ${color} hover:scale-110 duration-300 hover:scale-y-125 `}
                    ></div>
                  )
                )}
              </div>
              <p className="text-darkTextBlue text-sm group-hover:text-textOffwhite">
                Code - {chair.id.slice(0, 4)}
              </p>
              <p className="text-darkTextBlue text-sm group-hover:text-textOffwhite ">
                {chair.price}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default FeaturedProducts;
