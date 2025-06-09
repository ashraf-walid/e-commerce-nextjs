'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Laptop, Smartphone, ChevronDown } from 'lucide-react';
import { useRef } from 'react';

export default function Navigation({ isShopDropdownOpen, setIsShopDropdownOpen }) {
  const pathname = usePathname();
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsShopDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsShopDropdownOpen(false);
    }, 1500);
  };

  // Helper for active link styling
  const navLinkClass = (href) =>
    `relative text-gray-800 hover:text-blue-600 px-1 py-2 font-semibold ${
      pathname === href
        ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:rounded'
        : ''
    }`;

  return (
    <div className="flex space-x-8 max-sm:hidden">
      {/* Home */}
      <Link href="/" className={navLinkClass('/')}>Home</Link>

      {/* shop menu */}
      <div
        className="relative group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* shop button */}
        <button
          onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
          className="flex items-center px-3 py-2 font-semibold text-gray-800 hover:text-blue-600 "
        >
          Shop
          <ChevronDown
            className={`ml-2 transition-transform duration-300 ${
              isShopDropdownOpen ? 'rotate-180' : ''
            }`}
            size={20}
          />
        </button>

        {/* Links to laptops and accessories Pages */}
        {isShopDropdownOpen && (
          <div className="absolute bg-white shadow-lg rounded-md mt-2 z-10 w-48 py-2">
            <ul>
              <li className="transition-transform transform hover:translate-x-2">
                <Link
                  href="/Laptops"
                  className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-300"
                  onClick={() => setIsShopDropdownOpen(false)}
                >
                  <Laptop className="w-5 h-5 mr-2 text-gray-600" />
                  Laptops
                </Link>
              </li>
              <li className="transition-transform transform hover:translate-x-2">
                <Link
                  href="/Accessories"
                  className="flex items-center px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-300"
                  onClick={() => setIsShopDropdownOpen(false)}
                >
                  <Smartphone className="w-5 h-5 mr-2 text-gray-600" />
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Contact */}
      <Link href="/contact" className={navLinkClass('/contact')}>Contact</Link>
    </div>
  );
}