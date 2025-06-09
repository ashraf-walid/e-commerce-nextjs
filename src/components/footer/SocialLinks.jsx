import { Facebook, Phone, Send } from 'lucide-react';

export default function SocialLinks() {
  return (
    <div className="mt-8 sm:mt-0">
      <h3 className="font-semibold text-lg text-white mb-4">Connect With Us</h3>
      
      <div className="flex space-x-4">
        <a
          href="https://www.facebook.com/profile.php?id=100090664448464&locale"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-400 transition-colors duration-200"
        >
          <Facebook className="w-6 h-6" />
        </a>
        
        <a
          href="https://t.me/twomtechnological"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
        >
          <Send className="w-6 h-6" />
        </a>

        <a
          href="tel:+1234567890"
          className="text-green-500 hover:text-green-400 transition-colors duration-200"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}
