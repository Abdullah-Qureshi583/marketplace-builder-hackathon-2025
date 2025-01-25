"use client";
import React, { useEffect, useState } from "react";
import ShowDetail from "./components/ShowDetail";
import RelatedProducts from "./components/RelatedProducts";
import ShowImage from "./components/ShowImage";
import { Product } from "@/types/types";
import { client } from "@/sanity/lib/client";
import { Suspense } from "react";

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Product[]>([]);
  useEffect(() => {
    (async () => {
      const query = `
                      *[_type == "product" && defined(rating) && _id == "${params.id}"  && image != null ] {
                          name,
                          description,
                          "id": _id,
                          category,
                          discountPercentage,
                          price,
                          isFeaturedProduct,
                          stockLevel,
                          image,
                          rating,
                          "tags": tags[]->name
                        }
                    `;
      const response: Product[] = await client.fetch(query);
      setProduct(response);
    })();
  }, [params.id]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col gap-32">
        <div className=" container mx-auto p-4 max-w-[1180px]">
          <ShowImage product={product && product[0]} />
        </div>
        <ShowDetail />
        <div className=" container mx-auto p-4 max-w-[1180px]">
          <RelatedProducts />
        </div>
      </div>
    </Suspense>
  );
};

export default ProductDetail;