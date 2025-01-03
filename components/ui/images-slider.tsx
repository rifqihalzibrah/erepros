"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, useCallback } from "react";

interface ImagesSliderCustomProps {
  images: string[];
  children: React.ReactNode;
  overlay?: React.ReactNode;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
}

export const ImagesSliderCustom: React.FC<ImagesSliderCustomProps> = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const loadImages = useCallback(() => {
    const loadPromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image;
        img.onload = () => resolve(image);
        img.onerror = reject;
      });
    });

    Promise.all(loadPromises)
      .then((resolvedImages) => {
        setLoadedImages(resolvedImages as string[]);
      })
      .catch((error) => console.error("Failed to load images", error));
  }, [images]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    let interval: number | undefined;
    if (autoplay) {
      interval = window.setInterval(() => {
        handleNext();
      }, 5000);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (interval !== undefined) clearInterval(interval);
    };
  }, [autoplay, handleNext, handlePrevious]);

  const slideVariants = {
    initial: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1.0],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const areImagesLoaded = loadedImages.length > 0;

  return (
    <div
      className={cn(
        "overflow-hidden h-full w-full relative flex items-center justify-center",
        className
      )}
      style={{
        perspective: "1000px",
      }}
    >
      {areImagesLoaded && children}
      {areImagesLoaded && overlay && (
        <div className={cn("absolute inset-0 bg-black/60 z-40", overlayClassName)} />
      )}

      {/* Left Arrow */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 z-50 p-2 text-white bg-black/50 rounded-full hover:bg-black/70"
      >
        &#10094;
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-4 z-50 p-2 text-white bg-black/50 rounded-full hover:bg-black/70"
      >
        &#10095;
      </button>

      {areImagesLoaded && (
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={loadedImages[currentIndex]}
            initial="initial"
            animate="visible"
            exit="exit"
            variants={slideVariants}
            className="image h-full w-full absolute inset-0 object-cover object-center"
          />
        </AnimatePresence>
      )}
    </div>
  );
};
