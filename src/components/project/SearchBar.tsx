"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/products?search=${searchQuery?.toLowerCase().trim()}`);
  };

  return (

    <div className="flex items-center  w-full  ">
      <form
        onSubmit={handleSubmit}
        className="focus-within:border-1 focus-within:border-gray-600 flex overflow-hidden border border-gray-200 rounded-md  w-full"
      >
        <input
          type="text"
          name="search"
          value={searchQuery}
          onChange={handleChange}
          className="p-2 focus:outline-none w-full lg:w-[280px]"
          placeholder="Search..."
        />
        <button
          type="submit"
          className="flex justify-center items-center px-3 bg-pPink"
        >
          <CiSearch className="size-6" fill="white" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
