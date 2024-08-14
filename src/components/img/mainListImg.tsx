import React from "react";
import Image from "next/image";
import { urlLink } from "../../utility/interface/urlLink";

interface ImageItemProps {
  image: urlLink;
  onLinkHandler: (url: string, lat: string, lon: string) => void;
}

const ImageItem = React.memo(({ image, onLinkHandler }: ImageItemProps) => {
  return (
    <div
      onClick={() => onLinkHandler(image.name, image.lat, image.lon)}
      className="flex flex-col justify-center items-center cursor-pointer"
    >
      <Image
        src={image.src}
        alt={image.name}
        width={200}
        height={200}
        className="rounded-3xl object-cover w-40 h-40"
        priority
      />
      <div className="my-6 text-xl flex items-center">
        {image.name}
        <span className="text-gray-400 text-sm ml-2">({image.country})</span>
      </div>
    </div>
  );
});

ImageItem.displayName = "ImageItem";

export default ImageItem;
