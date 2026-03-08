import { useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductImage from "@/components/ProductImage";

interface ProductImageGalleryProps {
  images: string[];
  name: string;
}

const ProductImageGallery = ({ images, name }: ProductImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
      setSelectedIndex(index);
    },
    [emblaApi]
  );

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Sync selected index on scroll
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Attach listener
  useState(() => {
    if (emblaApi) emblaApi.on("select", onSelect);
  });

  // Single image — no carousel needed
  if (images.length <= 1) {
    return (
      <div className="aspect-square overflow-hidden rounded-md bg-secondary">
        <ProductImage
          src={images[0]}
          alt={name}
          className="h-full w-full object-contain p-4"
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main carousel */}
      <div className="relative aspect-square overflow-hidden rounded-md bg-secondary">
        <div className="h-full" ref={emblaRef}>
          <div className="flex h-full">
            {images.map((src, i) => (
              <div key={i} className="min-w-0 flex-[0_0_100%]">
                <ProductImage
                  src={src}
                  alt={`${name} - Image ${i + 1}`}
                  className="h-full w-full object-contain p-4"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows — hidden on mobile, swipe instead */}
        <button
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-background/80 p-2 shadow-soft backdrop-blur-sm transition-colors hover:bg-background md:flex"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-background/80 p-2 shadow-soft backdrop-blur-sm transition-colors hover:bg-background md:flex"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5 text-foreground" />
        </button>

        {/* Dot indicators — mobile */}
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 md:hidden">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-2 w-2 rounded-full transition-all ${
                i === selectedIndex
                  ? "bg-primary w-4"
                  : "bg-foreground/30"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail strip — desktop */}
      <div className="hidden gap-2 md:flex">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-20 w-20 shrink-0 overflow-hidden rounded border-2 bg-secondary transition-all ${
              i === selectedIndex
                ? "border-primary"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <ProductImage
              src={src}
              alt={`${name} thumbnail ${i + 1}`}
              className="h-full w-full object-contain p-1"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
