import Link from 'next/link';

import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FooterColumn({ 
  title, 
  links, 
  isVisible, 
  onToggle 
}) {
  return (
    <div className="mb-8 sm:mb-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg text-white">{title}</h3>
        <button 
          onClick={onToggle}
          className="sm:hidden"
        >
          {isVisible ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>

      <ul className={`space-y-2 transition-all duration-300 ${
        isVisible ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 sm:max-h-96 sm:opacity-100'
      } overflow-hidden`}>
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}