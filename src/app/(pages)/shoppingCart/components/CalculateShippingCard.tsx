import PinkButton from "@/components/project/PinkButton";
import Link from "next/link";
import React from "react";

const CalculateShippingCard = () => {
  return (
    <div className="bg-dblLightPurple  w-full">
      <div className="flex flex-col w-full p-8">
        <input
          type="text"
          placeholder="Country"
          className="placeholder:text-subText text-black mt-4 bg-transparent border-b-2 border-subText focus-within:outline-none focus-within:border-pPink  w-full  h-12 text-lg"
        />
        <input
          type="text"
          placeholder="City"
          className="placeholder:text-subText text-black mt-4 bg-transparent border-b-2 border-subText focus-within:outline-none focus-within:border-pPink  w-full  h-12 text-lg"
        />
        <input
          type="text"
          placeholder="Postal Code"
          className="placeholder:text-subText text-black mt-4 bg-transparent border-b-2 border-subText focus-within:outline-none focus-within:border-pPink  w-full  h-12 text-lg"
        />

        <Link href="/calculateShipping" className="mt-6">
          <PinkButton>Calculate Shipping</PinkButton>
        </Link>
      </div>
    </div>
  );
};

export default CalculateShippingCard;
