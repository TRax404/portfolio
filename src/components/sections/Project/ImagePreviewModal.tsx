"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconChevronLeft, IconChevronRight, IconMaximize, IconMinimize, IconDownload } from "@tabler/icons-react";
import Image from "next/image";

interface ImagePreviewModalProps {
  images: string[] | undefined;
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
}

const ImagePreviewModal = ({ images, isOpen, onClose, projectName }: ImagePreviewModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setCurrentIndex(0);
    } else {
      document.body.style.overflow = "unset";
      setIsZoomed(false);
    }
  }, [isOpen]);

  if (!images || images.length === 0) return null;

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl"
          onClick={onClose}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(3,232,244,0.1),transparent_70%)]" />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-[210] p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 hover:rotate-90"
          >
            <IconX size={24} />
          </button>

          {/* Controls Overlay */}
          <div className="absolute top-6 left-6 z-[210] flex items-center gap-4">
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-white font-montserrat font-bold tracking-wider text-xs uppercase">
                {projectName || "Gallery"}
              </span>
              <span className="ml-3 text-white/40 font-mono text-xs">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
            
            <div className="flex gap-2">
               <button 
                onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all"
               >
                {isZoomed ? <IconMinimize size={20} /> : <IconMaximize size={20} />}
              </button>
            </div>
          </div>

          {/* Main Image Container */}
          <div 
            className="relative w-full h-full flex items-center justify-center p-4 md:p-12 lg:p-20"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.4 }
                }}
                className={`relative w-full h-full flex items-center justify-center ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <div className={`relative transition-all duration-500 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden border border-white/5 ${isZoomed ? 'w-full h-full' : 'max-w-full max-h-full aspect-video'}`}>
                  <Image
                    src={images[currentIndex]}
                    alt={`Preview ${currentIndex + 1}`}
                    fill
                    className={`object-contain transition-transform duration-500 ${isZoomed ? 'scale-110' : 'scale-100'}`}
                    priority
                    unoptimized
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 md:left-8 p-4 rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <IconChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 md:right-8 p-4 rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <IconChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Thumbnails list at bottom */}
          <div className="absolute bottom-8 left-0 right-0 z-[210] flex justify-center gap-3 px-4">
             <div className="flex gap-2 p-2 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl max-w-full overflow-x-auto no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setDirection(idx > currentIndex ? 1 : -1); setCurrentIndex(idx); }}
                    className={`relative w-16 h-10 rounded-lg overflow-hidden border-2 transition-all duration-300 shrink-0 ${idx === currentIndex ? 'border-[#03e8f4] scale-110' : 'border-transparent opacity-40 hover:opacity-100'}`}
                  >
                    <Image src={img} alt="" fill className="object-cover" unoptimized />
                  </button>
                ))}
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImagePreviewModal;
