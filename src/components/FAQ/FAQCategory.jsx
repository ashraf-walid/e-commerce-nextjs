import { ChevronDown } from 'lucide-react';

export default function FAQCategory({ title, icon: Icon, children, isActive, onClick }) {
  return (
    <div className={`border rounded-lg transition-all duration-300 ${
      isActive ? 'bg-blue-50 border-blue-200' : 'bg-white hover:border-gray-300'
    }`}>
      <button
        onClick={onClick}
        className="w-full px-6 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} />
          <span className="font-semibold text-gray-900">{title}</span>
        </div>
        <ChevronDown className={`w-5 h-5 transition-transform ${
          isActive ? 'rotate-180 text-blue-500' : 'text-gray-400'
        }`} />
      </button>
      {isActive && (
        <div className="px-6 pb-4">
          {children}
        </div>
      )}
    </div>
  );
}