'use client';

import  { useState, useEffect } from 'react';
import { db } from '@/lib/firebase'; 
import { collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({ code: '', discount: '', description: '' });

  // Fetch coupons from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'coupons'), (snapshot) => {
      const couponData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCoupons(couponData);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Add new coupon to Firestore
  const handleAddCoupon = async () => {
    if (!newCoupon.code || !newCoupon.discount) {
      alert('Please fill in the required fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'coupons'), {
        code: newCoupon.code.trim(),
        discount: parseFloat(newCoupon.discount),
        description: newCoupon.description.trim(),
        createdAt: new Date().toISOString(),
      });
      setNewCoupon({ code: '', discount: '', description: '' });
    } catch (error) {
      console.error('Error adding coupon: ', error);
    }
  };

  // Delete coupon from Firestore
  const handleDeleteCoupon = async (id) => {
    try {
      await deleteDoc(doc(db, 'coupons', id));
    } catch (error) {
      console.error('Error deleting coupon: ', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Coupon Management</h1>

      {/* Add Coupon Form */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Add New Coupon</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Coupon Code"
            value={newCoupon.code}
            onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Discount Percentage"
            value={newCoupon.discount}
            onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
            className="p-2 border rounded"
          />
        </div>
        <textarea
          placeholder="Description (optional)"
          value={newCoupon.description}
          onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
          className="w-full p-2 border rounded mb-4"
        ></textarea>
        <button
          onClick={handleAddCoupon}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Coupon
        </button>
      </div>

      {/* Coupon List */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Existing Coupons</h2>
        {coupons.length === 0 ? (
          <p className="text-gray-600">No coupons available.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {coupons.map((coupon) => (
              <li key={coupon.id} className="flex justify-between items-center py-2">
                <div>
                  <p className="font-medium">{coupon.code}</p>
                  <p className="text-sm text-gray-500">{coupon.discount}% Discount</p>
                  {coupon.description && <p className="text-sm text-gray-400">{coupon.description}</p>}
                </div>
                <button
                  onClick={() => handleDeleteCoupon(coupon.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CouponManagement;
