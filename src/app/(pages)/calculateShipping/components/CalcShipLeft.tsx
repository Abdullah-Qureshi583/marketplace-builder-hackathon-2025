import PinkButton from "@/components/project/PinkButton";
import Link from "next/link";
import React, { useState } from "react";

const Input = ({
  type,
  placeholder,
  value,
  onChange,
}: {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full py-3 focus:border-b-pPink focus-within:outline-none  bg-transparent border-b-2 placeholder:text-subText text-black border-subText"
    />
  );
};

export default function CalcShipLeft({
  searchParams,
}: {
  searchParams: { country: string; city: string; postalCode: string };
}) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState(
    searchParams.city ? searchParams.city : ""
  );
  const [country, setCountry] = useState(
    searchParams.country ? searchParams.country : ""
  );
  const [postalCode, setPostalCode] = useState(
    searchParams.postalCode ? searchParams.postalCode : ""
  );
  const [keepUpdated, setKeepUpdated] = useState(false);

  return (
    <div className="col-span-2 bg-dblLightPurple px-8 py-16 h-fit">
      <div className="flex flex-col gap-4 mb-24">
        <div className="flex flex-col md:flex-row justify-center   md:justify-between items-center">
          <h2 className="text-lg font-semibold ">Contact Information</h2>
          <p className=" text-subText text-sm ">
            Already have an Account?{" "}
            <Link href="/pages/myAccount" className=" hover:underline">
              Login
            </Link>
          </p>
        </div>
        <Input
          type={"text"}
          placeholder="Email or mobile phone number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="flex items-center mt-3">
          <input
            type="checkbox"
            className="mr-2 accent-green-500"
            checked={keepUpdated}
            onChange={() => setKeepUpdated(!keepUpdated)}
          />
          <span className="text-sm text-gray-600">
            Keep me up to date on news and exclusive offers
          </span>
        </label>
      </div>

      <div className="flex flex-col gap-8 mb-[100px]">
        <h2 className="text-lg font-semibold ">Shipping address</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            type={"text"}
            placeholder="First name (optional)"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            type={"text"}
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <Input
          type={"text"}
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Input
          type={"text"}
          placeholder="Apartment, suite, etc. (optional)"
          value={apartment}
          onChange={(e) => setApartment(e.target.value)}
        />
        <Input
          type={"text"}
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <Input
            type={"text"}
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <Input
            type={"text"}
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
      </div>
      <Link href="/getPayment">
        <PinkButton>Continue Shipping</PinkButton>
      </Link>
    </div>
  );
}
