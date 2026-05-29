import type { Metadata } from "next";
import DynamicBackground from "@/components/global/DynamicBackground";
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import TopProgressBar from "@/components/ui/TopProgressBar";
import BlogRouter from "@/components/sections/Blog/BlogRouter";
import { blogPosts } from "@/data/blogs";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.[0];
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Engineering Blog | Tirtho Ray",
      description: "Engineering notes on full-stack development, performance, architecture, DevOps, and real-world implementation decisions.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: \`\${post.title} | Tirtho Ray\`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.createdAt,
      authors: ["Tirtho Ray"],
      images: [
        {
          url: post.coverImage,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default function BlogsPage() {
  return (
    <DynamicBackground>
      <TopProgressBar />
      <Navbar />
      <BlogRouter />
      <Footer />
    </DynamicBackground>
  );
}
