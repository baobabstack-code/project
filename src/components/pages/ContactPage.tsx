'use client';

import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const ContactForm = dynamic(() => import('../forms/ContactForm'), { ssr: false });

const ContactPage: React.FC = () => {
  // Removed unused contactInfo state variable
  // const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  // Removed unused useEffect that fetches contact info
  // This was likely for a future feature that hasn't been implemented yet

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
            <div className="flex justify-center mb-8">
              <div className="glass-card px-10 py-6 shadow-lg border-2 border-violet-400/30">
                <span className="text-4xl md:text-5xl font-extrabold text-violet-300 tracking-widest drop-shadow-lg select-none">
                  Baobab Stack
                </span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Get in touch with us to discuss how we can help with your project.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-800 rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
