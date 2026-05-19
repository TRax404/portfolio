"use client";

import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BlogListPage from "./BlogListPage";
import BlogDetailPage from "./BlogDetailPage";
import BlogListSkeleton from "./BlogListSkeleton";
import "./blog.css";

const BlogRouter = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <BlogListSkeleton />;
  }

  return (
    <BrowserRouter basename="/blogs">
      <Routes>
        <Route index element={<BlogListPage />} />
        <Route path=":slug" element={<BlogDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default BlogRouter;
