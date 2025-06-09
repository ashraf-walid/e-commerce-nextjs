'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { toast } from 'react-toastify';
import { generateOrderNumber } from '@/constant/constants';
import { validateDirectCheckoutForm } from '@/utils/validation';
import PaymentMethods from './PaymentMethods';
import VodafonePayment from './VodafonePayment';
import DeliveryForm from './DeliveryForm';
import OrderConfirmation from './OrderConfirmation';
import SignInPrompt from './SignInPrompt';
import StepIndicator from './StepIndicator';
import CouponSection from './CouponSection';
import ShippingOptions from './ShippingOptions';
import BillingAddressSection from './BillingAddressSection';
import useShopStore from '@/store/shopStore';

export default function CheckoutModal({ onClose, product }) {
  const [step, setStep] = useState('payment');
  const [user, setUser] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('delivery');
  const [selectedShipping, setSelectedShipping] = useState({ id: 'standard', price: 0 });
  const [discount, setDiscount] = useState(null);
  const [showBillingAddress, setShowBillingAddress] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const { currentUser, cartItem, clearCart } = useShopStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData(prev => ({
          ...prev,
          email: user.email,
          firstName: user.displayName?.split(' ')[0] || '',
          lastName: user.displayName?.split(' ').slice(1).join(' ') || ''
        }));
      }
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Add handleApplyCoupon function
  const handleApplyCoupon = async (code) => {
    const couponRef = collection(db, 'coupons');
    const snapshot = await getDocs(couponRef);
    const coupon = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .find(c => c.code === code);

    if (!coupon) {
      throw new Error('Invalid coupon code');
    }

    setDiscount(coupon.discount);
    return coupon;
  };

  const handleMethodSelect = (methodId) => {
    setSelectedPayment(methodId);
    if (methodId === 'delivery') {
      if (user) {
        setStep('delivery');
      } else {
        setShowSignIn(true);
      }
    } else if (methodId === 'vodafone') {
      setStep('vodafone');
    } else {
      toast.info('This payment method is coming soon!');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsSubmitting(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setShowSignIn(false);
      setStep('delivery');
    } catch (error) {
      toast.error('Sign in failed. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitOrder = async () => {
    try {
      setIsSubmitting(true);
      const orderNumber = generateOrderNumber();
      
      const subtotal = product.price;
      const discountAmount = discount ? (subtotal * discount / 100) : 0;
      const total = subtotal - discountAmount + selectedShipping.price;
  
      const orderData = {
        orderNumber,
        UserEmail: user.email,
        userId: user.uid,
        ...formData,
        items: [{
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        }],
        shipping: {
          method: selectedShipping.id,
          price: selectedShipping.price
        },
        payment: selectedPayment,
        discount,
        subtotal,
        total,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
  
      // ✅ Add to Firestore
      const ordersCollection = collection(db, 'orders');
      const docRef = await addDoc(ordersCollection, orderData);
      const orderId = docRef.id;

      // ✅ Store full order data in sessionStorage
      sessionStorage.setItem('orderData', JSON.stringify(orderData));

      // ✅ Clear cart
      clearCart();

      // ✅ Redirect with orderId in URL
      router.push(`/ConfirmOrder?orderId=${orderId}`);

    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('Failed to process order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateAndProceed = () => {
    const validationErrors = validateDirectCheckoutForm(formData);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl flex flex-col max-h-[95vh]">
        <div className="p-2 border-b">
          <StepIndicator currentStep={step === 'payment' ? 1 : step === 'delivery' ? 2 : 3} />
        </div>

        <div className="flex-1 overflow-y-auto p-6">
        {step === 'payment' && (
          <PaymentMethods 
            onMethodSelect={handleMethodSelect} 
            onClose={onClose}
            selectedMethod={selectedPayment}
          />
        )}

        {step === 'vodafone' && (
          <VodafonePayment onBack={() => setStep('payment')} />
        )}

        {step === 'delivery' && (
          <>
          <DeliveryForm
            formData={formData}
            errors={errors}
            onChange={setFormData}
            onSubmit={(e) => {
              e.preventDefault();
              if (validateAndProceed()) {
                setStep('confirmation');
              }
            }}
            onBack={() => setStep('payment')}
            isSubmitting={isSubmitting}
          >
            <ShippingOptions
              selected={selectedShipping.id}
              onSelect={setSelectedShipping}
            />
            
            <BillingAddressSection
              show={showBillingAddress}
              onToggle={() => setShowBillingAddress(!showBillingAddress)}
              formData={formData}
              onChange={setFormData}
              errors={errors}
            />
            
            <CouponSection onApplyCoupon={handleApplyCoupon} />
          </DeliveryForm>
          </>
        )}
        
        {step === 'confirmation' && (
          <OrderConfirmation
            formData={formData}
            product={product}
            paymentMethod={selectedPayment}
            onBack={() => setStep('delivery')}
            onConfirm={handleSubmitOrder}
          />
        )}
        </div>
      </div>

      {showSignIn && (
        <SignInPrompt
          onSignIn={handleGoogleSignIn}
          onCancel={() => setShowSignIn(false)}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}