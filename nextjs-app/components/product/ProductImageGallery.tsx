"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/utils";

type ProductImageGalleryProps = {
  mainImage: any;
  additionalImages?: any[];
  productName: string;
};

export default function ProductImageGallery({
  mainImage,
  additionalImages = [],
  productName,
}: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Combine main image with additional images
  const allImages = [mainImage, ...(additionalImages || [])].filter(Boolean);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  if (!mainImage?.asset?._ref) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No image available</p>
      </div>
    );
  }

  const currentImage = allImages[currentImageIndex];

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div
        className={cn(
          "relative aspect-square bg-gray-100 rounded-lg overflow-hidden",
          isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
        )}
        onClick={toggleZoom}
      >
        <Image
          src={
            urlForImage(currentImage)
              ?.width(isZoomed ? 1200 : 600)
              .height(isZoomed ? 1200 : 600)
              .url() as string
          }
          alt={productName}
          fill
          priority
          className={cn(
            "object-cover transition-transform duration-500",
            isZoomed ? "scale-150" : "scale-100"
          )}
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Zoom icon */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white/90"
          onClick={(e) => {
            e.stopPropagation();
            toggleZoom();
          }}
        >
          <ZoomIn className="h-4 w-4" />
          <span className="sr-only">Zoom image</span>
        </Button>

        {/* Navigation arrows (only show if there are multiple images) */}
        {allImages.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next image</span>
            </Button>
          </>
        )}
      </div>

      {/* Thumbnail navigation */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allImages.map((image, index) => (
            <button
              key={index}
              className={cn(
                "relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden border-2",
                index === currentImageIndex
                  ? "border-indigo-600"
                  : "border-transparent hover:border-gray-300"
              )}
              onClick={() => setCurrentImageIndex(index)}
            >
              <Image
                src={
                  urlForImage(image)
                    ?.width(80)
                    .height(80)
                    .url() as string
                }
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
