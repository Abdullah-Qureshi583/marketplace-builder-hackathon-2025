"use client";
import React, { useState } from "react";
import ShowlatestProducts from "./ShowlatestProducts";
import PrimaryHeading from "../../PrimaryHeading";

const links = [
  {
    name: "newArrival",
    label: "New Arrival",
  },
  {
    name: "bestSeller",
    label: "Best Seller",
  },
  {
    name: "featured",
    label: "Featured",
  },
  {
    name: "specialOffer",
    label: "Special Offer",
  },
];
const LatestProducts = () => {
  const [activeTab, setActiveTab] = useState("newArrival");
  return (
    <div className="flex flex-col items-center mt-[70px]">
      <PrimaryHeading>Leatest Products</PrimaryHeading>
      <ul className="flex gap-y-3 flex-col md:flex-row text-center gap-x-14 mt-5 ">
        {links.map((Item) => (
          <li
            key={Item.name}
            onClick={() => setActiveTab(Item.name)}
            className={`text-lg text-darkTextBlue ${
              activeTab == Item.name ? "underline text-red-500" : ""
            } cursor-pointer hover:scale-105 duration-300 hover:font-semibold`}
          >
            {Item.label}
          </li>
        ))}
      </ul>

      <ShowlatestProducts tagName={activeTab} />
    </div>
  );
};

export default LatestProducts;
