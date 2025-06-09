'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ApplyCoupon from '@/components/checkoutPage/ApplyCoupon';
import { AlertCircle, Check, ArrowRight } from 'lucide-react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '@/lib/firebase';
import { generateOrderNumber, shippingOptions, paymentMethods } from '@/constant/constants';
import InputField from '@/components/checkoutPage/InputField';
import { validateForm } from '@/utils/validation';
import useShopStore from '@/store/shopStore';
import Image from "next/image";

export default function Checkout() {
  const router = useRouter();
  const {
    cartItem,
    cartProducts,
    subtotal,
    clearCart,
    currentUser,
    signInWithGoogle,
  } = useShopStore();

  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0].id);
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(null);
  const [showBillingAddress, setShowBillingAddress] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };

    // Sync addresses if shipping fields change and billing is not shown
    if (!showBillingAddress && ['address', 'city', 'state'].includes(name)) {
      const billingField = 'billing' + name.charAt(0).toUpperCase() + name.slice(1);
      newFormData[billingField] = value;
    }

    setFormData(newFormData);

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Update checkbox handler
  const handleBillingAddressToggle = (e) => {
    const useShippingAddress = e.target.checked;
    setShowBillingAddress(!useShippingAddress);

    setFormData(prev => {
      if (useShippingAddress) {
        // Copy shipping address to billing
        return {
          ...prev,
          billingAddress: prev.address,
          billingCity: prev.city,
          billingState: prev.state,
        };
      } else {
        // Clear billing address
        return {
          ...prev,
          billingAddress: '',
          billingCity: '',
          billingState: '',
        };
      }
    });
  };

  const shipping = shippingOptions.find(opt => opt.id === selectedShipping);
  const subtotalWithDiscount = discount ? subtotal * (1 - discount / 100) : subtotal;
  const total = subtotalWithDiscount + shipping.price;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert('Please log in to place your order. Sign in to track your orders easily!');
      return;
    }

    // Check if shipping information is filled out
    const requiredShippingFields = ['firstName', 'lastName', 'phone', 'address', 'city', 'state'];
    const missingFields = requiredShippingFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert('Please fill out all required shipping information before placing your order.');
      // Set errors for missing fields
      const errors = {};
      missingFields.forEach(field => {
        errors[field] = 'This field is required';
      });
      setFormErrors(errors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!acceptedTerms) {
      alert('Please accept the Terms and Conditions and Privacy Policy before placing your order.');
      setFormErrors(prev => ({
        ...prev,
        terms: 'Please accept the terms and conditions'
      }));
      return;
    }

    // Validate all form fields
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (window.confirm('Are you sure you want to place this order?')) {
      setIsLoading(true);

      try {
        const orderNumber = generateOrderNumber();
        const orderData = {
          ...formData,
          items: cartProducts.map(item => ({
            id: item.id,
            quantity: cartItem[item.id],
            price: item.price,
            name: item.name
          })),
          shipping: {
            method: selectedShipping,
            price: shipping.price
          },
          payment: selectedPayment,
          coupon: couponCode || null,
          discount: discount || null,
          subtotal,
          total,
          status: 'pending',
          createdAt: new Date().toISOString(),
          orderNumber,
          UserEmail: currentUser.email,
          userId: currentUser.uid,
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
        setFormErrors(prev => ({
          ...prev,
          submit: 'Failed to submit order. Please try again.'
        }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Shipping Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              <div className="grid grid-cols-2 gap-4">
                {ShippingInputFields.map((field) => (
                  <InputField
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className={`${field.colSpan} p-2 border rounded-md`}
                    required={true}
                    error={formErrors[field.name]}
                  />
                ))}
              </div>
            </div>

            {/* Billing Address Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
              {/* Checkbox to Use Shipping Address as Billing Address */}
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="checkbox"
                  checked={!showBillingAddress}
                  onChange={handleBillingAddressToggle}
                  className="h-5 w-5 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="text-sm text-gray-700 cursor-pointer">
                  Use Shipping Address as Billing Address
                </label>
              </div>

              {/* Billing Address Fields */}
              {showBillingAddress && (
                <div className="grid grid-cols-2 gap-4">
                  {BillingInputFields.map((field) => (
                    <InputField
                      key={field.name}
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className={`${field.colSpan} p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      required={false}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Shipping Options */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
              <div className="space-y-3">
                {shippingOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <label
                      key={option.id}
                      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${selectedShipping === option.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'hover:border-gray-300'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value={option.id}
                          checked={selectedShipping === option.id}
                          onChange={(e) => setSelectedShipping(e.target.value)}
                          className="hidden"
                        />
                        <Icon className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="font-medium">{option.name}</p>
                          <p className="text-sm text-gray-500">{option.time}</p>
                        </div>
                      </div>
                      <span className="font-medium">£{option.price.toFixed(2)}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <label
                      key={method.id}
                      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${selectedPayment === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'hover:border-gray-300'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={selectedPayment === method.id}
                          onChange={(e) => setSelectedPayment(e.target.value)}
                          className="hidden"
                        />
                        <Icon className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-gray-500">{method.description}</p>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              {/* Items List */}
              <div className="space-y-4 mb-6">
                {cartProducts.map((item) => {
                  return (
                    <div key={item.id} className="flex items-center gap-4">
                      <Image
                        src={item.images?.[0]} 
                        alt={item.name}
                        width={64}
                        height={64}
                        className="object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          Quantity: {cartItem[item.id]}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          £{(Number(item.price) * (cartItem[item.id] || 0)).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          £{Number(item.price).toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Totals */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                {discount && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{discount}%</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>£{shipping.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Coupon Section */}

              <ApplyCoupon 
                setCouponCode={setCouponCode} 
                couponCode={couponCode} 
                discount={discount} 
                setDiscount={setDiscount} 
                isLoading={isLoading} 
                setIsLoading={setIsLoading} />


              {/* Terms and Conditions */}
              <div className="mt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="rounded text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the{' '}
                    <Link href="/TermsAndConditions" className="text-blue-500 hover:underline">
                      Terms and Conditions
                    </Link>{' '}
                    and{' '}
                    <Link href="/ReturnsPolicy" className="text-blue-500 hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              {!currentUser && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-6 rounded-lg shadow-md mt-4" role="alert">
                  <h2 className="text-lg font-bold mb-2">Login Required</h2>
                  <p className="text-sm mb-4">
                    You need to be logged in to place an order and track it easily. Please sign in using your Google account.
                  </p>
                  <button
                    className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 hover:shadow-md focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all"
                    onClick={() => signInWithGoogle()}
                  >
                    <Image
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      alt="Google logo"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                    <span>Sign in with Google</span>
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
                ) : (
                  <>
                    Place Order
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>

              {formErrors.submit && (
                <div className="mt-4 p-3 bg-red-50 rounded-lg flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                  <p>{formErrors.submit}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ShippingInputFields = [
  { type: 'text', name: 'firstName', placeholder: 'First Name', colSpan: 'col-span-1' },
  { type: 'text', name: 'lastName', placeholder: 'Last Name', colSpan: 'col-span-1' },
  { type: 'tel', name: 'phone', placeholder: 'Phone Number', colSpan: 'col-span-2' },
  { type: 'text', name: 'address', placeholder: 'Street Address', colSpan: 'col-span-2' },
  { type: 'text', name: 'city', placeholder: 'City', colSpan: 'p-2' },
  { type: 'text', name: 'state', placeholder: 'State', colSpan: 'p-2' },
];

const BillingInputFields = [
  { type: 'text', name: 'billingAddress', placeholder: 'Billing Street Address', colSpan: 'col-span-2' },
  { type: 'text', name: 'billingCity', placeholder: 'City', colSpan: 'col-span-1' },
  { type: 'text', name: 'billingState', placeholder: 'State', colSpan: 'col-span-1' },
];


