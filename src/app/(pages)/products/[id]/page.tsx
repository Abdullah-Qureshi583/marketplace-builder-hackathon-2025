"use client";
import React, { useEffect, useState } from "react";
import ShowDetail from "./components/ShowDetail";
import RelatedProducts from "./components/RelatedProducts";
import ShowImage from "./components/ShowImage";
import { Product } from "@/types/types";
import { client } from "@/sanity/lib/client";
import { Suspense } from "react";

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProductCategory, setRelatedProductCategory] = useState<string>("");
  useEffect(() => {
    (async () => {
      const query = `
                      *[_type == "product" && defined(rating) && _id == "${params.id}"  && image != null ][0] {
                          name,
                          description,
                          "id": _id,
                          "category":category->name,
                          discountPercentage,
                          price,
                          isFeaturedProduct,
                          stockLevel,
                          image,
                          rating,
                          "tags": tags[]->name
                        }
                    `;
      console.log("The Query to fetch the specific product is : ", query);
      const response: Product = await client.fetch(query);
      setRelatedProductCategory(response?.category || "Chair");
      setProduct(response);
    })();
  }, [params.id]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col gap-32">
        <div className=" container mx-auto p-4 max-w-[1180px]">
          <ShowImage product={product && product} />
        </div>
        <ShowDetail />
        <div className=" container mx-auto p-4 max-w-[1180px]">
          <RelatedProducts relatedProductCategory={relatedProductCategory} />
        </div>
      </div>
    </Suspense>
  );
};

export default ProductDetail;
