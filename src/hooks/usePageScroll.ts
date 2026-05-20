import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

const usePageScroll = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleScroll = (e: any, targetId: string) => {
    e.preventDefault();

    if (pathname !== "/") {
      router.push(`/${targetId}`);
      return;
    }

    const target = document.querySelector(targetId);
    if (!target) return;

    gsap.to(window, {
      scrollTo: { y: target, offsetY: 80 },
      duration: 1,
      ease: "power3.inOut",
    });
  };

  return handleScroll;
};

export default usePageScroll;
