import FilterProducts from "@/app/(pages)/products/components/FilterProducts";
import ImageAutoSlider from "@/components/project/ImageAutoSlider";
import ShowPathName from "@/components/project/ShowPathName";
import React from "react";

const PagesLayout = ({ children }:{children:React.ReactNode}) => {
  return (
    <>
      <ShowPathName />
      <div className=" container mx-auto p-4 max-w-[1180px]">
        {children}
      </div>
    </>
  );
};

export default PagesLayout;
