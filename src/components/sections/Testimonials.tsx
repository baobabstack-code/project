"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image"; // Import Next.js Image component
import Button from "../ui/Button";

import { fetchTestimonials, Testimonial } from "@/services/api/testimonial";

// Client logos data

// Mock data for client logos
const clientLogos = [
  { id: 1, name: "TechStart", logo: "/logos/techstart.svg" },
  { id: 2, name: "InnovateX", logo: "/logos/innovatex.svg" },
  { id: 3, name: "GrowthLabs", logo: "/logos/growthlabs.svg" },
  { id: 4, name: "DataFlow", logo: "/logos/dataflow.svg" },
  { id: 5, name: "CloudNine", logo: "/logos/cloudnine.svg" },
  { id: 6, name: "FutureTech", logo: "/logos/futuretech.svg" },
];

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    const getTestimonials = async () => {
      try {
        setLoading(true);
        const response = await fetchTestimonials();
        setTestimonials(response.data);
      } catch (err) {
        setError("Failed to fetch testimonials.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getTestimonials();
  }, []);

  if (loading)
    return (
      <div className="text-center text-white py-20">
        Loading testimonials...
      </div>
    );
  if (error)
    return <div className="text-center text-red-500 py-20">{error}</div>;
  if (testimonials.length === 0)
    return (
      <div className="text-center text-gray-400 py-20">
        No testimonials available.
      </div>
    );

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-24 bg-gradient-to-b from-dark to-purple-900/20">
      <div className="container-responsive">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-gray-300"
          >
            Trusted by leading companies worldwide
          </motion.p>
        </div>

        {/* Testimonials Carousel */}
        <div className="mt-16 relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-12"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="relative">
                      {testimonials[currentIndex].image &&
                        typeof testimonials[currentIndex].image ===
                        "string" && (
                          <Image
                            src={testimonials[currentIndex].image}
                            alt={testimonials[currentIndex].author}
                            width={128}
                            height={128}
                            className="w-32 h-32 rounded-full object-cover mx-auto"
                          />
                        )}
                      {/* Fallback for string image URL or if image is not an object */}
                      {testimonials[currentIndex].image &&
                        typeof testimonials[currentIndex].image ===
                        "string" && (
                          <Image
                            src={testimonials[currentIndex].image}
                            alt={testimonials[currentIndex].author}
                            width={128}
                            height={128}
                            className="w-32 h-32 rounded-full object-cover mx-auto"
                          />
                        )}
                      {!testimonials[currentIndex].image && (
                        <Image
                          src="/avatars/default.jpg" // Default avatar if no image is provided
                          alt="Default avatar"
                          width={128}
                          height={128}
                          className="w-32 h-32 rounded-full object-cover mx-auto"
                        />
                      )}
                      <Quote className="absolute -top-4 -right-4 text-purple-500 w-8 h-8" />
                    </div>
                    <div className="mt-4 text-center">
                      <h3 className="text-xl font-semibold text-white">
                        {testimonials[currentIndex].author}
                      </h3>
                      {testimonials[currentIndex].role && (
                        <p className="text-gray-400">
                          {testimonials[currentIndex].role}
                        </p>
                      )}
                      {/* Company field can be added to testimonial data structure if needed */}
                      {/* <p className="text-purple-400">{testimonials[currentIndex].company}</p> */}
                      {testimonials[currentIndex].rating && (
                        <div className="flex justify-center mt-2">
                          {[...Array(testimonials[currentIndex].rating)].map(
                            (_, i) => (
                              <Star
                                key={i}
                                className="w-5 h-5 text-yellow-400 fill-current"
                              />
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {testimonials[currentIndex].content}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Client Logos */}
        <div className="mt-24">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-xl font-semibold text-gray-400 mb-12"
          >
            Trusted by Industry Leaders
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {clientLogos.map((client) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={48} // Assuming a reasonable default width for logos
                  height={48} // Assuming a reasonable default height for logos
                  className="h-12 w-auto"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="text-gray-300 mb-8">
            Join our growing list of satisfied clients and experience the Baobab
            Stack difference.
          </p>
          <Button variant="primary" size="lg">
            Get Started
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
