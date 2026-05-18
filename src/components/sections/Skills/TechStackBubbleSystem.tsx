"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "@/components/global/Container";
import LargeTitle from "@/components/global/LargeTitle";
import SectionTitle from "@/components/global/SectionTitle";
import { cn } from "@/lib/cn";
import { TECH_CATEGORIES, TECH_STACK, TechFilter, TechStackItem } from "@/data/techStack";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SIZE_CLASS: Record<TechStackItem["size"], string> = {
  sm: "h-24 w-24 md:h-28 md:w-28",
  md: "h-28 w-28 md:h-36 md:w-36",
  lg: "h-32 w-32 md:h-44 md:w-44",
};

const ICON_CLASS: Record<TechStackItem["size"], string> = {
  sm: "h-8 w-8 md:h-9 md:w-9",
  md: "h-9 w-9 md:h-12 md:w-12",
  lg: "h-11 w-11 md:h-14 md:w-14",
};

const getBubblePosition = (index: number, count: number, width: number, height: number) => {
  const columns = width < 640 ? 3 : width < 1024 ? 4 : 6;
  const rows = Math.max(2, Math.ceil(count / columns));
  const col = index % columns;
  const row = Math.floor(index / columns);
  const cellW = width / columns;
  const cellH = height / rows;
  const waveX = Math.sin(index * 1.91) * cellW * 0.18;
  const waveY = Math.cos(index * 1.37) * cellH * 0.2;

  return {
    x: cellW * col + cellW * 0.5 + waveX,
    y: cellH * row + cellH * 0.5 + waveY,
  };
};

