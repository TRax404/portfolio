"use client";
import { LinkPreview } from "@/components/ui/LinkPreview";
import { IconBrandGithub, IconPlayerPlay, IconServer, IconWorld, IconArticle } from "@tabler/icons-react";
import BoxReveal from "@/components/ui/BoxReveal";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

const Card = ({ project, onPlayVideo, variant = "horizontal" }: { project: any; onPlayVideo: () => void; variant?: "horizontal" | "vertical" }) => {
  const borderGradient = `conic-gradient(from 0deg at 50% 50%, 
    #03e8f4 0%, 
    rgba(3,232,244,0.3) 5%, 
    transparent 15%, 
    rgba(106,90,205,0.3) 22%, 
    #6a5acd 25%, 
    rgba(106,90,205,0.3) 28%, 
    transparent 35%, 
    rgba(3,232,244,0.3) 55%, 
    #03e8f4 60%, 
    rgba(3,232,244,0.3) 65%, 
    transparent 70%, 
    rgba(106,90,205,0.3) 87%, 
    #6a5acd 90%, 
    rgba(3,232,244,0.9) 93%
  )`;

  // Limit technologies shown on mobile
  const maxMobileTechs = 5;
  const visibleTechs = project?.technology.slice(0, maxMobileTechs);
  const remainingCount = project?.technology.length - maxMobileTechs;

  return (
    <div
      className='rounded-2xl p-px md:p-0.5 relative overflow-hidden h-full w-full shadow-2xl transition-all duration-500 group/card'
      style={{
        background: borderGradient,
      }}
    >
      {/* Static Glassy Highlight Overlay */}
      <div className='absolute inset-0 bg-white/5 opacity-40 mix-blend-overlay pointer-events-none' />

      <div className={`flex ${variant === "vertical" ? "flex-col gap-4 md:gap-5" : "flex-col md:flex-row gap-4 md:gap-7"} rounded-2xl h-full bg-[#0a0a0a] shadow-inner p-4 relative z-10 overflow-hidden transition-all duration-500 group-hover/card:bg-[#0d0d0d]`}>
        {/* Subtle static inner glow */}
        <div className='absolute inset-0 bg-linear-to-br from-white/2 to-transparent pointer-events-none' />

        {/* Thumbnail */}
        <div className={`w-full ${variant === "vertical" ? "h-[200px] md:h-[240px] shrink-0" : "md:w-[42%] h-48 sm:h-56 md:h-full"} rounded-xl overflow-hidden relative cursor-pointer group/img`} onClick={onPlayVideo}>
          <Image
            src={project?.project_thumnail}
            alt={project?.project_name}
            width={800}
            height={600}
            className='w-full h-full object-cover transition-all duration-700 group-hover/img:scale-105 ease-out rounded-xl shadow-lg'
          />

          <div className='absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover/img:opacity-100 transition-all duration-500'>
            <div className='bg-white/10 backdrop-blur-md rounded-full w-14 h-14 flex items-center justify-center transform scale-90 group-hover/img:scale-100 transition-all duration-500 border border-white/20 shadow-2xl'>
              <IconPlayerPlay className='text-white size-7 fill-white' />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className={`${variant === "vertical" ? "flex flex-col flex-1" : "md:w-[58%] flex flex-col justify-between py-1"} relative z-20`}>
          <div>
            <div className='flex justify-between items-start gap-2'>
              <h3 className={`font-bold text-white font-montserrat tracking-tight leading-tight group-hover/card:text-[#03e8f4] transition-colors duration-500 ${variant === "vertical" ? "text-lg md:text-xl" : "text-lg md:text-2xl"}`}>
                <BoxReveal duration={0.8}>
                  <span>{project?.project_name}</span>
                </BoxReveal>
              </h3>
              {project?.company && (
                <motion.div className='px-3 bg-[#03e8f4]/10 border border-[#03e8f4]/30 rounded-full flex items-center justify-center h-6 shrink-0'>
                  <p className='text-[9px] uppercase tracking-[0.2em] font-black text-[#03e8f4] whitespace-nowrap mt-px'>
                    {project.company.name}
                  </p>
                </motion.div>
              )}
            </div>

            <p className={`text-sm text-slate-400 mt-2 font-poppins leading-relaxed ${variant === "vertical" ? "mt-3 line-clamp-2 md:line-clamp-3 flex-1" : "line-clamp-2 md:line-clamp-3"}`}>{project?.description}</p>

            {/* Technologies */}
            <div className={`mt-4 ${variant === "vertical" ? "mb-5" : ""}`}>
            <div className={`flex flex-wrap ${variant === "vertical" ? "gap-1.5 md:gap-2" : "gap-2"}`}>
              {/* Show limited techs on mobile */}
              <div className={`flex flex-wrap ${variant === "vertical" ? "gap-1.5" : "gap-2"} md:hidden`}>
                {visibleTechs.map((tech: string, i: number) => (
                  <span
                    key={i}
                    className='px-2.5 py-1 bg-white/3 border border-white/10 rounded-md text-[10px] text-slate-300 font-medium hover:border-[#03e8f4]/40 hover:bg-[#03e8f4]/5 transition-all duration-300'
                  >
                    {tech}
                  </span>
                ))}
                {remainingCount > 0 && (
                  <span className='px-2.5 py-1 bg-white/5 border border-white/20 rounded-md text-[10px] text-slate-400 font-medium'>
                    +{remainingCount} more
                  </span>
                )}
              </div>

              {/* Show techs on desktop */}
              <div className={`hidden md:flex flex-wrap ${variant === "vertical" ? "gap-1.5" : "gap-2"}`}>
                {(variant === "vertical" ? project?.technology.slice(0, 6) : project?.technology).map((tech: string, i: number) => (
                  <span
                    key={i}
                    className='px-2.5 py-1 bg-white/3 border border-white/10 rounded-md text-xs text-slate-300 font-medium hover:border-[#03e8f4]/40 hover:bg-[#03e8f4]/5 transition-all duration-300'
                  >
                    {tech}
                  </span>
                ))}
                {variant === "vertical" && project?.technology.length > 6 && (
                  <span className='px-2.5 py-1 bg-white/5 border border-white/20 rounded-md text-xs text-slate-400 font-medium'>
                    +{project.technology.length - 6} more
                  </span>
                )}
              </div>
            </div>
          </div>
          </div>

          {/* Action buttons pinned to bottom */}
          <div className='flex items-center justify-between mt-auto pt-4 border-t border-white/8'>
            <div className='flex gap-3 md:gap-4'>
              {project?.client_github_link && (
                <LinkPreview url={project?.client_github_link}>
                  <div className='text-slate-500 hover:text-[#03e8f4] transition-all duration-300 transform hover:scale-110'>
                    <IconBrandGithub className='size-5' />
                  </div>
                </LinkPreview>
              )}
              {project?.server_github_link && (
                <LinkPreview url={project?.server_github_link}>
                  <div className='text-slate-500 hover:text-[#03e8f4] transition-all duration-300 transform hover:scale-110'>
                    <IconServer className='size-5' />
                  </div>
                </LinkPreview>
              )}
            </div>

            <div className='flex gap-2 items-center'>
              <Link href={`/project/${project.id}`}>
                <div className='flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-all duration-500 font-semibold text-[10px] md:text-sm group/blog bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 border border-sky-500/20'>
                  <span className='tracking-wide'>Project Infrastructure</span>
                  <IconArticle className='size-3.5 md:size-4 group-hover/blog:-translate-y-0.5 transition-transform' />
                </div>
              </Link>
              {project?.live_link && (
                <LinkPreview url={project?.live_link}>
                  <div className='flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-1.5 md:py-2 rounded-full transition-all duration-500 font-semibold text-[10px] md:text-sm group/btn bg-white/5 text-white hover:bg-white/10 border border-white/10'>
                    <span className='tracking-wide'>Live Preview</span>
                    <IconWorld className='size-3.5 md:size-4 group-hover/btn:rotate-12 transition-transform' />
                  </div>
                </LinkPreview>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
