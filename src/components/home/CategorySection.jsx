import { Monitor, Keyboard, Mouse, Headphones, Speaker, Mic } from 'lucide-react';
import Link from 'next/link';

const categories = [
  { name: 'Monitors', icon: Monitor, count: 24 },
  { name: 'Keyboards', icon: Keyboard, count: 36 },
  { name: 'Mice', icon: Mouse, count: 28 },
  { name: 'Headsets', icon: Headphones, count: 42 },
  { name: 'Speakers', icon: Speaker, count: 18 },
  { name: 'Microphones', icon: Mic, count: 15 }
];

export default function CategorySection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Browse Categories
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map(({ name, icon: Icon, count }) => (
            <Link
              key={name}
              href={`/Accessories?category=${encodeURIComponent(name)}`}
              className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
                <span className="text-sm text-gray-500">{count} Products</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}