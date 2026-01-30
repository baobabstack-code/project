"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import dynamic from 'next/dynamic';

// Dynamically import CalendarBooking for modal
const CalendarBooking = dynamic(() => import('../forms/CalendarBooking'), { ssr: false });
// Dynamically import StarField for background animation
const StarField = dynamic(() => import('../ui/StarField'), { ssr: false });

const Hero: React.FC = () => {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-dark via-purple-900/20 to-dark">
      {/* StarField background animation */}
      <StarField>
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>

        <div className="relative pt-32 pb-16 sm:pt-40 sm:pb-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Transforming Ideas into{' '}
                <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Digital Reality
                </span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-gray-300"
            >
              We build cutting-edge web applications, mobile apps, and cloud solutions
              that help businesses thrive in the digital age.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Button variant="primary" size="lg" onClick={() => setShowBooking(true)}>
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="secondary" size="lg">
                Learn More
              </Button>
            </motion.div>
          </div>

        </div>
        </div>
      </StarField>

      {/* Modal for CalendarBooking */}
      {showBooking && (
        <div className="modal-container">
          <div className="modal-content relative p-6 max-w-4xl">
            <button
              className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setShowBooking(false)}
              aria-label="Close"
            >
              ×
            </button>
            <CalendarBooking />
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
