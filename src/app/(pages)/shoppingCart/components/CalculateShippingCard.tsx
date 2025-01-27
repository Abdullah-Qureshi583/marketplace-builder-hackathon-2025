import PinkButton from "@/components/project/PinkButton";
import Link from "next/link";
import React, { useState } from "react";

const CalculateShippingCard = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  return (
    <div className="bg-dblLightPurple  w-full">
      <div className="flex flex-col w-full p-8">
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="placeholder:text-subText text-black mt-4 bg-transparent border-b-2 border-subText focus-within:outline-none focus-within:border-pPink  w-full  h-12 text-lg"
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="placeholder:text-subText text-black mt-4 bg-transparent border-b-2 border-subText focus-within:outline-none focus-within:border-pPink  w-full  h-12 text-lg"
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="placeholder:text-subText text-black mt-4 bg-transparent border-b-2 border-subText focus-within:outline-none focus-within:border-pPink  w-full  h-12 text-lg"
        />

        <Link
          href={`/calculateShipping?${country ? `country=${country}&` : ""}${city ? `city=${city}&` : ""}${postalCode ? `postalCode=${postalCode}` : ""}`}
          className="mt-6"
        >
          <PinkButton>Calculate Shipping</PinkButton>
        </Link>
      </div>
    </div>
  );
};

export default CalculateShippingCard;