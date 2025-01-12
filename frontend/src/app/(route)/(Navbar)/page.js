'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleScrollToSection = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-green-600">
            Car<span className="text-orange-500">Rental</span>
          </Link>

          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className={`${
              isOpen ? 'block' : 'hidden'
            } absolute top-full left-0 w-full bg-white md:static md:flex md:w-auto md:bg-transparent`}
          >
            <ul className="flex flex-col md:flex-row md:space-x-6 text-center md:text-left">
              <li>
                <Link
                  href="/Homepage"
                  className="block py-2 px-4 text-gray-700 hover:text-green-600 hover:bg-gray-100 md:hover:bg-transparent"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#menu"
                  onClick={(e) => handleScrollToSection(e, 'menu')}
                  className="block py-2 px-4 text-gray-700 hover:text-green-600 hover:bg-gray-100 md:hover:bg-transparent"
                >
                  Menu
                </a>
              </li>
              <li>
                <Link
                  href="/About"
                  className="block py-2 px-4 text-gray-700 hover:text-green-600 hover:bg-gray-100 md:hover:bg-transparent"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/Contact"
                  className="block py-2 px-4 text-gray-700 hover:text-green-600 hover:bg-gray-100 md:hover:bg-transparent"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/Cart"
                  className="block py-2 px-4 text-gray-700 hover:text-green-600 hover:bg-gray-100 md:hover:bg-transparent"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
