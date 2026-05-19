const BlogListSkeleton = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030711] px-4 py-28 text-white sm:px-6 lg:px-8">
      <div className="blog-grid-bg absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mx-auto mb-5 h-4 w-36 rounded-full bg-white/10" />
          <div className="mx-auto h-12 w-4/5 rounded-2xl bg-white/10" />
          <div className="mx-auto mt-5 h-5 w-2/3 rounded-full bg-white/10" />
        </div>
        <div className="mb-10 h-16 rounded-2xl border border-white/10 bg-white/[0.055] backdrop-blur-xl" />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055] backdrop-blur-xl">
              <div className="h-56 animate-pulse bg-white/10" />
              <div className="space-y-4 p-6">
                <div className="h-4 w-1/2 animate-pulse rounded-full bg-white/10" />
                <div className="h-7 w-5/6 animate-pulse rounded-xl bg-white/10" />
                <div className="h-4 w-full animate-pulse rounded-full bg-white/10" />
                <div className="h-4 w-3/4 animate-pulse rounded-full bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default BlogListSkeleton;
