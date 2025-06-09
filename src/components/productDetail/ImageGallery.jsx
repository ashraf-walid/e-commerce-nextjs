import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ImageGallery({ images, productName }) {
  const [displayImage, setDisplayImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (images?.length > 0) {
      setDisplayImage(images[0]);
    }
  }, [images]);

  return (
    <div className="flex gap-x-8 sticky top-24 self-start">
      {/* Thumbnails */}
      <div className="self-start">
        <div className="bg-white p-4 max-sm:p-2 rounded-xl shadow-sm border border-gray-100 space-y-3">
          {images?.map((imgUrl, i) => (
            <div
              key={i}
              className={`relative rounded-lg overflow-hidden ${
                displayImage === imgUrl ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <Image
                src={imgUrl}
                onClick={() => setDisplayImage(imgUrl)}
                className="object-cover cursor-pointer hover:opacity-80 transition-opacity"
                alt={`${productName} thumbnail ${i + 1}`}
                width={64}
                height={64}
                sizes="(max-width: 640px) 40px, 64px"
                priority={i === 0}
              />
              {displayImage === imgUrl && (
                <div className="absolute inset-0 bg-blue-500/10" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 self-start">
        <div 
          className="relative bg-white rounded-xl p-8 shadow-sm border border-gray-100"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
        >
          {displayImage ? (
            <div className="relative w-full max-w-xl mx-auto aspect-square">
              <Image
                src={displayImage}
                alt={productName}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-contain rounded-lg transition-all duration-300 ${
                  isZoomed ? 'scale-105 shadow-xl' : ''
                }`}
                priority
              />
            </div>
          ) : (
            <div className="w-full max-w-xl mx-auto aspect-square bg-gray-100 rounded-lg animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
}
