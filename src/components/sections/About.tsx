'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Heart, Lightbulb, Zap } from 'lucide-react';
import Image from 'next/image';
import Button from '../ui/Button';
import { fetchTeamMembers, fetchCompanyValues, TeamMember, CompanyValue } from '@/services/api/about';

const ICONS: Record<string, JSX.Element> = {
  Target: <Target className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
  Lightbulb: <Lightbulb className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  Award: <Award className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
};

const About: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [values, setValues] = useState<CompanyValue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [team, vals] = await Promise.all([
          fetchTeamMembers(),
          fetchCompanyValues(),
        ]);
        setTeamMembers(team.data || []);
        setValues(vals.data || []);
      } catch {
        setError('Failed to load about data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center text-white py-20">Loading about info...</div>;
  if (error) return <div className="text-center text-red-500 py-20">{error}</div>;

  return (
    <section className="py-24 bg-gradient-to-b from-dark to-purple-900/20">
      <div className="container-responsive">
        {/* Company Overview */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            About Baobab Stack
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto"
          >
            We're a team of passionate technologists dedicated to transforming businesses through innovative digital solutions.
          </motion.p>
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 mb-20"
        >
          <div className="flex items-center justify-center mb-6">
            <Award className="w-12 h-12 text-purple-400" />
          </div>
          <h3 className="text-2xl font-semibold text-white text-center mb-4">Our Mission</h3>
          <p className="text-gray-300 text-center max-w-3xl mx-auto">
            To empower businesses with cutting-edge technology solutions that drive growth,
            enhance efficiency, and create lasting value in an ever-evolving digital landscape.
          </p>
        </motion.div>

        {/* Company Values */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-white text-center mb-12">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6"
              >
                <div className="text-purple-400 mb-4">{ICONS[value.icon] || <Users className="w-6 h-6" />}</div>
                <h4 className="text-xl font-semibold text-white mb-2">{value.title}</h4>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-white mb-4">Meet Our Team</h3>
            <p className="text-gray-300">The talented people behind our success</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden"
              >
                <div className="aspect-w-1 aspect-h-1">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={256}
                    height={256}
                    className="w-full h-64 object-cover"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-white mb-1">{member.name}</h4>
                  <p className="text-purple-400 mb-3">{member.role}</p>
                  <p className="text-gray-400 mb-4">{member.bio}</p>
                  <div className="flex space-x-4">
                    {member.social && Object.entries(member.social).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Join Our Journey?
          </h3>
          <p className="text-gray-300 mb-8">
            Let's work together to create something extraordinary.
          </p>
          <Button variant="primary" size="lg">
            Get Started
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;