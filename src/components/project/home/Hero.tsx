import Image from "next/image";
import PinkButton from "../PinkButton";
import Link from "next/link";

export default function Hero() {
  return (
    <main>
      <div className="bg-lightPurple ">
        <div className="md:flex container mx-auto max-w-[1180px] md:px-4 pt-6 md:pt-0 ">
          <div className="  relative -left-12 hidden lg:block">
            <Image
              src="/images/home/hero/bulb.png"
              alt=""
              width={500}
              height={500}
            />
          </div>
          <div className=" relative lg:-left-20 px-4 md:px-0 flex items-center">
            <div className=" ">
              <h6 className="text-pPink font-bold text-sm md:text-base">
                Best Furniture For Your Castle....
              </h6>
              <h1 className="text-3xl md:text-5xl font-bold mt-3">
                New Furniture Collection
                <br />
                Trends in 2025
              </h1>
              <p className="text-subText font-semibold mt-3">
                Explore a range of thoughtfully designed furniture that blends
                comfort with modern aesthetics. Perfect for creating a cozy and
                stylish living space.
              </p>

              <Link href="/products" className="mt-7">
                <PinkButton>Shop Now</PinkButton>
              </Link>
            </div>
          </div>
          <div className="py-9 px-[.8rem]">
            <Image
              src="/images/home/hero/sofa.png"
              alt=""
              width={700}
              height={700}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
