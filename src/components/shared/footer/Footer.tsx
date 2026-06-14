"use client";

import { useRef } from "react";
import Container from "@/components/global/Container";
import LINKS from "@/constant/links";
import { IconMail, IconArrowUpRight } from "@tabler/icons-react";
import ShinnyButton from "@/components/ui/ShinnyButton";

const Footer = () => {
  const containerRef = useRef(null);

  return (
    <footer className='relative w-full overflow-hidden bg-[#010610] border-t border-white/5'>
      <Container className='relative z-10 pt-24 pb-12'>
        <div ref={containerRef} className='flex flex-col items-center justify-center text-center'>
          <div className='relative group mb-12'>
            <div className='absolute -inset-x-8 -inset-y-4 transition-all duration-1000' />
            <h2 className='text-4xl md:text-6xl font-bold font-montserrat mb-6 tracking-tight'>
              <span className='bg-linear-to-r from-white via-sky-200 to-slate-400 bg-clip-text text-transparent'>
                Let&apos;s build something <br className="hidden md:block" /> amazing together.
              </span>
            </h2>
            <p className='text-slate-400 font-poppins text-lg max-w-2xl mx-auto mb-10'>
              Currently looking for new opportunities and collaborations. 
              Whether you have a question or just want to say hi, my inbox is always open!
            </p>

            <div className='flex flex-col md:flex-row items-center justify-center gap-6'>
              <a 
                href={LINKS.email}
                className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-900/50 border border-sky-500/20 backdrop-blur-xl transition-all duration-500 hover:border-sky-400/50 hover:bg-slate-800/80 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 group-hover:scale-110 transition-transform duration-500">
                  <IconMail className="w-6 h-6 text-sky-400" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Drop an email</p>
                  <p className="text-lg text-slate-200 font-montserrat font-bold">tirthoray10@gmail.com</p>
                </div>
                <IconArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 ml-4" />
              </a>
              
              <div className="flex items-center gap-4 text-slate-500 font-poppins text-sm">
                <span className="w-8 h-px bg-slate-800"></span>
                <span>OR</span>
                <span className="w-8 h-px bg-slate-800"></span>
              </div>

              <a href={LINKS.email}>
                <ShinnyButton className="h-14 px-10 rounded-2xl">
                  GET IN TOUCH
                </ShinnyButton>
              </a>
            </div>
          </div>

          <div className='mt-24 pt-12 border-t border-white/5 w-full flex flex-col md:flex-row items-center justify-between gap-6'>
            <div className='flex items-center gap-4'>
              <div className='h-px w-8 bg-sky-500/30' />
              <span className='text-[10px] text-sky-200/40 tracking-[0.2em] uppercase font-bold'>
                &copy; {new Date().getFullYear()} Tirtho Deb Ray
              </span>
            </div>
            
            <p className='text-[10px] text-slate-500 tracking-widest uppercase'>
              Built with <span className="text-sky-500/60">Next.js</span> & <span className="text-sky-500/60">Tailwind</span>
            </p>
          </div>
        </div>
      </Container>

      {/* Bottom Glow Effect */}
      <div className='absolute bottom-0 left-1/2 -translate-x-1/2 z-0 pointer-events-none'>
        <div className='relative w-[100vw] h-40 overflow-hidden'>
          <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-full bg-sky-500/10 blur-[100px] rounded-full' />
          <div className='absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-sky-500/20 to-transparent' />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
