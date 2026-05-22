"use client";
import { useRef, useState, useEffect } from "react";
import { IconX, IconMaximize, IconMinimize } from "@tabler/icons-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const VideoModal = ({ videoKey, onClose }: { videoKey: string | null; onClose: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (videoKey) {
      setMounted(true);
    }
  }, [videoKey]);

  useGSAP(() => {
    if (videoKey && overlayRef.current && modalRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(modalRef.current, 
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [videoKey]);

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setMounted(false);
        onClose();
      }
    });
    if (modalRef.current) {
      tl.to(modalRef.current, { scale: 0.9, opacity: 0, y: 20, duration: 0.3, ease: "power2.in" });
    }
    if (overlayRef.current) {
      tl.to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.2");
    }
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!videoKey && !mounted) return null;

  return (
    <div
      ref={overlayRef}
      className='fixed inset-0 z-100 flex items-center justify-center bg-black/20 backdrop-blur-[20px] p-4 md:p-10'
      onClick={handleClose}
      style={{ opacity: 0 }}
    >
      <div
        ref={modalRef}
        className='relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black'
        onClick={(e) => e.stopPropagation()}
        style={{ opacity: 0, transform: 'scale(0.9) translateY(20px)' }}
      >
        {/* Header controls  */}
        <div className='absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 bg-linear-to-b from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300'>
          <h4 className='text-white font-montserrat font-medium'>Project Showcase</h4>
          <div className='flex gap-2'>
            <button
              onClick={toggleFullscreen}
              className='text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full'
            >
              {isFullscreen ? <IconMinimize className='size-5' /> : <IconMaximize className='size-5' />}
            </button>
            <button
              onClick={handleClose}
              className='text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full'
            >
              <IconX className='size-5' />
            </button>
          </div>
        </div>

        <video ref={videoRef} src={videoKey || ""} autoPlay controls className='w-full h-full object-contain' onEnded={handleClose} />
      </div>
    </div>
  );
};

export default VideoModal;
