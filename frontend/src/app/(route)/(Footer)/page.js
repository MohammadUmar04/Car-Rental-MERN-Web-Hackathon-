'use client';
import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-10 md:px-6">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-blue-500 mb-4">DriveEasy</h2>
            <p className="text-gray-400">
              Discover reliable and affordable car rental services that suit your travel needs. Start your journey with us today!
            </p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold text-blue-400 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-500"
              >
                <FaFacebookF />
              </Link>
              <Link
                href="https://twitter.com"
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-500"
              >
                <FaTwitter />
              </Link>
              <Link
                href="https://instagram.com"
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-500"
              >
                <FaInstagram />
              </Link>
              <Link
                href="https://linkedin.com"
                className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-500"
              >
                <FaLinkedinIn />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-700" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} DriveEasy. All rights reserved.</p>
          <ul className="flex space-x-4 mt-4 md:mt-0">
            <li>
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service" className="hover:text-white">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
