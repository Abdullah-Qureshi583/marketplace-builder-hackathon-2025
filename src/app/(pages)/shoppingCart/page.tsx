import Right from "./components/Right";
import ShoppingCartLeft from "./components/ShoppingCartLeft";

export default function ShoppingCart() {
  

  return (
    <div className="container mx-auto p-4 max-w-[1180px] flex flex-col md:flex-row gap-8 ">
      {/* Cart Items */}
      <ShoppingCartLeft  />

      {/* Cart Totals */}
      <div className="flex-shrink-0">
        <Right />
      </div>
    </div>
  );
}
