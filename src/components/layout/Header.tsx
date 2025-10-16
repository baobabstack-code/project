"use client"

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Button from '../ui/Button';
import debounce from 'lodash.debounce';

const navigation = {
  main: [
    { name: 'Blog', href: '/blog' },
    { name: 'Podcasts', href: '/podcasts' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
};

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'nav-blur shadow-sm' : 'bg-dark'}`}>
      <div className="container-responsive">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
                Baobab Stack
              </span>
            </Link>
          </div>
          
          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              className="rounded-md p-2 inline-flex items-center justify-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              onClick={toggleMenu}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          <nav className="hidden md:flex space-x-10">

            {navigation.main.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-base font-medium ${
                  isActive(item.href)
                    ? 'text-purple-400'
                    : 'text-gray-300 hover:text-purple-400'
                }`}>
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {/* Sign in button removed */}
            <Button variant="primary">Book a Call</Button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} absolute top-0 inset-x-0 p-4 transition transform origin-top-right md:hidden z-50`}>
        <div className="glass-card divide-y-2 divide-white/10">
          <div className="pt-5 pb-6 px-5">
            <div className="flex items-center justify-between">
              <div>
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
                  Baobab Stack
                </Link>
              </div>
              <div className="-mr-2">
                <button
                  type="button"
                  className="bg-white/10 rounded-md p-2 inline-flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 focus:outline-none transition-colors"
                  onClick={toggleMenu}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="mt-6">
              <nav className="grid gap-y-8">
                {navigation.main.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`-m-3 p-3 flex items-center rounded-md hover:bg-white/10 transition-colors ${
                      isActive(item.href) ? 'bg-white/10' : ''
                    }`}>
                    <span className="ml-3 text-base font-medium text-white" onClick={toggleMenu}>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          <div className="py-6 px-5 space-y-4">
            {/* Sign in button removed from mobile menu */}
            <Button variant="primary" className="w-full" onClick={toggleMenu}>
              Book a Call
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
