"use client";

import { cn } from "@/lib/cn";
import React, { CSSProperties, useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MagicCardProps {
  children?: React.ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
  delay?: number;
  variants?: any;
  isInView?: boolean;
  duration?: number;
  style?: CSSProperties;
  rotate?: any;
  scale?: any;
}

export function MagicCard({
  children,
  className,
  gradientSize = 250,
  gradientColor = "#9557FD",
  gradientOpacity = 0.8,
  gradientFrom = "#e81cff",
  gradientTo = "#40c9ff",
  delay = 2,
  isInView = true,
  duration = 0.5,
  style,
  rotate,
  scale,
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const gradientRef1 = useRef<HTMLDivElement>(null);
  const gradientRef2 = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: cardRef });

  const updateMousePosition = contextSafe((e: MouseEvent) => {
    if (cardRef.current) {
      const { left, top } = cardRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      gsap.to([gradientRef1.current, gradientRef2.current], {
        "--x": `${x}px`,
        "--y": `${y}px`,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => updateMousePosition(e);
    const handleMouseEnter = () => {
      gsap.to([gradientRef1.current, gradientRef2.current], {
        opacity: 1,
        duration: 0.3,
      });
    };
    const handleMouseLeave = () => {
      gsap.to([gradientRef1.current, gradientRef2.current], {
        opacity: 0,
        duration: 0.3,
      });
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [updateMousePosition]);

  useGSAP(() => {
    if (isInView) {
      gsap.from(cardRef.current, {
        rotate: rotate || 0,
        scale: scale || 0.9,
        opacity: 0,
        duration: duration,
        delay: delay,
        ease: "power2.out",
      });
    }
  }, [isInView, rotate, scale, duration, delay]);

  return (
    <div
      ref={cardRef}
      style={{ ...style }}
      className={cn("group relative rounded-[inherit]", className)}
    >
      <div
        ref={gradientRef1}
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-border opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${gradientSize}px circle at var(--x, -${gradientSize}px) var(--y, -${gradientSize}px), ${gradientFrom}, ${gradientTo}, transparent 100%)`,
        } as any}
      />
      <div className="absolute inset-px rounded-[inherit] bg-background" />
      <div
        ref={gradientRef2}
        className="pointer-events-none absolute inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${gradientSize}px circle at var(--x, -${gradientSize}px) var(--y, -${gradientSize}px), ${gradientColor}, transparent 100%)`,
          opacity: gradientOpacity,
        } as any}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
