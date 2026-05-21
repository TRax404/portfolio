"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  Variants,
} from "framer-motion";
import {
  IconX,
  IconChevronLeft,
  IconChevronRight,
  IconMaximize,
  IconMinimize,
  IconPhoto,
  IconLayoutGrid,
} from "@tabler/icons-react";
import Image from "next/image";

interface ImagePreviewModalProps {
  images: string[] | undefined;
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
}

const smoothEase: [number, number, number, number] = [
  0.16,
  1,
  0.3,
  1,
];

const ImagePreviewModal = ({
  images,
  isOpen,
  onClose,
  projectName,
}: ImagePreviewModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setCurrentIndex(0);
    } else {
      document.body.style.overflow = "unset";
      setIsZoomed(false);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
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

  // Modal Variants
  const modalVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      backdropFilter: "blur(0px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      backdropFilter: "blur(24px)",
      transition: {
        duration: 0.5,
        ease: smoothEase,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      backdropFilter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  // Slide Variants
  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "20%" : "-20%",
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 15 : -15,
      filter: "blur(10px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: "blur(0px)",
      transition: {
        x: {
          type: "spring",
          stiffness: 260,
          damping: 28,
        },
        opacity: {
          duration: 0.4,
        },
        scale: {
          duration: 0.5,
          ease: "easeOut",
        },
        rotateY: {
          duration: 0.6,
        },
      },
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "20%" : "-20%",
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 15 : -15,
      filter: "blur(10px)",
      transition: {
        duration: 0.4,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#020617]/95"
          onClick={onClose}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-cyan-500/20 blur-[120px]"
            />

            <motion.div
              animate={{
                x: [0, -80, 0],
                y: [0, 100, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px]"
            />
          </div>

          {/* Header */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.6,
              ease: smoothEase,
            }}
            className="absolute top-0 left-0 right-0 h-24 px-6 md:px-12 flex items-center justify-between z-[250] bg-gradient-to-b from-black/60 to-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] flex items-center gap-2">
                  <IconPhoto
                    size={14}
                    className="text-cyan-400"
                  />
                  Project Gallery
                </h4>

                <p className="text-slate-400 text-[10px] font-medium mt-1 uppercase tracking-widest">
                  {projectName}
                </p>
              </div>

              <div className="h-8 w-px bg-white/10 hidden md:block" />

              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="text-cyan-400 font-mono text-[10px] font-bold">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>

                <span className="text-white/20 text-[10px]">
                  /
                </span>

                <span className="text-white/40 font-mono text-[10px]">
                  {String(images.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setShowThumbnails(!showThumbnails)
                }
                className={`p-2.5 rounded-xl border transition-all duration-300 ${showThumbnails
                    ? "bg-cyan-500/20 border-cyan-500/30 text-cyan-400"
                    : "bg-white/5 border-white/10 text-white/50 hover:text-white"
                  }`}
              >
                <IconLayoutGrid size={20} />
              </button>

              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className={`p-2.5 rounded-xl border transition-all duration-300 ${isZoomed
                    ? "bg-indigo-500/20 border-indigo-500/30 text-indigo-400"
                    : "bg-white/5 border-white/10 text-white/50 hover:text-white"
                  }`}
              >
                {isZoomed ? (
                  <IconMinimize size={20} />
                ) : (
                  <IconMaximize size={20} />
                )}
              </button>

              <div className="w-px h-8 bg-white/10 mx-2" />

              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-500 hover:rotate-90 shadow-2xl"
              >
                <IconX size={22} />
              </button>
            </div>
          </motion.div>

          {/* Main Content */}
          <div
            className="relative w-full flex-1 flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ perspective: "1500px" }}
          >
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="wait"
            >
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={`relative flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isZoomed
                    ? "w-full h-full"
                    : "w-[85vw] h-[65vh] md:h-[75vh]"
                  }`}
              >
                <div
                  className={`relative w-full h-full rounded-3xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05)] ${isZoomed
                      ? "cursor-zoom-out"
                      : "cursor-zoom-in"
                    }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <Image
                    src={images[currentIndex]}
                    alt={`Preview ${currentIndex + 1}`}
                    fill
                    priority
                    unoptimized
                    className={`object-contain transition-transform duration-700 ease-out ${isZoomed
                        ? "scale-110"
                        : "scale-100"
                      }`}
                  />

                  <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]" />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <AnimatePresence>
              {!isZoomed && (
                <>
                  <motion.button
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="absolute left-6 md:left-10 p-6 rounded-full bg-black/40 border border-white/5 text-white/30 hover:text-cyan-400 hover:bg-black/60 hover:border-cyan-500/30 transition-all group backdrop-blur-xl z-[260]"
                  >
                    <IconChevronLeft
                      size={36}
                      className="group-hover:-translate-x-1 transition-transform"
                    />
                  </motion.button>

                  <motion.button
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-6 md:right-10 p-6 rounded-full bg-black/40 border border-white/5 text-white/30 hover:text-cyan-400 hover:bg-black/60 hover:border-cyan-500/30 transition-all group backdrop-blur-xl z-[260]"
                  >
                    <IconChevronRight
                      size={36}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </motion.button>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Thumbnails */}
          <AnimatePresence>
            {showThumbnails && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{
                  duration: 0.6,
                  ease: smoothEase,
                }}
                className="w-full pb-10 pt-4 z-[250] flex justify-center px-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex gap-4 p-4 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl max-w-full overflow-x-auto no-scrollbar">
                  {images.map((img, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDirection(
                          idx > currentIndex ? 1 : -1
                        );
                        setCurrentIndex(idx);
                      }}
                      className={`relative w-24 h-14 rounded-2xl overflow-hidden border-2 transition-all duration-500 shrink-0 ${idx === currentIndex
                          ? "border-cyan-500 scale-110 shadow-[0_0_25px_rgba(6,182,212,0.4)]"
                          : "border-transparent opacity-40 hover:opacity-100"
                        }`}
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        unoptimized
                        className="object-cover"
                      />

                      {idx === currentIndex && (
                        <div className="absolute inset-0 bg-cyan-500/10 pointer-events-none" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentIndex + 1) / images.length) * 100
                  }%`,
              }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImagePreviewModal;