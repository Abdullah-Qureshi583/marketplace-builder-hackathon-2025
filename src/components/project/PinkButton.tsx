import React from "react";
import { Button } from "../ui/button";

const PinkButton = ({
  type = "button",
  children,
  wFull,
}: {
  type?: "button" | "submit";
  children: React.ReactNode;
  wFull?: boolean;
}) => {
  return (
    <Button
      type={type}
      className={` text-base bg-pPink hover:bg-pPink/80 ${
        wFull && "w-full"
      }  md:p-6 rounded-sm  md:text-lg`}
    >
      {children}
    </Button>
  );
};

export default PinkButton;
