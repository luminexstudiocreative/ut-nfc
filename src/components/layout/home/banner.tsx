import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="w-full h-80 xl:h-[300px] relative">
      <Image
        src="https://images.pexels.com/photos/237997/pexels-photo-237997.jpeg"
        alt="banner"
        width={1920}
        height={1080}
        className="w-full h-80 xl:h-96 object-cover"
      />

      <div className="absolute -bottom-24 xl:-bottom-32 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-zinc-200 rounded-2xl shadow-lg p-4 px-7 flex items-center gap-5 w-[75vw] 2xl:w-fit">
        <Image
          src="/logo.png"
          alt="AIE"
          width={200}
          height={200}
          className="w-20 h-30 object-contain"
        />
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-zinc-800">
            Universal Tools
          </h1>
          {/* <p className="text-sm text-zinc-600 max-w-sm">
            Reliable fasteners of premium quality fasteners
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Banner;
