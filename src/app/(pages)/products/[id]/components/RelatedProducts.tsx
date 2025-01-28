"use client";
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
  const products = [
    {
      id: 1,
      title: "Mens Fashion Wear",
      price: "$43.00",
      image: "/images/productD/related/one.png", // Replace with your image URL
      rating: 5,
    },
    {
      id: 2,
      title: "Women's Fashion",
      price: "$67.00",
      image: "/images/productD/related/two.png", // Replace with your image URL
      rating: 5,
    },
    {
      id: 3,
      title: "Wok Dummy Fashion",
      price: "$62.00",
      image: "/images/productD/related/three.png", // Replace with your image URL
      rating: 4.5,
    },
    {
      id: 4,
      title: "Top Wall Digital Clock",
      price: "$51.00",
      image: "/images/productD/related/four.png", // Replace with your image URL
      rating: 4,
    },
  ];

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
            className=" rounded-lg bg-lightPurple overflow-hidden "
          >
            <div className="w-[260px] h-[300px] relative flex justify-center items-center bg-white ">
              <Image
                width={270}
                height={340}
                src={urlFor(product.image).url()}
                alt={`${product.name} Image`}
                className="w-full hover:scale-95 object-cover"
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
