export const selectedProductstoFilter  = (productFilter:any)=>

    





    { `

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
`;}