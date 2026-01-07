import React, { PropsWithChildren } from "react";
import Image from "next/image";

export const Header: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <header className="relative w-full">
      <Image
        src="https://res.cloudinary.com/dzuegonso/image/upload/f_auto,q_auto/IMG_8673-min_mqfpnq.jpg"
        alt="Header background"
        width={1024}
        height={868}
        className="w-full h-150 object-cover object-[5%_25%]"
        priority
      />
      <div className="absolute inset-0 backdrop-blur-[2px] bg-black/50 bg-linear-to-b from-transparent via-transparent to-gray-950" />

      <div className="absolute inset-0">
        {children}
      </div>
    </header>
  );
};
