"use client";

import { MagicCard } from "@/components/ui/MagicCard";
import { NumberTicker } from "@/components/ui/NumberTicker";
import { cn } from "@/lib/cn";
import { IconTrophy, IconCode, IconTimeline } from "@tabler/icons-react";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/global/Container";

const Achievements = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  const items = [
    {
      title: "Years of Experience",
      value: 2,
      icon: <IconTimeline className='w-10 h-10 text-sky-400' />,
      description: "Delivering high-quality software solutions since 2024.",
      initial: { rotate: -15, x: -50, scale: 0.8 },
    },
    {
      title: "Projects Completed",
      value: 20,
      icon: <IconCode className='w-10 h-10 text-sky-400' />,
      description: "Successfully architected and deployed production-grade apps.",
      initial: { rotate: 0, x: 0, scale: 0.8 },
    },
    {
      title: "Achievements",
      value: 5,
      icon: <IconTrophy className='w-10 h-10 text-sky-400' />,
      description: "Recognized for excellence in backend and cloud architecture.",
      initial: { rotate: 15, x: 50, scale: 0.8 },
    },
  ];

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".achv-card");

      cards.forEach((card, index) => {
        const init = (items[index] as any)?.initial || { rotate: 0, x: 0, scale: 1 };
        gsap.set(card, { ...init, opacity: 0 });

        gsap.to(card, {
          rotate: 0,
          x: 0,
          scale: 1,
          opacity: 1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-32 overflow-hidden bg-[#010610]">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/10 rounded-full blur-[120px]" />
      </div>

      <Container>
        <div ref={ref} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-stretch'>
          {items.map((item, index) => (
            <MagicCard
              key={index}
              className={cn(`achv-card group h-full transition-all cursor-pointer duration-500 ease-out rounded-2xl`)}
              gradientColor="rgba(56, 189, 248, 0.2)"
              gradientSize={300}
            >
              <div className='relative h-full bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 flex flex-col items-center text-center group-hover:bg-slate-800/60 transition-colors duration-500 rounded-2xl'>
                {/* Icon Circle */}
                <div className='mb-8 relative'>
                  <div className="absolute inset-0 bg-sky-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className='relative w-20 h-20 rounded-2xl bg-slate-800 border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500'>
                    {item.icon}
                  </div>
                </div>

                {/* Number */}
                <h3 className='text-slate-100 font-black font-montserrat text-5xl md:text-6xl mb-2 flex items-center justify-center gap-1'>
                  <NumberTicker value={item.value} />
                  <span className="text-sky-500">+</span>
                </h3>

                {/* Title */}
                <p className='text-sky-100/90 font-bold font-montserrat uppercase tracking-[0.15em] text-sm mb-4'>
                  {item.title}
                </p>

                {/* Description */}
                <p className="text-slate-400 font-poppins text-xs leading-relaxed max-w-[200px] mx-auto opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {item.description}
                </p>

                {/* Bottom Bar */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-sky-500/50 rounded-full transition-all duration-500 group-hover:w-1/2" />
              </div>
            </MagicCard>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Achievements;
