'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function useAccessories(filters, searchQuery) {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    let q = collection(db, 'laptop-accessories');

    // Build query based on filters
    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }
    if (filters.brand) {
      q = query(q, where('brand', '==', filters.brand));
    }
    // Note: Client-side filtering will be used for price and search
    // as Firestore doesn't support full-text search out of the box

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        let items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Apply price filter
        items = items.filter(item => item.price <= filters.maxPrice);

        // Apply search filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          items = items.filter(item => 
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
          );
        }

        setAccessories(items);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error fetching accessories:', err);
        setError('Failed to load accessories');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [filters.category, filters.brand, filters.maxPrice, searchQuery]);

  return { accessories, loading, error };
}