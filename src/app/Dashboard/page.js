'use client';

import { useState, useEffect } from 'react';
import useShopStore from '@/store/shopStore';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { 
  PackageSearch, 
  PackagePlus, 
  SquarePlus, 
  Headphones,
  ShoppingCart,
  Users,
  Ticket,
  User, 
  Logs
} from 'lucide-react';

// Optimize dynamic imports with loading states and reduced bundle size
const AddProduct = dynamic(() => import('@/components/Dashboard/AddProduct'), {
  loading: () => <div className="p-4">Loading product form...</div>,
  ssr: false
});

const ProductManagement = dynamic(() => import('@/components/Dashboard/ProductManagement'), {
  loading: () => <div className="p-4">Loading product management...</div>,
  ssr: false
});

const AddAccessory = dynamic(() => import('@/components/Dashboard/addaccessory'), {
  loading: () => <div className="p-4">Loading accessory form...</div>,
  ssr: false
});

const LaptopAccessoriesManagement = dynamic(() => import('@/components/Dashboard/MangeAccessories'), {
  loading: () => <div className="p-4">Loading accessories management...</div>,
  ssr: false
});

const CouponManagement = dynamic(() => import('@/components/Dashboard/CouponManagement'), {
  loading: () => <div className="p-4">Loading coupon management...</div>,
  ssr: false
});

const ManageOrders = dynamic(() => import('@/components/Dashboard/manageOrders/manageOrders'), {
  loading: () => <div className="p-4">Loading orders management...</div>,
  ssr: false
});

const AddUserAdmin = dynamic(() => import('@/components/Dashboard/AddUserAdmin'), {
  loading: () => <div className="p-4">Loading user management...</div>,
  ssr: false
});

export default function Dashboard() {
  const { currentUser } = useShopStore();
  const [activeTab, setActiveTab] = useState('ManageOrders');
  const [isListOpen, setIsListOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  // verifyAdmin
  useEffect(() => {
    const verifyAdmin = async () => {
      if (!currentUser) return;

      const token = await currentUser.getIdToken();

      const res = await fetch('/api/check-admin', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        router.replace('/');
        return;
      }

      const data = await res.json();
      if (data.admin) {
        setAuthorized(true);
      } else {
        router.replace('/');
      }

      setLoading(false);
    };

    verifyAdmin();
  }, [currentUser,router]);

  if (loading) {
    console.log('Verifying permissions...');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Verifying permissions...</p>
        </div>
      </div>
    );
  }

  if (!authorized) return null;


  const tabTitles = {
    ManageOrders: 'Manage Orders',
    addProduct: 'Add New Product',
    productManagement: 'Product Management',
    addaccessory: 'Add New Accessory',
    MangeAccessories: 'Accessory Management',
    AddUserAdmin: 'User Management'
  };

  const navItems = [
    {
      id: 'ManageOrders',
      label: 'Manage Orders',
      icon: <ShoppingCart className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'addProduct',
      label: 'Add Product',
      icon: <PackagePlus className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'productManagement',
      label: 'Manage Products',
      icon: <PackageSearch className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'addaccessory',
      label: 'Add Accessory',
      icon: <SquarePlus className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'MangeAccessories',
      label: 'Manage Accessories',
      icon: <Headphones className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'CouponManagement',
      label: 'Coupon Management',
      icon: <Ticket className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'AddUserAdmin',
      label: 'User Management',
      icon: <Users className="w-5 h-5 text-blue-600" />
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'ManageOrders':
        return <ManageOrders />;
      case 'addProduct':
        return <AddProduct />;
      case 'productManagement':
        return <ProductManagement />;
      case 'addaccessory':
        return <AddAccessory />;
      case 'MangeAccessories':
        return <LaptopAccessoriesManagement />;
      case 'CouponManagement':
        return <CouponManagement />;
      case 'AddUserAdmin':
        return <AddUserAdmin />;
      default:
        return null;
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please sign in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Sidebar in large screen*/}
      <div className="w-56 bg-white shadow-lg p-2 min-h-screen max-sm:hidden">
        <div className="mb-8 mt-6">
          <h3 className="text-2xl font-bold text-gray-800">
            Dashboard
          </h3>
          <div className="mt-2 h-1 w-20 bg-blue-500 rounded-full"></div>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-2 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="w-full shadow-lg flex justify-between items-center absolute sm:hidden px-4 py-2">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            Dashboard
          </h3>
          <div className="mt-1 h-1 w-16 bg-blue-500 rounded-full"></div>
        </div>
        <Logs onClick={()=> setIsListOpen(!isListOpen)}/>
      </div>

      {/* Sidebar in small screen*/}
      {isListOpen &&
        <div className="w-full bg-white shadow-lg p-6 min-h-screen sm:hidden absolute mt-14 z-50 -top-1">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {setActiveTab(item.id); setIsListOpen(!isListOpen)} }
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      }
      
      {/* Main Content */}
      <main className="flex-1 p-8 max-sm:py-4 max-sm:px-0">
        {/* Dashboard Header */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6 flex items-center justify-between max-sm:hidden">
          <h1 className="text-2xl font-semibold text-gray-800">
            {tabTitles[activeTab] || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-5 h-5" />
              <span className="text-sm">{currentUser.email}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 max-sm:p-0 max-sm:mt-12">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

