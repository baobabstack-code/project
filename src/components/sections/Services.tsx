'use client';

import React, { useEffect, useState } from 'react';
import { Monitor, Zap, Bot, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Service } from '@/services/api/services';

const ICONS: Record<string, React.ElementType> = {
  Monitor,
  Zap,
  Bot,
  BarChart,
};

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getServices = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const result = await response.json();
        setServices(result.data || []);
      } catch {
        setError('Failed to load services.');
      } finally {
        setLoading(false);
      }
    };
    getServices();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 200 } },
    hover: { scale: 1.2, rotate: 15, transition: { type: "spring", stiffness: 300 } }
  };

  if (loading) return <div className="text-center text-white py-20">Loading services...</div>;
  if (error) return <div className="text-center text-red-500 py-20">{error}</div>;

  return (
    <section className="spacing-responsive relative overflow-hidden">
      <motion.div
        className="container-responsive"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <motion.h2
            className="text-3xl font-bold text-white mb-4"
            whileHover={{ scale: 1.05, color: "#A78BFA" }}
          >
            Our Solutions
          </motion.h2>
          <motion.p
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Discover how our comprehensive digital solutions can transform your business, drive innovation, and deliver measurable results in a rapidly evolving world.
          </motion.p>
        </motion.div>
        <div className="grid-responsive">
          {services.map((service, index) => {
            const Icon = service.icon && ICONS[service.icon] ? ICONS[service.icon] : Monitor;
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 10px 25px -5px rgba(167, 139, 250, 0.4)",
                  background: "linear-gradient(to bottom right, rgba(126, 34, 206, 0.3), rgba(79, 70, 229, 0.2))"
                }}
                className="glass-card rounded-lg p-6 transition-all duration-300 backdrop-blur-sm border border-purple-500/10"
              >
                <motion.div
                  className="bg-white/10 rounded-lg p-3 w-fit mb-4"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
                <motion.h3
                  className="text-lg font-semibold text-white mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  {service.title}
                </motion.h3>
                <motion.p
                  className="text-gray-400 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {service.description}
                </motion.p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Services;