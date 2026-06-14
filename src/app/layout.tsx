import type { Metadata } from "next";
import "../styles/globals.css";

import { ReactLenis } from "@/utils/lenis";
import { Montserrat, Poppins } from "next/font/google";
import { cn } from "@/lib/cn";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tirtho-ray.vercel.app/"),
  title: {
    default: "Tirtho Deb Ray | Full Stack Engineer & System Designer",
    template: "%s | Tirtho Deb Ray",
  },
  description:
    "Full Stack Engineer specializing in scalable backend systems, NestJS, and cloud architecture. Explore my projects, engineering blogs, and technical insights.",
  keywords: [
    "Tirtho Deb Ray",
    "Full Stack Developer",
    "Software Engineer",
    "Next.js Developer",
    "React Developer",
    "Node.js Backend",
    "System Design",
    "Web Development",
    "Portfolio",
  ],
  authors: [{ name: "Tirtho Deb Ray", url: "https://tirtho-ray.vercel.app/" }],
  creator: "Tirtho Deb Ray",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tirtho-ray.vercel.app/",
    title: "Tirtho Deb Ray | Full Stack Engineer & System Designer",
    description:
      "Full Stack Engineer specializing in scalable backend systems, NestJS, and cloud architecture. Explore my projects, engineering blogs, and technical insights.",
    siteName: "Tirtho Deb Ray Portfolio",
    images: [
      {
        url: "/images/v2.png",
        width: 1200,
        height: 630,
        alt: "Tirtho Deb Ray - Full Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tirtho Deb Ray | Full Stack Engineer & System Designer",
    description:
      "Full Stack Engineer specializing in scalable backend systems, NestJS, and cloud architecture.",
    images: ["/images/v2.png"],
    creator: "@tirthoray",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={cn(
          montserrat.variable,
          poppins.variable,
          "antialiased"
        )}
      >
        <ReactLenis
          root
          options={{
            duration: 1.1,
            lerp: 0.1,
            wheelMultiplier: 1.5,
            touchMultiplier: 2,
          }}
        >
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
