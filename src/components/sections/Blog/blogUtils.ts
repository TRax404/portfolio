import { BlogContentBlock } from "@/data/blogs";

export const formatBlogDate = (date: string) => {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

export const getPlainContent = (content: BlogContentBlock[]) => {
  return content
    .map((block) => {
      if (block.type === "list") return block.items.join(" ");
      return block.body;
    })
    .join(" ");
};
