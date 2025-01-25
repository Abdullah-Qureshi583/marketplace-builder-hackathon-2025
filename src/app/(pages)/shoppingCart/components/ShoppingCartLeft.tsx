// "use client";
// import PinkButton from "@/components/project/PinkButton";
// import { urlFor } from "@/sanity/lib/image";
// import { CartItemProps } from "@/types/types";
// import Image from "next/image";
// import React, { useState } from "react";
// import { FiDelete } from "react-icons/fi";
// import { MdDeleteSweep } from "react-icons/md";
// import { useShoppingCart } from "use-shopping-cart";

// const ShoppingCartLeft = () => {
//   const { cartDetails, removeItem, totalPrice, clearCart, incrementItem } =
//     useShoppingCart();

//   const [quantity, setQuantity] = useState<number>(1);
//   return (
//     <div className="flex-grow">
//       <div className="overflow-x-auto">
//         <table className="w-full text-left text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-4">Product</th>
//               <th className="p-4">Price</th>
//               <th className="p-4">Quantity</th>
//               <th className="p-4">Total</th>
//               <th className="p-4">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* {items.map((item) => ( */}
//             {Object.values(cartDetails || {}).map((item) => (
//               <tr key={item?.id} className="border-b">
//                 <td className="p-4  flex items-center space-x-4">
//                   <div className="h-24 w-24 bg-lightPurple rounded-md aspect-square flex justify-center items-center ">
//                     <Image
//                       width={96}
//                       height={96}
//                       src={urlFor(item?.image as any).url()}
//                       alt={`${item?.name} image`}
//                       className=" rounded object-cover"
//                     />
//                   </div>
//                   <div className=" mr-12">
//                     <h3 className="text-lg text-nowrap">{item?.name}</h3>
//                     <p className="text-subText text-nowrap text-sm max-w-[200px] text-ellipsis overflow-hidden">
//                       {item?.description}
//                     </p>
//                     {/* <p className="text-subText text-nowrap text-sm">
//                       Color: {item.color} | Size: {item.size}
//                     </p> */}
//                   </div>
//                 </td>
//                 <td className="p-4">${item?.price}</td>
//                 <td className="p-4">
//                   <input
//                     type="number"
//                     value={quantity}
//                     onChange={(e: any) => {
//                       setQuantity(e.target.value);
//                     }}
//                     className="border border-gray-300 rounded w-16 text-center"
//                   />
//                 </td>
//                 <td className="p-4">${item?.price * quantity}</td>
//                 <td>
//                   <div
//                     onClick={() => removeItem(item?.id)}
//                     className="flex cursor-pointer justify-center items-center"
//                   >
//                     <MdDeleteSweep size={24} />
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="flex justify-between mt-4">
//         <PinkButton>Update Cart {totalPrice} </PinkButton>

//         <PinkButton>Clear Cart</PinkButton>
//       </div>
//     </div>
//   );
// };

// export default ShoppingCartLeft;

"use client";
import PinkButton from "@/components/project/PinkButton";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { MdDeleteSweep } from "react-icons/md";
import { useShoppingCart } from "use-shopping-cart";

const ShoppingCartLeft = () => {
  const router = useRouter();
  const {
    cartDetails,
    removeItem,
    totalPrice,
    setItemQuantity,
    clearCart,
    cartCount,
  } = useShoppingCart();

  return (
    <div className="flex-grow">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Price</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Total</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(cartDetails || {}).map((item) => (
              <tr key={item?.id} className="border-b">
                <td className="p-4 flex items-center space-x-4">
                  <div className="h-24 w-24 bg-lightPurple rounded-md aspect-square flex justify-center items-center">
                    <Image
                      width={96}
                      height={96}
                      src={urlFor(item?.image as any).url()}
                      alt={`${item?.name} image`}
                      className="rounded object-cover"
                    />
                  </div>
                  <div className="mr-12">
                    <h3 className="text-lg text-nowrap">{item?.name}</h3>
                    <p className="text-subText text-nowrap text-sm max-w-[200px] text-ellipsis overflow-hidden">
                      {item?.description}
                    </p>
                  </div>
                </td>
                <td className="p-4">${item?.price}</td>
                <td className="p-4">
                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    onChange={(e) =>
                      setItemQuantity(item.id, Number(e.target.value))
                    }
                    className="border border-gray-300 rounded w-16 text-center"
                  />
                </td>
                <td className="p-4">${item?.price * item.quantity}</td>
                <td>
                  <div
                    onClick={() => removeItem(item?.id)}
                    className="flex cursor-pointer justify-center items-center"
                  >
                    <MdDeleteSweep size={24} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <div onClick={() => router.push(`/products/`)}>
          <PinkButton>Update {totalPrice} Cart</PinkButton>
        </div>
        {(cartCount as number) > 0 && (
          <div className="" onClick={() => clearCart()}>
            <PinkButton>Clear Cart</PinkButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartLeft;
