"use client";
import { CartProvider } from "use-shopping-cart";

const ShoppingCartProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_KEY as string}
      successUrl="stripe.com"
      cancelUrl="twitter.com/dayhaysoos"
      currency="USD"
      language="en-US"
      shouldPersist={true}
      allowedCountries={["US", "GB", "CA"]}
      billingAddressCollection={true}
    >
      {children}
    </CartProvider>
  );
};

export default ShoppingCartProvider;
