import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Connection Information</h2>
      
      <div className="space-y-6">
        <div className="flex items-start space-x-4 space-x-reverse group">
          <div className="mt-1 mr-2">
            <MapPin className="w-6 h-6 text-sky-500 group-hover:text-sky-600 transition-colors duration-150" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 group-hover:text-sky-600 transition-colors duration-150">The address</h3>
            <p className="text-gray-600 mt-1">New Damietta</p>
            <p className="text-gray-600">Egypt</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4 space-x-reverse group">
          <div className="mt-1 mr-2">
            <Phone className="w-6 h-6 text-sky-500 group-hover:text-sky-600 transition-colors duration-150" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 group-hover:text-sky-600 transition-colors duration-150">Phone</h3>
            <a 
              href="tel:+966123456789" 
              className="text-gray-600 hover:text-sky-500 transition-colors duration-150 mt-1 block"
              dir="ltr"
            >
              +057 366 7804
            </a>
          </div>
        </div>
        
        <div className="flex items-start space-x-4 space-x-reverse group">
          <div className="mt-1 mr-2">
            <Mail className="w-6 h-6 text-sky-500 group-hover:text-sky-600 transition-colors duration-150" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 group-hover:text-sky-600 transition-colors duration-150">Email</h3>
            <a 
              href="mailto:info@example.com" 
              className="text-gray-600 hover:text-sky-500 transition-colors duration-150 mt-1 block"
              dir="ltr"
            >
              info@example.com
            </a>
          </div>
        </div>

        <div className="flex items-start space-x-4 space-x-reverse group">
          <div className="mt-1 mr-2">
            <Clock className="w-6 h-6 text-sky-500 group-hover:text-sky-600 transition-colors duration-150" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 group-hover:text-sky-600 transition-colors duration-150">work hours </h3>
            <div className="space-y-2 text-gray-600 mt-1">
            <p>Sunday - Thursday: 9:00 AM - 5:00 PM</p>
            <p>Friday - Saturday: Closed</p>              
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h3 className="font-medium text-gray-900 mb-4">follow us on</h3>
        <div className="flex gap-4 space-x-reverse">
          <a href="#" className="text-gray-400 hover:text-sky-500 transition-colors duration-150">
            <span className="sr-only">Twitter</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>

          <a href="#" className="text-gray-400 hover:text-sky-500 transition-colors duration-150">
            <span className="sr-only">LinkedIn</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>

          <a href="#" className="text-gray-400 hover:text-sky-500 transition-colors duration-150">
            <span className="sr-only">Facebook</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}