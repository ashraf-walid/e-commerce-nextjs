'use client';

import { useState } from 'react';
import Link from 'next/link';
import FooterColumn from './FooterColumn';
import SocialLinks from './SocialLinks';

const footerSections = [
  {
    title: 'Products',
    links: [
      { label: 'Laptops', href: '/Laptops' },
      { label: 'Accessories', href: '/Accessories' },
      { label: 'New Arrivals', href: '' },
      { label: 'Best Sellers', href: '' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQs', href: '/FAQPage' },
      { label: 'Shipping Info', href: '/ShippingInfo' },
      { label: 'Returns', href: '/ReturnsPolicy' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/AboutUs' },
      { label: 'Blog', href: '/BlogPage' },
      { label: 'Careers', href: '' },
      { label: 'Press', href: '' },
    ],
  },
];

export default function Footer() {
  const [visibleColumns, setVisibleColumns] = useState([]);

  const toggleColumn = (index) => {
    setVisibleColumns(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <footer className="bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <FooterColumn
              key={section.title}
              title={section.title}
              links={section.links}
              isVisible={visibleColumns.includes(index)}
              onToggle={() => toggleColumn(index)}
            />
          ))}

          <SocialLinks />
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
            
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link
                href="/PrivacyPolicy"
                className="text-gray-400 hover:text-white text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/TermsAndConditions"
                className="text-gray-400 hover:text-white text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}