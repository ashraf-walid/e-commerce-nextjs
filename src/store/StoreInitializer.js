'use client';

import { useEffect } from 'react';
import useShopStore from '@/store/shopStore';

export default function StoreInitializer() {
  useEffect(() => {
    useShopStore.getState().initializeCart();
    const cleanup = useShopStore.getState().initialize();
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  return null;
}
