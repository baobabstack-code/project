'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import Button from '../ui/Button';
import { PortfolioItem } from '@/services/api/portfolio';

const categories = ['All', 'Web', 'Mobile', 'AI', 'Cloud'];

const Portfolio: React.FC = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Use only the two specified projects
    const projectData = [
      {
        id: 1,
        title: "Ruscle Investments",
        description: "Financial services website",
        category: "Web",
        tags: ["React", "NextJS", "Tailwind"],
        live: "https://ruscleinvestments.co.zw"
      },
      {
        id: 2,
        title: "ColorTech",
        description: "Technology solutions provider",
        category: "Web",
        tags: ["React", "NextJS", "Tailwind"],
        live: "https://colortech.co.zw"
      }
    ];
    
    setPortfolio(projectData);
    setLoading(false);
  }, []);

  const filteredProjects = selectedCategory === 'All'
    ? portfolio
    : portfolio.filter(project => project.category === selectedCategory);

  if (loading) return <div className="text-center text-white py-20">Loading portfolio...</div>;
  if (error) return <div className="text-center text-red-500 py-20">{error}</div>;

  return (
    <section className="py-12 bg-gradient-to-b from-purple-900/20 to-dark">
      <div className="container-responsive">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Our Portfolio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-gray-300"
          >
            Explore our latest projects and success stories
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex justify-center space-x-4"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedCategory === category
                ? 'bg-indigo-500 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative h-64 overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <iframe 
                      src={project.live}
                      title={project.title}
                      className="w-full h-full border-0 transform scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-end p-6 z-20">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                        <p className="mt-2 text-sm text-gray-200">{project.description}</p>
                      </div>
                    </div>
                  </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags && project.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex space-x-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      title={`View ${project.title} on GitHub`}
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      title={`View ${project.title} live`}
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Button variant="primary" size="lg">
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;