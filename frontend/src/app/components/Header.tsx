import React, { PropsWithChildren } from "react";
import Image from "next/image";

export const Header: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <header className="relative w-full">
      <Image
        src="/walk.JPG"
        alt="Header background"
        width={1920}
        height={1080}
        className="w-full h-auto sm:h-150 object-cover object-[center_25%]"
        priority
      />
      <div className="absolute inset-0 backdrop-blur-[2px] bg-black/50 bg-linear-to-b from-transparent via-transparent to-gray-950" />

      <div className="absolute inset-0">
        {children}
      </div>
    </header>
  );
};
