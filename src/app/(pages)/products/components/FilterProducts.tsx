import React, { useState } from "react";
import { IoGrid } from "react-icons/io5";
import { FaListUl } from "react-icons/fa";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const FilterProducts = ({
  toggleFilterSidebar,
  setToggleFilterSidebar,
  setViewType,
}: {
  toggleFilterSidebar: boolean;
  setToggleFilterSidebar: (value: boolean) => void;
  setViewType: (value: string) => void;
}) => {
  const [selectedView, setSelectedView] = useState("grid");

  const handleViewChange = (view: string) => {
    setSelectedView(view);
    setViewType(view);
  };

  return (
    <div className="sticky top-16 z-[40] bg-white  py-2 flex mb-16 flex-col items-start gap-5 xl:flex-row md:justify-between w-full xl:items-center">
      <div className="hidden md:block">
        <h1 className="text-2xl font-bold text-darkTextBlue">
          Ecommerce Accessories & Fashion item
        </h1>
        <p className="text-[12px] text-subText">
          About 9,620 results (0.62 seconds)
        </p>
      </div>
      <div className="flex flex-row md:items-center justify-between gap-5 w-full md:w-auto px-2 md:px-0 text-darkTextBlue/80">
        <Button
          variant="outline"
          className="bg-dblLightPurple"
          onClick={() => setToggleFilterSidebar(!toggleFilterSidebar)}
        >
          Filter Products
        </Button>
        <div className="flex items-center gap-2">
          <label htmlFor="view">View:</label>
          <div className="flex gap-2">
            <button
              onClick={() => handleViewChange("grid")}
              className={`${selectedView === "grid" ? "text-blue-500" : ""}`}
              aria-label="Grid View"
            >
              <IoGrid />
            </button>
            <button
              onClick={() => handleViewChange("list")}
              className={`${selectedView === "list" ? "text-blue-500" : ""}`}
              aria-label="List View"
            >
              <FaListUl />
            </button>
          </div>
          <div className="hidden md:block">
            <Select
              value={selectedView}
              onValueChange={(value) => handleViewChange(value)}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue
                  placeholder={
                    selectedView.charAt(0).toUpperCase() + selectedView.slice(1)
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">Grid</SelectItem>
                <SelectItem value="list">List</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterProducts;
