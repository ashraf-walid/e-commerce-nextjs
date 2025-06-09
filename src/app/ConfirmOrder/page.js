'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { CheckCircle, Home, Package, User, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function ConfirmOrder() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmOrderContent />
    </Suspense>
  );
}

function ConfirmOrderContent() {
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        // Get minimal data from URL
        const orderId = searchParams.get('orderId');
        const orderNumber = searchParams.get('orderNumber');
        const total = searchParams.get('total');

        // Get full order data from sessionStorage
        const storedOrderData = sessionStorage.getItem('orderData');
        
        if (storedOrderData) {
          setOrderData(JSON.parse(storedOrderData));
        } else if (orderId) {
          // Fallback: Fetch from Firestore if sessionStorage is empty
          const orderRef = doc(db, 'orders', orderId);
          const orderSnap = await getDoc(orderRef);
          if (orderSnap.exists()) {
            setOrderData(orderSnap.data());
          }
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching order data:', error);
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <Package className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-red-600 mb-2">Order Not Found</h1>
        <p className="text-gray-600 text-center max-w-md mb-6">
          We couldn&apos;t find your order details. This might happen if you refresh the page or access it directly.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Home className="w-5 h-5 mr-2" />
          Return Home
        </Link>
      </div>
    );
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER || '1234567890';
  const whatsappMessage = `Hi! I'd like to check on my order #${orderData.orderNumber}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        {/* Success Icon */}
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Order Confirmed!</h1>
          <p className="text-gray-600 mt-2">
            Thank you for your purchase. We&apos;ll process your order right away.
          </p>
        </div>

        {/* Order Details */}
        <div className="space-y-6">
          {/* Order Number */}
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-600 font-medium mb-1">Order Number</p>
            <p className="text-lg font-mono font-bold text-blue-900">{orderData.orderNumber}</p>
          </div>

          {/* Order Summary */}
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            {/* Items List */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Items Ordered</h3>
              <div className="space-y-2">
                {orderData.items?.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.name} (Qty: {item.quantity})</span>
                    <span className="font-medium">£{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 border-t pt-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Order Status</span>
                <span className="font-medium text-green-600">{orderData.status}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Order Date</span>
                <span className="font-medium">{new Date(orderData.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium">{orderData.payment}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping Method</span>
                <span className="font-medium">{orderData.shipping?.method}</span>
              </div>
              {orderData.discount && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium text-green-600">-{orderData.discount}%</span>
                </div>
              )}
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Total Amount</span>
                <span>£{orderData.total}</span>
              </div>
            </div>
          </div>

          {/* Shipping Details */}
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">{orderData.address}</p>
              <p className="text-sm text-gray-600">{orderData.city}, {orderData.state}</p>
              <p className="text-sm text-gray-600">Email: {orderData.UserEmail}</p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium mb-2">What&apos;s Next?</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                We&apos;ll process your order within 24 hours
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                You&apos;ll receive a confirmation email shortly
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Track your order status on WhatsApp
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-green-500" />
              Chat on WhatsApp
            </a>
            
            <Link
              href="/UserPage"
              className="flex items-center justify-center w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <User className="w-5 h-5 mr-2" />
              View My Orders
            </Link>
            
            <Link
              href="/"
              className="flex items-center justify-center w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Return to Home
            </Link>
          </div>

          {/* Additional Info */}
          <p className="text-sm text-gray-500 text-center">
            You&apos;ll receive an email confirmation shortly with your order details.
          </p>
        </div>
      </div>
    </div>
  );
} 