
import { Truck, Phone, CreditCard } from 'lucide-react';

const paymentMethods = [
  {
    id: 'delivery',
    title: 'Cash on Delivery',
    description: 'Pay when you receive your order',
    icon: Truck,
    color: 'bg-emerald-500',
    hover: 'hover:bg-emerald-600',
  },
  {
    id: 'vodafone',
    title: 'Vodafone Cash',
    description: 'Pay instantly via Vodafone Cash',
    icon: Phone,
    color: 'bg-red-500',
    hover: 'hover:bg-red-600',
  },
  {
    id: 'card',
    title: 'Credit Card',
    description: 'Secure online payment',
    icon: CreditCard,
    color: 'bg-blue-500',
    hover: 'hover:bg-blue-600',
  },
];

export default function PaymentMethods({ onMethodSelect, onClose }) {
  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Choose Payment Method
      </h2>

      <div className="space-y-3">
        {paymentMethods.map(method => (
          <button
            key={method.id}
            onClick={() => onMethodSelect(method.id)}
            className={`w-full ${method.color} ${method.hover} text-white rounded-xl p-4 transition-all duration-200 transform hover:-translate-y-1`}
          >
            <div className="flex items-center gap-4">
              <method.icon className="w-6 h-6" />
              <div className="text-left">
                <div className="font-semibold">{method.title}</div>
                <div className="text-sm opacity-90">{method.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={onClose}
        className="w-full mt-4 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md text-sm duration-300"
      >
          Continue Shopping
      </button>

    </div>
  );
}
