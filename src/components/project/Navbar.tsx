"use client";
import React, { useState } from "react";
import { FaBars, FaPhoneAlt, FaShoppingCart } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { CiHeart, CiSearch } from "react-icons/ci";
import Link from "next/link";
import SearchBar from "./SearchBar";
type LinkType = {
  title: string;
  href: string;
};
const links: LinkType[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Products",
    href: "/products",
  },
  
  {
    title: "About",
    href: "/aboutUs",
  },
  {
    title: "Contact",
    href: "/contactUs",
  },
  {
    title: "FAQ",
    href: "/faq",
  },
  {
    title: "My Account",
    href: "/login",
  },
];

const Navbar = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <>
      <div className="sticky top-0 z-10 bg-white">
        <div className="container mx-auto max-w-[1180px] flex items-center justify-between px-4 py-2 md:py-4">
          <div className="flex items-center gap-x-8 lg:gap-x-24">
            <div className="text-[2.1rem] font-bold">
              <Link href="/">Hekto</Link>
            </div>
            <div className="hidden md:flex ml-4 gap-x-4 lg:gap-x-8">
              {links.slice(0, -1).map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="hover:text-pPink hover:scale-x-105 hover:font-semibold duration-300"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger>
                <FaBars className="size-5" />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>
                    <div className="text-[2.1rem] font-bold">Hekto</div>
                  </SheetTitle>
                  <SheetDescription>
                    <div className="flex flex-col mt-3 gap-y-4 lg:gap-x-8">
                      {links.map((item, index) => (
                        <Link key={index} href={item.href} onClick={closeSheet}>
                          {item.title}
                        </Link>
                      ))}

                      <Link
                        href="/"
                        onClick={closeSheet}
                        className="flex items-center justify-center"
                      >
                        <CiHeart className="mr-2" />
                        Wishlist
                      </Link>
                      <Link
                        href="/shoppingCart"
                        onClick={closeSheet}
                        className="flex items-center justify-center"
                      >
                        <FaShoppingCart className="mr-2" />
                        Cart
                      </Link>
                      <div className="flex justify-center items-center">
                        <FaPhoneAlt className="mr-2" />
                        <span>(12345)67890</span>
                      </div>
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden md:block">
            <SearchBar />
          </div>
        </div>
      </div>

      <div className="md:hidden container mx-auto px-2 ">
        <SearchBar />
      </div>
    </>
  );
};

export default Navbar;
