"use client";
import { usePathname } from "next/navigation";

function splitAndCapitalizeCamelCase(input: string) {
  // Insert spaces before capital letters and capitalize the first letter
  const spacedString = input?.replace(/([A-Z])/g, " $1").trim();
  const firstChar = spacedString?.slice(0, 1).toUpperCase();
  const capitalizedString = firstChar + spacedString?.slice(1);
  return capitalizedString;
}
export default function ShowPathName() {
  const pathName = usePathname();
  const currentPage: string = pathName.split("/")?.pop()?.toString() || "";
  return (
    <div className="bg-lightPurple  mb-32 ">
      <div className="flex container mx-auto  max-w-[1180px] px-4 min-h-[290px] ">
        <div className="flex flex-col justify-center ">
          <h2 className="text-2xl md:text-4xl font-bold mt-3">
            {/* heading */}
            {splitAndCapitalizeCamelCase(currentPage)}
            {/* Shop Grid Default */}
          </h2>
          <p className="text-black mt-1 font-medium ">
            <span>{pathName.startsWith("/") && "Home . Pages"} </span>

            <span className="text-pPink">
              {" "}
              . {splitAndCapitalizeCamelCase(pathName.split("/")[1])}
            </span>
          </p>
          <div className="mt-7">
            {/* <PinkButton   Button>Shop Now</PinkButton> */}
          </div>
        </div>
      </div>
    </div>
  );
}
