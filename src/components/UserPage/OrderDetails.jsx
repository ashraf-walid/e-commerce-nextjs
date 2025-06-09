import { X, MapPin, CreditCard, Package, Truck } from 'lucide-react';

export default function OrderDetails({ order, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Order Number</p>
              <p className="font-medium">{order.orderNumber}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Date Placed</p>
              <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-500" />
              Order Items
            </h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b last:border-0">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium">£{item.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-500" />
              Shipping Details
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="font-medium">{order.firstName} {order.lastName}</p>
                  <p className="text-gray-600">{order.address}</p>
                  <p className="text-gray-600">{order.city}, {order.state}</p>
                  <p className="text-gray-600">{order.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-500" />
              Payment Details
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>£{order.subtotal}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({order.discount}%)</span>
                  <span>-£{(order.subtotal * order.discount / 100).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{order.shipping.price === 0 ? 'Free' : `£${order.shipping.price}`}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Total</span>
                <span>£{order.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}