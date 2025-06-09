'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import OrderCard from '@/components/UserPage/OrderCard';
import OrderDetails from '@/components/UserPage/OrderDetails';
import OrdersEmpty from '@/components/UserPage/OrdersEmpty';
import { Package, User, Mail, Phone, MapPin, Loader } from 'lucide-react';
import useShopStore from '@/store/shopStore';
import Image from "next/image";

export default function UserPage() {
  const { currentUser } = useShopStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser?.email) return;

      try {
        setLoading(true);
        const ordersQuery = query(
          collection(db, 'orders'),
          where('userId', '==', currentUser.uid)
        );
        const ordersSnapshot = await getDocs(ordersQuery);
        const ordersData = ordersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(ordersData.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please sign in to view your orders.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-start gap-6">
            <div className="relative">
            {currentUser?.photoURL ? (
              <Image
                src={currentUser.photoURL}
                alt={currentUser.displayName || "User"}
                width={96}
                height={96}
                className="w-24 h-24 max-sm:w-20 max-sm:h-20 rounded-full object-cover border-4 border-blue-100"
              />
              ) : (
              <div className="w-24 h-24 max-sm:w-20 max-sm:h-20 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-12 h-12 text-blue-500" />
              </div>
            )}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 max-sm:w-6 max-sm:h-6 max-sm:-right-1 bg-green-400 rounded-full border-4 border-white" />
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {currentUser?.displayName || 'Welcome!'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className='truncate'>{currentUser?.email}</span>
                </div>
                {currentUser?.phoneNumber && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{currentUser.phoneNumber}</span>
                  </div>
                )}
                {orders.length > 0 && orders[0].address && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{orders[0].address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
          </div>
          {orders.length > 0 && (
            <p className="mt-2 text-gray-600">
              Showing {orders.length} {orders.length === 1 ? 'order' : 'orders'}
            </p>
          )}
        </div>

        {orders.length === 0 ? (
          <OrdersEmpty />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {orders.map(order => (
              <OrderCard
                key={order.orderNumber}
                order={order}
                onViewDetails={() => setSelectedOrder(order)}
              />
            ))}
          </div>
        )}

        {selectedOrder && (
          <OrderDetails
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </div>
    </div>
  );
}




