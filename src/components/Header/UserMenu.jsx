'use client';

import { User, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';

export default function UserMenu({ 
  isAdmin, 
  user, 
  onSignOut, 
  onDashboard, 
  onSignIn 
}) {

  return (
    <div className="relative group max-sm:hidden">
      {/* Menu button */}
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <User className="w-5 h-5 text-gray-700" />
      </button>

      {/* Dropdown list */}
      <div className="absolute right-0 w-52 bg-white rounded-md shadow-lg py-2 hidden group-hover:block">
        {user ? (
          <>
            {/* User information */}
            <div className="px-4 py-3 text-sm text-gray-700 border-b">
              <p className="font-medium truncate">{user.email}</p>
            </div>

            {/* Personal page link */}
            <Link
              href="/UserPage"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <User className="w-4 h-4 mr-2" />
              User Page
            </Link>

            {/* Control panel option */}
            {isAdmin && (
              <button
                onClick={onDashboard}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Settings className="w-4 h-4 mr-2" />
                Dashboard
              </button>
            )}

            {/* Logout option */}
            <button
              onClick={onSignOut}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={onSignIn}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <User className="w-4 h-4 mr-2" />
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}
