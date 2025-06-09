'use client';

// import Link from 'next/link';
// import { Home, ArrowLeft, Search } from 'lucide-react';

// export default function NotFound() {
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
//       <div className="text-center">
//         {/* 404 Text */}
//         <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
        
//         {/* Error Message */}
//         <h2 className="text-3xl font-semibold text-gray-800 mb-4">
//           Page Not Found
//         </h2>
        
//         <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
//           Oops! The page you're looking for doesn't exist or has been moved.
//         </p>

//         {/* Navigation Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <Link
//             href="/"
//             className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-all duration-300"
//           >
//             <Home className="w-5 h-5" />
//             Back to Home
//           </Link>

//           <Link
//             href="/products"
//             className="flex items-center justify-center gap-2 bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-all duration-300"
//           >
//             <Search className="w-5 h-5" />
//             Browse Products
//           </Link>
//         </div>

//         {/* Helpful Tips */}
//         <div className="mt-12 p-6 bg-white rounded-xl shadow-sm max-w-md mx-auto">
//           <h3 className="text-lg font-semibold text-gray-800 mb-3">
//             Need Help?
//           </h3>
//           <ul className="text-left text-gray-600 space-y-2">
//             <li className="flex items-start gap-2">
//               <ArrowLeft className="w-5 h-5 text-blue-600 mt-0.5" />
//               <span>Check if the URL is spelled correctly</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <ArrowLeft className="w-5 h-5 text-blue-600 mt-0.5" />
//               <span>Try using our search function to find what you're looking for</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <ArrowLeft className="w-5 h-5 text-blue-600 mt-0.5" />
//               <span>Visit our homepage to explore our products</span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// } 


import Link from 'next/link';
import { AlertCircle, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <AlertCircle 
            size={100} 
            className="text-red-500 opacity-80"
            strokeWidth={1.5}
          />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          404
        </h1>
        
        <p className="text-gray-600 mb-6 text-lg">
            Sorry, the page you are looking for doest exist.
        </p>
        
        <Link 
          href="/" 
          className="flex items-center justify-center w-full bg-blue-500 text-white 
                     py-3 rounded-lg hover:bg-blue-600 transition-colors 
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <Home className="mr-2" size={20} />
          Back to Home Page
        </Link>
      </div>
      
      <div className="mt-8 text-center text-gray-500">
        <p>Did you encounter a problem? You could:</p>
        <div className="flex justify-center space-x-4 mt-4">
          <button 
            onClick={() => window.location.reload()}
            className="text-blue-500 hover:underline"
          >
            Reload the page
          </button>
          <a 
            href="/contact" 
            className="text-blue-500 hover:underline"
          >
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
}