import DiscountItems from "@/components/project/home/DiscountItems";
import FeaturedProducts from "@/components/project/home/featuredProducts/FeaturedProducts";
import Hero from "@/components/project/home/Hero";
import LatestProducts from "@/components/project/home/latestProducts/LatestProducts";
import TopCategories from "@/components/project/home/TopCategories";
import TrendingProducts from "@/components/project/home/TrendingProducts";
import UniqueFeatures from "@/components/project/home/UniqueFeatures";
import WhatShopexOffer from "@/components/project/home/WhatShopexOffer";

const Home = () => {
  return (
    <>
      <Hero />
      {/* <Login /> */}
      <div className="container mx-auto p-4 max-w-[1180px] ">
        <FeaturedProducts />
        <LatestProducts />
        <WhatShopexOffer title="What Shopex Offer!" />
      </div>
      <UniqueFeatures />
      <div className="container mx-auto p-4 max-w-[1180px] ">
        <TrendingProducts />
        <DiscountItems />
        <TopCategories />
      </div>
    </>
  );
};

export default Home;
