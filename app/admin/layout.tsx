"use client";
import React from 'react';
import Link from 'next/link';
// import { UserButton } from '@clerk/nextjs';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:block border-r border-white/10 p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Admin</h2>
        </div>
        <nav className="space-y-2">
          <Link className="block text-gray-300 hover:text-white" href="/admin">Submissions</Link>
        </nav>
      </aside>
      <main className="p-4">
        <div className="flex items-center justify-end mb-4">
          {/* <UserButton afterSignOutUrl="/" /> */}
          <div className="text-sm text-gray-400">Auth disabled - add Clerk keys</div>
        </div>
        {children}
      </main>
    </div>
  );
}


