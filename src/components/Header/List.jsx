'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Heart, 
  User, 
  LogOut, 
  Settings, 
  Laptop, 
  Smartphone, 
  ChevronDown,
  Home,
  MessageCircle,
  ShoppingBag
} from 'lucide-react';

// Define route constants
const ROUTES = {
  LAPTOPS: '/products/laptopCollection',
  ACCESSORIES: '/Accessories'
};

function List({
  isAdmin,
  user,
  onSignOut,
  signInWithGoogle,
  isShopDropdownOpen,
  setIsShopDropdownOpen,
  setIsListOpen
}) {
  const pathname = usePathname();

  const NavLink = ({ href, children, className }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        onClick={() => setIsListOpen(false)}
        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
          isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
        } ${className || ''}`}
      >
        {children}
      </Link>
    );
  };

  return (
    <div className="fixed inset-0 bg-white z-40 animate-slideDown">

      {/* User Profile Section */}
      <div className="p-4 border-b">
        {user ? (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900 truncate max-w-[290px]">
                {user.email}
              </p>
              <p className="text-sm text-gray-500">
                {isAdmin ? 'Administrator' : 'Customer'}
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={signInWithGoogle}
            className="mt-10 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <User className="w-5 h-5" />
            Sign In
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="p-4 space-y-4">
      {user ? (
        <NavLink href="/UserPage">
          <User className="w-5 h-5" />
          <span className="font-medium">User Page</span>
        </NavLink> ) : (
        <span></span>
      )}

        <NavLink href="/">
          <Home className="w-5 h-5" />
          <span className="font-medium">Home</span>
        </NavLink>

        {/* Shop Section */}
        <div>
          <button
            onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
            className="w-full flex items-center justify-between p-3 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5" />
              <span className="font-medium">Shop</span>
            </div>
            <ChevronDown
              className={`transition-transform duration-200 ${
                isShopDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isShopDropdownOpen && (
            <div className="ml-5 mt-2 space-y-2">
              <NavLink href={ROUTES.LAPTOPS}>
                <Laptop className="w-5 h-5" />
                <span className="font-medium">Laptops</span>
              </NavLink>

              <NavLink href="/Accessories">
                <Smartphone className="w-5 h-5" />
                <span className="font-medium">Accessories</span>
              </NavLink>
            </div>
          )}
        </div>

        <NavLink href="/favorites">
          <Heart className="w-5 h-5" />
          <span className="font-medium">Favorites</span>
        </NavLink>

        <NavLink href="/contact">
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium">Contact</span>
        </NavLink>

        {/* Admin Dashboard Link */}
        {isAdmin && (
          <NavLink href="/Dashboard">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </NavLink>
        )}

        {/* Sign Out Button */}
        {user && (
          <button
            onClick={onSignOut}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        )}
      </nav>
    </div>
  );
}

export default List;
