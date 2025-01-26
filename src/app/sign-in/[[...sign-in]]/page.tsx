"use client";
import { Button } from "@/components/ui/button";
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex relative justify-center items-center flex-col w-fit text-center">
        <SignIn
          appearance={{
            layout: {
              socialButtonsPlacement: "bottom",
            },
          }}
        />
        <Button
          variant="outline"
          className="w-full"
          onClick={() => router.back()}
        >
          Back to Shop
        </Button>
      </div>
    </div>
  );
}
