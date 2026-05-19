const BlogListSkeleton = () => {
  return (
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-md p-4">
          <div className="h-56 animate-pulse rounded-2xl bg-white/5" />
          <div className="space-y-4 p-6">
            <div className="h-4 w-1/3 animate-pulse rounded-full bg-white/5" />
            <div className="h-8 w-5/6 animate-pulse rounded-xl bg-white/5" />
            <div className="h-4 w-full animate-pulse rounded-full bg-white/5" />
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogListSkeleton;
