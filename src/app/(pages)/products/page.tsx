"use client";
import FilterProducts from "@/app/(pages)/products/components/FilterProducts";
import ProductFilterSidebar from "@/app/(pages)/products/components/ProductFilterSidebar";
import ShopGrid from "@/app/(pages)/products/components/ShopGrid";
import ShopList from "@/app/(pages)/products/components/ShopList";
import { client } from "@/sanity/lib/client";
import { Product } from "@/types/types";
import React, { Suspense, useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import PinkButton from "@/components/project/PinkButton";
import Link from "next/link";
const ProductsPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.toLocaleLowerCase();

  const [toggleFilterSidebar, setToggleFilterSidebar] = useState(false);
  const [viewType, setViewType] = useState<string>("grid");
  const [productFilter, setProductFilter] = useState<any>({});
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const isSearchingForFeaturedProducts = search?.includes("feature");
    const priceRangeArray =
      productFilter &&
      productFilter.priceRanges &&
      productFilter.priceRanges.length > 0
        ? productFilter.priceRanges.map((range: string) => {
            const [startPart, endPart] = range.split("-");
            const start = parseFloat(startPart.replace("$", "").trim());
            let end: any = endPart
              ? parseFloat(endPart.replace("$", "").trim())
              : null;

            // Handle ranges like "$450.00+" where endPart may not have a valid end value
            if (isNaN(end)) {
              end = null; // Assign null if there's no proper end value
            }

            return {
              start,
              end,
            };
          })
        : [];

    const selectedProductstoFilter = `

    ${
      //  price filtering
      priceRangeArray && priceRangeArray.length > 0
        ? `&& (
            ${priceRangeArray
              .map(
                (price: { start: number; end: number }) =>
                  `(price >= ${price.start} 
                ${
                  price.end != null
                    ? `
                && price <= ${price.end}
                `
                    : ""
                }
                )`
              )
              .join(" || ")}
          )`
        : ""
    }
     ${
       // brands filtered
       productFilter && productFilter.brands && productFilter.brands.length > 0
         ? `&& brand->name in [${productFilter.brands.map((brand: string) => `"${brand}"`)}]`
         : ""
     }
     ${
       //  discounts filtering
       productFilter &&
       productFilter.discounts &&
       productFilter.discounts.length > 0
         ? `&& discountPercentage in [${productFilter.discounts.map(
             (discount: number) => `${discount}`
           )}]`
         : ""
     }
        ${
          //  rating filtering
          productFilter &&
          productFilter.ratings &&
          productFilter.ratings.length > 0
            ? `&& rating in [${productFilter.ratings.map(
                (rating: number) => `${rating}`
              )}]`
            : ""
        }
        ${
          //  category filtering
          productFilter &&
          productFilter.category &&
          productFilter.categories.length > 0
            ? `&& rating in [${productFilter.categories.map(
                (category: string) => `"${category}"`
              )}]`
            : ""
        }
    `;

    const filterBySearchBar = `
              ${
                // search by search bar
                isSearchingForFeaturedProducts
                  ? `&& isFeaturedProduct == true`
                  : search
                    ? `&& (
            name match "${search}*" ||
            tags[]->name match "${search}*" ||
            brand->name match "${search}*"
          )`
                    : ""
              }
    `;

    (async () => {
      const query = `*[
        _type == "product" &&
        defined(rating) &&
        image != null
        ${selectedProductstoFilter}
        ${filterBySearchBar}
      ] | order(_updatedAt desc)[0..11] {
        name,
        description,
        "id": _id,
        category,
        discountPercentage,
        price,
        isFeaturedProduct,
        stockLevel,
        image,
        rating
      }`;
      const response: Product[] = await client.fetch(query);
      setProducts(response);
    })();
  }, [search, productFilter]);

  return (
    <div>
      {/* filter  */}
      <FilterProducts
        toggleFilterSidebar={toggleFilterSidebar}
        setToggleFilterSidebar={setToggleFilterSidebar}
        setViewType={setViewType}
      />
      {/* shop  */}
      <div className=" flex gap-3 ">
        {toggleFilterSidebar && (
          <ProductFilterSidebar
            setIsOpen={setToggleFilterSidebar}
            isOpen={toggleFilterSidebar}
            setProductFilter={setProductFilter}
          />
        )}
        {products.length > 0 ? (
          <div className="flex flex-col gap-4 items-start w-full">
            {viewType === "grid" ? (
              <ShopGrid products={products} />
            ) : viewType === "list" ? (
              <ShopList products={products} />
            ) : null}
            {/*show the clear filter if there is filter applied and prodects are present  */}
            {Object.keys(productFilter).length > 0 && (
              <div onClick={() => setProductFilter({})} className="">
                <PinkButton>Clear Filter</PinkButton>
              </div>
            )}
          </div>
        ) : (
          // show when there is no product according to filter applied
          <div className="text-3xl font-bold text-center text-darkTextBlue w-full mt-6 flex gap-4 flex-col items-center">
            <p>No Result Found for your Search</p>
            <Link href="/products" onClick={() => setProductFilter({})}>
              <PinkButton>Explore More Products</PinkButton>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const Products = () => {
  return (
    <Suspense fallback={<p>Loading analytics...</p>}>
      <ProductsPage />
    </Suspense>
  );
};

export default Products;
