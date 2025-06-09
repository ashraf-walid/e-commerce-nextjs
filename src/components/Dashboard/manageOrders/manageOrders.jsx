'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import OrdersTable from './OrdersTable';
import OrderStats from './OrderStats';
import OrderDetails from '@/components/UserPage/OrderDetails';
import { Package, Search } from 'lucide-react';

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersSnapshot = await getDocs(collection(db, 'orders'));
        const ordersData = ordersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(ordersData.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status });
      setOrders(prev => 
        prev.map(order => 
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const filteredOrders = orders.filter(order => 
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.UserEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-6 px-2 rounded-lg shadow-lg max-w-4xl mx-auto overflow-auto">
      <div className="max-w-7xl mx-auto px-4 max-sm:px-2">
        <div className="flex items-center justify-between mb-8 max-sm:flex-col max-sm:gap-4">
          <div className="flex items-center gap-3 ">
            <Package className="w-7 h-7 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 ">Manage Orders</h1>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <OrderStats orders={orders} />

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <OrdersTable
            orders={filteredOrders}
            onStatusChange={updateOrderStatus}
            onViewDetails={setSelectedOrder}
          />
        </div>

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