const TechStackBubbleSystem = () => {
  const [activeFilter, setActiveFilter] = useState<TechFilter>("all");
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bubbleRefs = useRef<Array<HTMLDivElement | null>>([]);

  const visibleIds = useMemo(() => {
    return new Set(
      TECH_STACK.filter((item) => activeFilter === "all" || item.category === activeFilter).map((item) => item.id)
    );
  }, [activeFilter]);

  const positionBubbles = useCallback(
    (animate = true) => {
      if (!stageRef.current) return;

      const stageRect = stageRef.current.getBoundingClientRect();
      const visibleItems = TECH_STACK.filter((item) => visibleIds.has(item.id));
      const duration = animate ? 0.9 : 0;
      const isMobile = stageRect.width < 640;

      TECH_STACK.forEach((item, itemIndex) => {
        const bubble = bubbleRefs.current[itemIndex];
        if (!bubble) return;

        const visibleIndex = visibleItems.findIndex((visibleItem) => visibleItem.id === item.id);
        const isVisible = visibleIndex !== -1;
        const core = bubble.querySelector(".tech-bubble-core");

        if (!isVisible) {
          gsap.to(bubble, {
            autoAlpha: 0,
            scale: 0.55,
            filter: "blur(10px)",
            duration: 0.38,
            ease: "power2.in",
            overwrite: "auto",
          });
          if (core) gsap.to(core, { x: 0, y: 0, scale: 1, duration: 0.35, overwrite: "auto" });
          return;
        }

        const { x, y } = getBubblePosition(visibleIndex, visibleItems.length, stageRect.width, stageRect.height);

        gsap.to(bubble, {
          x: x - bubble.offsetWidth / 2,
          y: y - bubble.offsetHeight / 2,
          autoAlpha: 1,
          scale: isMobile ? 0.86 : 1,
          filter: "blur(0px)",
          duration,
          delay: visibleIndex * 0.035,
          ease: "expo.out",
          overwrite: "auto",
        });
      });
    },
    [visibleIds]
  );

  useGSAP(
    () => {
      if (!sectionRef.current || !stageRef.current) return;

      const ctx = gsap.context(() => {
        positionBubbles(false);

        gsap.fromTo(
          ".tech-filter",
          { y: -16, autoAlpha: 0, filter: "blur(8px)" },
          {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.055,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );

        gsap.fromTo(
          ".tech-bubble",
          { y: 40, scale: 0.5, autoAlpha: 0, filter: "blur(16px)" },
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: { each: 0.045, from: "random" },
            ease: "elastic.out(1, 0.72)",
            scrollTrigger: {
              trigger: stageRef.current,
              start: "top 76%",
            },
          }
        );

        bubbleRefs.current.forEach((bubble, index) => {
          if (!bubble) return;

          gsap.to(bubble, {
            x: `+=${gsap.utils.random(-34, 34)}`,
            y: `+=${gsap.utils.random(-26, 26)}`,
            rotation: gsap.utils.random(-4, 4),
            duration: gsap.utils.random(3.6, 6.8),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.05,
          });

          gsap.to(bubble.querySelector(".tech-bubble-halo"), {
            opacity: gsap.utils.random(0.46, 0.82),
            scale: gsap.utils.random(0.88, 1.16),
            duration: gsap.utils.random(1.8, 3.4),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });

        const quickSetters = bubbleRefs.current.map((bubble) => {
          const core = bubble?.querySelector(".tech-bubble-core");
          return core
            ? {
                x: gsap.quickTo(core, "x", { duration: 0.36, ease: "power3.out" }),
                y: gsap.quickTo(core, "y", { duration: 0.36, ease: "power3.out" }),
                scale: gsap.quickTo(core, "scale", { duration: 0.32, ease: "power3.out" }),
              }
            : null;
        });

        const onPointerMove = (event: PointerEvent) => {
          bubbleRefs.current.forEach((bubble, index) => {
            const setters = quickSetters[index];
            if (!bubble || !setters || !visibleIds.has(TECH_STACK[index].id)) return;

            const rect = bubble.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dx = event.clientX - centerX;
            const dy = event.clientY - centerY;
            const distance = Math.hypot(dx, dy);
            const radius = Math.min(190, Math.max(112, rect.width * 1.7));
            const force = Math.max(0, 1 - distance / radius);

            setters.x(dx * force * 0.22);
            setters.y(dy * force * 0.22);
            setters.scale(1 + force * 0.12);

            gsap.to(bubble, {
              boxShadow: `0 0 ${34 + force * 52}px ${TECH_STACK[index].glowColor}`,
              duration: 0.28,
              overwrite: "auto",
            });
          });
        };

        const onPointerLeave = () => {
          quickSetters.forEach((setters, index) => {
            setters?.x(0);
            setters?.y(0);
            setters?.scale(1);
            const bubble = bubbleRefs.current[index];
            if (bubble) {
              gsap.to(bubble, {
                boxShadow: `0 0 30px ${TECH_STACK[index].glowColor}`,
                duration: 0.35,
                overwrite: "auto",
              });
            }
          });
        };

        const onResize = () => positionBubbles(true);

        stageRef.current?.addEventListener("pointermove", onPointerMove);
        stageRef.current?.addEventListener("pointerleave", onPointerLeave);
        window.addEventListener("resize", onResize);

        return () => {
          stageRef.current?.removeEventListener("pointermove", onPointerMove);
          stageRef.current?.removeEventListener("pointerleave", onPointerLeave);
          window.removeEventListener("resize", onResize);
        };
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef, dependencies: [positionBubbles, visibleIds] }
  );

  useGSAP(
    () => {
      positionBubbles(true);
      gsap.fromTo(
        ".tech-bubble-active",
        { scale: 0.88, autoAlpha: 0, filter: "blur(10px)" },
        {
          scale: 1,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 0.72,
          stagger: { each: 0.045, from: "center" },
          ease: "back.out(1.6)",
        }
      );
    },
    { scope: sectionRef, dependencies: [activeFilter] }
  );

  return (
    <section ref={sectionRef} className='relative min-h-screen w-full overflow-hidden bg-[#030711] py-24 md:py-32'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_16%,rgba(56,189,248,0.2),transparent_28%),radial-gradient(circle_at_82%_22%,rgba(250,204,21,0.16),transparent_26%),radial-gradient(circle_at_48%_86%,rgba(168,85,247,0.18),transparent_34%)]' />
      <div className='pointer-events-none absolute inset-0 opacity-[0.13] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-size-[56px_56px]' />
      <div className='pointer-events-none absolute inset-0 opacity-[0.055] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1.2px)] bg-size-[18px_18px]' />
      <div className='pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl' />

      <Container className='relative z-10'>
        <div className='mx-auto mb-9 max-w-3xl text-center md:mb-12'>
          <SectionTitle color='Tech' text='Ecosystem' />
          <LargeTitle title='Skills' />
          <p className='mx-auto mt-4 max-w-2xl font-montserrat text-sm leading-7 text-slate-400 md:text-base'>
            A living stack map with cinematic motion, magnetic bubbles, and category-focused filtering.
          </p>
        </div>

        <div className='tech-filter-wrap sticky top-4 z-30 mx-auto mb-8 flex w-fit max-w-full flex-wrap justify-center gap-2 rounded-2xl border border-white/10 bg-slate-950/55 p-2 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl md:gap-3'>
          {TECH_CATEGORIES.map((category) => {
            const isActive = activeFilter === category.value;

            return (
              <button
                key={category.value}
                type='button'
                onClick={() => setActiveFilter(category.value)}
                className={cn(
                  "tech-filter relative rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300 md:px-5 md:text-sm",
                  isActive ? "text-white" : "text-slate-400 hover:text-slate-100"
                )}
                style={{
                  boxShadow: isActive ? `0 0 32px ${category.glow}, inset 0 0 24px rgba(255,255,255,0.06)` : undefined,
                }}
              >
                <span
                  className={cn(
                    "absolute inset-0 rounded-xl border transition-opacity duration-300",
                    isActive ? "border-white/30 opacity-100" : "border-white/0 opacity-0"
                  )}
                />
                <span className='relative z-10'>{category.label}</span>
              </button>
            );
          })}
        </div>

        <div
          ref={stageRef}
          className='relative mx-auto h-[560px] w-full max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/35 shadow-[inset_0_0_90px_rgba(15,23,42,0.9)] backdrop-blur-sm md:h-[680px] lg:h-[760px]'
        >
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0,rgba(3,7,18,0.44)_72%)]' />
          <div className='pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl' />
          <div className='pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl' />

          {TECH_STACK.map((tech, index) => {
            const isVisible = visibleIds.has(tech.id);

            return (
              <div
                key={tech.id}
                ref={(node) => {
                  bubbleRefs.current[index] = node;
                }}
                className={cn("tech-bubble absolute left-0 top-0 will-change-transform", isVisible && "tech-bubble-active")}
                style={{ boxShadow: `0 0 30px ${tech.glowColor}` }}
                data-category={tech.category}
              >
                <div
                  className={cn(
                    "tech-bubble-core group relative grid place-items-center rounded-full border border-white/15 bg-white/[0.075] p-4 text-center shadow-2xl backdrop-blur-2xl will-change-transform",
                    SIZE_CLASS[tech.size]
                  )}
                >
                  <span
                    className='tech-bubble-halo pointer-events-none absolute -inset-5 rounded-full opacity-60 blur-2xl'
                    style={{ background: tech.glowColor }}
                  />
                  <span className='pointer-events-none absolute inset-0 rounded-full bg-[conic-gradient(from_180deg,transparent,rgba(255,255,255,0.45),transparent,rgba(255,255,255,0.16),transparent)] opacity-70' />
                  <span className='pointer-events-none absolute inset-px rounded-full bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.22),transparent_32%),linear-gradient(145deg,rgba(15,23,42,0.2),rgba(15,23,42,0.68))]' />

                  <div className='relative z-10 flex flex-col items-center gap-2 md:gap-3'>
                    <img src={tech.icon} alt={`${tech.name} logo`} className={cn("object-contain drop-shadow-xl", ICON_CLASS[tech.size])} />
                    <span className='max-w-[8rem] font-montserrat text-[0.68rem] font-semibold leading-tight text-slate-100 md:text-sm'>
                      {tech.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default TechStackBubbleSystem;
