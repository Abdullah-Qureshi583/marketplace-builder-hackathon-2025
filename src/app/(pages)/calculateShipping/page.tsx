"use client";
import CalcShipLeft from "./components/CalcShipLeft";
import CalcShipRight from "./components/CalcShipRight";

export default function CalcShipping({
  searchParams,
}: {
  searchParams: { country: string; city: string; postalCode: string };
}) {
  return (
    <div className="container mx-auto p-4 max-w-[1180px] flex justify-center items-center">
      <div className="grid grid-cols-1 w-full md:grid-cols-3 gap-6">
        {/* Left Section */}
        <CalcShipLeft 
          searchParams={{
            country: searchParams.country ? searchParams.country : "",
            city: searchParams.city ? searchParams.city : "",
            postalCode: searchParams.postalCode ? searchParams.postalCode : ""
          }} 
        />

        {/* Right Section */}
        <CalcShipRight 
        />
      </div>
    </div>
  );
}