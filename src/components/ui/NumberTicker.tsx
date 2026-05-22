"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
}: {
  value: number;
  direction?: "up" | "down";
  className?: string;
  delay?: number; // delay in seconds
  decimalPlaces?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const startValue = direction === "down" ? value : 0;
    const endValue = direction === "down" ? 0 : value;

    const obj = { count: startValue };

    gsap.to(obj, {
      count: endValue,
      duration: 2,
      delay: delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        once: true,
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US", {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          }).format(Number(obj.count.toFixed(decimalPlaces)));
        }
      },
    });
  }, { scope: ref });

  return (
    <span
      className={cn(className)} // Apply custom styles via className
      ref={ref} // Attach the ref to the span
    />
  );
}
