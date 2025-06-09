'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Search, AlignJustify, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { auth, db } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import useShopStore from '@/store/shopStore';
import { collection, query, where, getDocs } from 'firebase/firestore';

// Components to be imported
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import List from './List';
import SearchForMobile from './searchForMobile';

export default function Header() {
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);  
  const router = useRouter();
  
  const { cartItemCount, signInWithGoogle, currentUser } = useShopStore();
  
  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
      const checkAdminStatus = async () => {
        try {
          const q = query(
            collection(db, 'UserAdmin'),
            where('userId', '==', currentUser.uid) // ✅ الشرط المطلوب
          );
  
          const snapshot = await getDocs(q);
          const isAdminUser = !snapshot.empty; // إذا كانت النتيجة تحتوي على مستند على الأقل
  
          setIsAdmin(isAdminUser);
          console.log(`✅ isAdmin: ${isAdminUser}`);
        } catch (error) {
          console.error('❌ Error checking admin status:', error);
          setIsAdmin(false);
        }
      };
  
      checkAdminStatus();
    } else {
      setIsAdmin(false);
    }
  }, [currentUser]);
  
  const handleSignOut = async () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      try {
        await signOut(auth);
        setUser(null);
        router.push('/');
        alert("You have signed out successfully!");
      } catch (error) {
        console.error("Error during sign-out:", error);
        alert("Failed to sign out. Please try again.");
      }
    }
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo for Large screen */}
          <Link href="/" className="flex-shrink-0 max-sm:hidden">
            <Image
              className="h-20 w-auto"
              src="/images/newLogo.png"
              alt="Logo"
              width={80}
              height={80}
              priority
            />
          </Link>

          {/* Navigation */}
          <Navigation
            isShopDropdownOpen={isShopDropdownOpen}
            setIsShopDropdownOpen={setIsShopDropdownOpen}
          />

          {/* Actions */}
          <div className="flex items-center sm:space-x-4 max-sm:justify-between max-sm:w-full">
            {/* Search for large screen*/}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full max-sm:hidden"
            >
              <Search className="w-5 h-5 text-gray-700" />
            </button>

            {/* favorites */}
            <Link href="/favorites" className="p-2 hover:bg-gray-100 rounded-full max-sm:hidden">
              <Heart className="w-5 h-5 text-gray-700" />
            </Link>

            {/* Shopping Cart */}
            <Link href="/CartPage" className="p-2 hover:bg-gray-100 rounded-full relative">
              <ShoppingCart className="w-5 h-5 text-gray-700 max-sm:w-5 max-sm:h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-2 bg-red-500 text-white text-[10px] w-3 h-3 max-sm:w-3 max-sm:h-3 max-sm:top-0 max-sm:right-2 max-sm:text-[9px] rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )} 
            </Link>

            {/* Search for small screen */}
            <SearchForMobile/>

            {/* User Menu */}
            <UserMenu
              isAdmin={isAdmin}
              user={user}
              onSignOut={() => handleSignOut()}
              onDashboard={() => router.push('/Dashboard')}
              onSignIn={signInWithGoogle}
            />

            <div className='flex items-center flex-shrink-0 space-x-1'>
              {/* Logo for small screen */}
              <Link href="/" className="sm:hidden">
                <Image
                  className="h-5 w-auto"
                  src="/images/logoForMobile.png"
                  alt="Logo"
                  width={20}
                  height={20}
                  priority
                />
              </Link>

              {/* List --- Menu */}
              <AlignJustify className='sm:hidden' onClick={()=>setIsListOpen((prev)=>!prev)}/>

              {/* To close List */}
              {isListOpen &&
                <button 
                  className="top-4 right-4 p-2 rounded-full bg-gray-100 z-50"
                  onClick={() => setIsListOpen(false)}
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              }
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isListOpen && (
          <List
            isAdmin={isAdmin}
            user={user}
            onSignOut={() => handleSignOut()}
            signInWithGoogle={signInWithGoogle}
            isShopDropdownOpen={isShopDropdownOpen}
            setIsShopDropdownOpen={setIsShopDropdownOpen}
            setIsListOpen={setIsListOpen}
          />
        )}
      </div>

      {/* Search Modal */}
      <SearchBar
        isOpen={isSearchOpen}
        onOpen={() => setIsSearchOpen(true)}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
}


