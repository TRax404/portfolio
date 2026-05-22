"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {
  text: string;
  onClick?: () => void;
  url?: string;
}

const ShineButton: React.FC<Props> = ({ text, onClick, url }) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: buttonRef });

  const onMouseEnter = contextSafe(() => {
    gsap.to(buttonRef.current, {
      scale: 1.05,
      backgroundPosition: "100% 0",
      duration: 0.5,
      ease: "power2.out",
    });
  });

  const onMouseLeave = contextSafe(() => {
    gsap.to(buttonRef.current, {
      scale: 1,
      backgroundPosition: "0% 0",
      duration: 0.5,
      ease: "power2.out",
    });
  });

  const onMouseDown = contextSafe(() => {
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
    });
  });

  const onMouseUp = contextSafe(() => {
    gsap.to(buttonRef.current, {
      scale: 1.05,
      duration: 0.1,
      ease: "power2.out",
    });
  });

  return (
    <div
      ref={buttonRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      className="inline-flex h-10 md:h-11 items-center justify-center px-5 rounded-lg
                 bg-gradient-to-r from-purple-700 to-teal-700 bg-[length:200%_100%]
                 text-white font-medium uppercase transition-all duration-500
                 focus:outline-none shadow-lg cursor-pointer"
    >
      <Link
        href={url || "#"}
        target={url ? "_blank" : undefined}
        onClick={onClick}
        className="w-full h-full flex items-center justify-center"
      >
        {text}
      </Link>
    </div>
  );
};

export default ShineButton;
