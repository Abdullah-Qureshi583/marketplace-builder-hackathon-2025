// // for now comment the part of color filter may be add it later
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"

// import React, { useState } from "react";
// import PinkButton from "../../../../components/project/PinkButton";
// const Heading = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <h5 className="text-[22px] font-semibold text-darkTextBlue underline underline-offset-4">
//       {children}
//     </h5>
//   );
// };

// const ProductFilterSidebar = ({
//   setProductFilter,
// }: {
//   setProductFilter: any;
// }) => {
//   const filterOptions = {
//     brands: [
//       "coasterFurniture",
//       "fusionDotHighFashion",
//       "Unique Furnitture Restor",
//       "Dream Furnitture Flipping",
//       "Young Repurposed",
//       "Green DIY furniture",
//     ],

//     discounts: [2, 5, 25],

//     ratings: [
//       { stars: 5 },
//       { stars: 4 },
//       { stars: 3 },
//       { stars: 2 },
//       { stars: 1 },
//     ],

//     categories: ["Sofa", "Chair"],

//     priceRanges: [
//       "$0.00 - $150.00",
//       "$150.00 - $350.00",
//       "$150.00 - $504.00",
//       "$450.00 +",
//     ],

//     colors: ["red", "blue", "brown", "green", "purple", "sky"],
//   };

//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
//   const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
//   const [selectedDiscounts, setSelectedDiscounts] = useState<number[]>([]);
//   const [selectedColors, setSelectedColors] = useState<string[]>([]);
//   const [selectedRatings, setSelectedRatings] = useState<number[]>([]); // Added state for selected ratings

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategories((prev) =>
//       prev.includes(category)
//         ? prev.filter((c) => c !== category)
//         : [...prev, category]
//     );
//   };

//   const handlePriceRangeChange = (range: string) => {
//     setSelectedPriceRanges((prev) =>
//       prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
//     );
//   };

//   const handleBrandChange = (brand: string) => {
//     setSelectedBrands((prev) =>
//       prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
//     );
//   };

//   const handleDiscountChange = (discount: number) => {
//     setSelectedDiscounts((prev) =>
//       prev.includes(discount)
//         ? prev.filter((d) => d !== discount)
//         : [...prev, discount]
//     );
//   };

//   const handleColorChange = (color: string) => {
//     setSelectedColors((prev) =>
//       prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
//     );
//   };

//   const handleRatingChange = (stars: number) => {
//     // Added function to handle rating change
//     setSelectedRatings((prev) =>
//       prev.includes(stars) ? prev.filter((r) => r !== stars) : [...prev, stars]
//     );
//   };

//   const handleFilter = () => {
//     const filter = {
//       categories: selectedCategories,
//       priceRanges: selectedPriceRanges,
//       brands: selectedBrands,
//       discounts: selectedDiscounts,
//       // colors: selectedColors,
//       ratings: selectedRatings,
//     };
//     setProductFilter(filter);
//   };

//   return (
//     <div className="text-nowrap bg-white  h-fit p-6 shadow-md rounded-lg flex flex-col gap-11">
//       {/* Product Brand */}
//       <div className="flex flex-col gap-5">
//         <Heading>Product Brand</Heading>
//         <ul className="flex flex-col gap-2">
//           {filterOptions.brands.map((label) => (
//             <li key={label}>
//               <input
//                 type="checkbox"
//                 className="text-red-500 accent-purple-400 size-4 cursor-pointer  "
//                 id={label}
//                 checked={selectedBrands.includes(label)}
//                 onChange={() => handleBrandChange(label)}
//               />{" "}
//               <label htmlFor={label} className="text-subText cursor-pointer  ">
//                 {label}
//               </label>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Discounts Info */}
//       <div className="flex flex-col gap-5">
//         <Heading>Discount Offer</Heading>
//         <ul className="flex flex-col gap-2">
//           {filterOptions.discounts.map((label) => (
//             <li key={label}>
//               <input
//                 type="checkbox"
//                 className="text-red-500 accent-pPink size-4 cursor-pointer  "
//                 id={label.toString()}
//                 checked={selectedDiscounts.includes(label)}
//                 onChange={() => handleDiscountChange(label)}
//               />{" "}
//               <label
//                 htmlFor={label.toString()}
//                 className="text-subText cursor-pointer  "
//               >
//                 {label}% Discount
//               </label>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Rating */}
//       <div className="flex flex-col gap-2">
//         <Heading>Rating Item</Heading>
//         {filterOptions.ratings.map((rating, index) => (
//           <div key={index} className="flex items-center gap-1">
//             {/* Checkbox */}
//             <input
//               type="checkbox"
//               className={`size-4 accent-yellow-300 cursor-pointer  `}
//               checked={selectedRatings.includes(rating.stars)} // Check if rating is selected
//               onChange={() => handleRatingChange(rating.stars)} // Handle rating change
//             />
//             {/* Stars */}
//             <div
//               className="flex cursor-pointer   items-center space-x-1"
//               onClick={() => handleRatingChange(rating.stars)}
//             >
//               {[...Array(rating.stars)].map((_, i) => (
//                 <span key={i} className="text-yellow-500">
//                   &#9733;
//                 </span>
//               ))}
//               {[...Array(5 - rating.stars)].map((_, i) => (
//                 <span key={i} className="text-subText">
//                   &#9733;
//                 </span>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Categories */}
//       <div className="flex flex-col gap-5">
//         <Heading>Categories</Heading>
//         <ul className="flex flex-col gap-2">
//           {filterOptions.categories.map((category) => (
//             <li key={category}>
//               <input
//                 type="checkbox"
//                 className="accent-pPink size-4 cursor-pointer  "
//                 id={category}
//                 checked={selectedCategories.includes(category)}
//                 onChange={() => handleCategoryChange(category)}
//               />{" "}
//               <label
//                 htmlFor={category}
//                 className="text-subText cursor-pointer  "
//               >
//                 {category}
//               </label>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Price Range */}
//       <div className="flex flex-col gap-5">
//         <Heading>Price Filter</Heading>
//         <ul className="flex flex-col gap-2">
//           {filterOptions.priceRanges.map((range) => (
//             <li key={range}>
//               <input
//                 type="checkbox"
//                 className="accent-pPink size-4 cursor-pointer  "
//                 id={range}
//                 checked={selectedPriceRanges.includes(range)}
//                 onChange={() => handlePriceRangeChange(range)}
//               />{" "}
//               <label htmlFor={range} className="text-subText cursor-pointer  ">
//                 {range}
//               </label>
//             </li>
//           ))}
//         </ul>
//         {/* <input
//           type="text"
//           placeholder="$10.00 - 20000$"
//           className="text-subText border p-1 cursor-pointer  "
//         /> */}
//       </div>

//       {/* Color Filter */}
//       <div className="flex flex-col gap-5">
//         <Heading>Filter By Color</Heading>
//         <div className="flex justify-between gap-y-5 flex-wrap">
//           {filterOptions.colors.map((color) => (
//             <div key={color} className="flex items-center gap-1 w-[33%] ">
//               <input
//                 type="checkbox"
//                 className={`size-4 accent-pPink cursor-pointer  `}
//                 id={color}
//                 checked={selectedColors.includes(color)}
//                 onChange={() => handleColorChange(color)}
//               />

//               <label
//                 htmlFor={color}
//                 className="text-base text-subText cursor-pointer  "
//               >
//                 {color.charAt(0).toUpperCase() + color.slice(1)}
//               </label>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div onClick={handleFilter}>
//         <PinkButton wFull>Filter</PinkButton>
//       </div>
//     </div>
//   );
// };

// export default ProductFilterSidebar;
// for now comment the part of color filter may be add it later

"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import React, { useState } from "react";
import PinkButton from "../../../../components/project/PinkButton";
import { useRouter } from "next/navigation";
const Heading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h5 className="text-[22px] font-semibold text-darkTextBlue underline underline-offset-4">
      {children}
    </h5>
  );
};

type ProductFilterSidebarProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setProductFilter: React.Dispatch<React.SetStateAction<any>>; // Replace `any` with a specific type if possible.
};
const ProductFilterSidebar = ({
  setIsOpen,
  isOpen,
  setProductFilter,
}: ProductFilterSidebarProps) => {
  const router = useRouter();
  const filterOptions = {
    brands: [
      "coasterFurniture",
      "fusionDotHighFashion",
      "Unique Furnitture Restor",
      "Dream Furnitture Flipping",
      "Young Repurposed",
      "Green DIY furniture",
    ],

    discounts: [2, 5, 25],

    ratings: [
      { stars: 5 },
      { stars: 4 },
      { stars: 3 },
      { stars: 2 },
      { stars: 1 },
    ],

    categories: ["Sofa", "Chair"],

    priceRanges: [
      "$0.00 - $150.00",
      "$150.00 - $350.00",
      "$150.00 - $504.00",
      "$450.00 +",
    ],

    colors: ["red", "blue", "brown", "green", "purple", "sky"],
  };

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]); // Added state for selected ratings
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceRangeChange = (range: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleDiscountChange = (discount: number) => {
    setSelectedDiscounts((prev) =>
      prev.includes(discount)
        ? prev.filter((d) => d !== discount)
        : [...prev, discount]
    );
  };

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleRatingChange = (stars: number) => {
    // Added function to handle rating change
    setSelectedRatings((prev) =>
      prev.includes(stars) ? prev.filter((r) => r !== stars) : [...prev, stars]
    );
  };

  const handleFilter = () => {
    const filter = {
      categories: selectedCategories,
      priceRanges: selectedPriceRanges,
      brands: selectedBrands,
      discounts: selectedDiscounts,
      // colors: selectedColors, // Uncomment if colors should be included
      ratings: selectedRatings,
    };
    setProductFilter(filter);
    setIsOpen(!isOpen);
    // router.push("?filterProducts=true");
  };

  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      {/* <SheetTrigger>Open</SheetTrigger> */}
      <SheetContent className="text-darkTextBlue overflow-y-auto ">
        <SheetHeader>
          <SheetTitle>
            {" "}
            <div className="items-center flex justify-center text-center font-bold text-3xl text-darkTextBlue">
              Filter Products
            </div>
            {/* <Heading>Product Brand</Heading> */}
          </SheetTitle>
          <SheetDescription>
            <div className="text-nowrap bg-white  h-fit p-6 shadow-md text-start rounded-lg flex flex-col items-start gap-11">
              {/* Product Brand */}
              <div className="flex flex-col   gap-5">
                <Heading>Product Brand</Heading>
                <ul className="flex flex-col gap-2">
                  {filterOptions.brands.map((label) => (
                    <li key={label}>
                      <input
                        type="checkbox"
                        className="text-red-500 accent-purple-400 size-4 cursor-pointer  "
                        id={label}
                        checked={selectedBrands.includes(label)}
                        onChange={() => handleBrandChange(label)}
                      />{" "}
                      <label
                        htmlFor={label}
                        className="text-subText cursor-pointer  "
                      >
                        {label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Discounts Info */}
              <div className="flex flex-col gap-5">
                <Heading>Discount Offer</Heading>
                <ul className="flex flex-col gap-2">
                  {filterOptions.discounts.map((label) => (
                    <li key={label}>
                      <input
                        type="checkbox"
                        className="text-red-500 accent-pPink size-4 cursor-pointer  "
                        id={label.toString()}
                        checked={selectedDiscounts.includes(label)}
                        onChange={() => handleDiscountChange(label)}
                      />{" "}
                      <label
                        htmlFor={label.toString()}
                        className="text-subText cursor-pointer  "
                      >
                        {label}% Discount
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rating */}
              <div className="flex flex-col gap-2">
                <Heading>Rating Item</Heading>
                {filterOptions.ratings.map((rating, index) => (
                  <div key={index} className="flex  gap-1">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      className={`size-4 accent-yellow-300 cursor-pointer  `}
                      checked={selectedRatings.includes(rating.stars)} // Check if rating is selected
                      onChange={() => handleRatingChange(rating.stars)} // Handle rating change
                    />
                    {/* Stars */}
                    <div
                      className="flex cursor-pointer    space-x-1"
                      onClick={() => handleRatingChange(rating.stars)}
                    >
                      {[...Array(rating.stars)].map((_, i) => (
                        <span key={i} className="text-yellow-500">
                          &#9733;
                        </span>
                      ))}
                      {[...Array(5 - rating.stars)].map((_, i) => (
                        <span key={i} className="text-subText">
                          &#9733;
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Categories */}
              <div className="flex flex-col gap-5">
                <Heading>Categories</Heading>
                <ul className="flex flex-col gap-2">
                  {filterOptions.categories.map((category) => (
                    <li key={category}>
                      <input
                        type="checkbox"
                        className="accent-pPink size-4 cursor-pointer  "
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                      />{" "}
                      <label
                        htmlFor={category}
                        className="text-subText cursor-pointer  "
                      >
                        {category}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Range */}
              <div className="flex flex-col gap-5">
                <Heading>Price Filter</Heading>
                <ul className="flex flex-col gap-2">
                  {filterOptions.priceRanges.map((range) => (
                    <li key={range}>
                      <input
                        type="checkbox"
                        className="accent-pPink size-4 cursor-pointer  "
                        id={range}
                        checked={selectedPriceRanges.includes(range)}
                        onChange={() => handlePriceRangeChange(range)}
                      />{" "}
                      <label
                        htmlFor={range}
                        className="text-subText cursor-pointer  "
                      >
                        {range}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Color Filter */}
              <div className="flex flex-col gap-5">
                <Heading>Filter By Color</Heading>
                <div className="flex justify-between gap-y-5 flex-wrap">
                  {filterOptions.colors.map((color) => (
                    <div
                      key={color}
                      className="flex items-center gap-1 w-[33%] "
                    >
                      <input
                        type="checkbox"
                        className={`size-4 accent-pPink cursor-pointer  `}
                        id={color}
                        checked={selectedColors.includes(color)}
                        onChange={() => handleColorChange(color)}
                      />

                      <label
                        htmlFor={color}
                        className="text-base text-subText cursor-pointer  "
                      >
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full" onClick={handleFilter}>
                <PinkButton wFull>Filter</PinkButton>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ProductFilterSidebar;
