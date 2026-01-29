'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Header from './Header';
import Footer from './Footer';
import { ToastProvider } from '../../contexts/ToastContext';

const ParticleEffectForHero = dynamic(() => import('../ui/particle-effect-for-hero'), { ssr: false });

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToastProvider>
        <ParticleEffectForHero />
        <div className="relative z-10">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </ToastProvider>
    </>
  );
}