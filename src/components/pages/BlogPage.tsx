"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import dynamic from "next/dynamic";
import { BlogPost } from "@/services/api/blog";
import Link from "next/link";

const Blog = dynamic(() => import("../sections/Blog"), { ssr: false });

const BlogPage: React.FC = () => {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getFeatured = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blog?limit=2');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const result = await response.json();
        setFeaturedPosts(result.data);
      } catch {
        setError("Failed to load featured articles.");
      } finally {
        setLoading(false);
      }
    };
    getFeatured();
  }, []);

  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Insights & Articles
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Explore our latest articles, tutorials, and insights about
              technology, development, and design.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="primary" className="group">
                Start Reading
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="ghost">Subscribe to Newsletter</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Featured Articles
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover our most popular and insightful articles handpicked by
              our team.
            </p>
          </motion.div>
          {loading ? (
            <div className="text-center text-white py-10">
              Loading featured articles...
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-10">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              {featuredPosts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-full h-64 relative overflow-hidden">
                    <img
                      src={
                        post.featuredImage && post.featuredImage.trim() !== ""
                          ? post.featuredImage
                          : "/blog/default.jpg"
                      }
                      alt={post.title || "Blog featured image"}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full mb-4 inline-block">
                      {post.categories && post.categories.length > 0
                        ? post.categories[0]
                        : "General"}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {post.title || "Untitled"}
                    </h3>
                    <p className="text-gray-400 mb-6">
                      {post.content && post.content.length > 0
                        ? post.content.slice(0, 120) + "..."
                        : "No summary available."}
                    </p>
                    <Link href={`/blog/${post.id}`}>
                      <Button
                        variant="ghost"
                        className="group"
                        aria-label={`Read article: ${post.title || "Untitled"}`}
                      >
                        Read Article
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog Listing */}
      <Blog />
    </div>
  );
};

export default BlogPage;
