"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaLeaf, FaUser, FaUserMd, FaSignInAlt, } from 'react-icons/fa';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/mainnavbarcomp/about' },
    { name: 'Services', href: '/services' },
    { name: 'Therapies', href: '/therapies' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gradient-to-r from-emerald-800 to-amber-800 shadow-lg py-2' 
        : 'bg-gradient-to-r from-emerald-700 to-amber-700 shadow-md py-3'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand name */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <FaLeaf className="h-6 w-6 text-emerald-700" />
              </div>
              <span className="text-xl font-bold text-white">AyurSutra</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? 'bg-amber-600 text-white'
                      : 'text-amber-100 hover:bg-emerald-600 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth buttons */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <Link 
                href="/patientauthfrontend/signup" 
                className="flex items-center px-4 py-2 rounded-md text-sm font-medium bg-amber-600 hover:bg-amber-700 transition-colors duration-200 text-white"
              >
                <FaUser className="mr-2" />
                Patient Login
              </Link>
              <Link 
                href="/doctorauthfrontend/login" 
                className="flex items-center px-4 py-2 rounded-md text-sm font-medium bg-emerald-600 hover:bg-emerald-700 transition-colors duration-200 text-white"
              >
                <FaUserMd className="mr-2" />
                Practitioner Login
              </Link>
              <Link 
                href="/AdminFrontend/auth/signup" 
                className="flex items-center px-4 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white"
              >
                <FaUser className="mr-2" />
                Admin Login
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`h-6 w-6 ${isOpen ? 'hidden' : 'block'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`h-6 w-6 ${isOpen ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-emerald-700">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-amber-600 text-white'
                  : 'text-amber-100 hover:bg-emerald-600 hover:text-white'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 pb-3 border-t border-emerald-600">
            <div className="mt-3 px-2 space-y-2">
              <Link 
                href="/patientauthfrontend/signup" 
                className="flex items-center justify-center px-3 py-2 rounded-md text-base font-medium text-white bg-amber-600 hover:bg-amber-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <FaUser className="mr-2" />
                Patient Login
              </Link>
              <Link 
                href="/doctorauthfrontend/signup" 
                className="flex items-center justify-center px-3 py-2 rounded-md text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <FaUserMd className="mr-2" />
                Practitioner Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;