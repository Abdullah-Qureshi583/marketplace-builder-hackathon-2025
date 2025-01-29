"use client";
import Imagecomponent from "@/components/project/Imagecomponent";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function RelatedProducts({
  relatedProductCategory,
}: {
  relatedProductCategory: string;
}) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  useEffect(() => {
    (async () => {
      const query = `
                        *[_type == "product" && defined(rating) && category->name == "${relatedProductCategory}"   && image != null ][0..3] {
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
      const response: Product[] = await client.fetch(query);
      setRelatedProducts(response);
    })();
  }, [relatedProductCategory]);

  // product.rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <span key={index} className="text-yellow-400">
              ★
            </span>
          ))}
        {halfStar && <span className="text-yellow-400">☆</span>}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <span key={index} className="text-gray-300">
              ★
            </span>
          ))}
      </div>
    );
  };

  return (
    <div className="">
      <h5 className="text-4xl font-semibold text-darkTextBlue mb-12">
        Related Products
      </h5>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts?.map((product) => (
          <div
            key={product.id}
            className="group rounded-lg bg-lightPurple overflow-hidden "
          >
            <div className=" relative flex justify-center items-center bg-white ">
              <Imagecomponent
                imageBg="offWhite"
                showHover={true}
                image={product.image && product.image}
                buttonPosition="rowTopLeft"
                name={product.name}
                price={
                  product.price -
                  product.price * (product.discountPercentage / 100)
                }
                description={product?.description || ""}
                id={product.id}
              />
            </div>
            <div className="p-4 ">
              <div className="flex justify-between items-center text-center">
                <h3 className="text-lg font-medium ">{product.name}</h3>
              </div>
              <div className="flex justify-between items-center">
                <div className="mt-2">{renderStars(product.rating || 0)}</div>
                <p className=" font-semibold">
                  {product.price -
                    product.price * (product.discountPercentage / 100)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
