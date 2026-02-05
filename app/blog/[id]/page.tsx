"use client";

import BlogPost from "@/components/pages/BlogPost";
import { use } from "react";

export default function DynamicBlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  if (!id) {
    return <div>Loading...</div>;
  }

  return <BlogPost />;
}