export default function OrderConfirmation({ formData, onBack, onConfirm }) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Review Your Order</h2>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <ul className="space-y-4">
            <li className="flex flex-col">
              <span className="text-sm text-gray-600">Full Name</span>
              <span className="font-medium text-gray-900">{formData.fullName}</span>
            </li>
            <li className="flex flex-col">
              <span className="text-sm text-gray-600">Delivery Address</span>
              <span className="font-medium text-gray-900">{formData.address}</span>
            </li>
            <li className="flex flex-col">
              <span className="text-sm text-gray-600">Phone Number</span>
              <span className="font-medium text-gray-900">{formData.phone}</span>
            </li>
          </ul>
        </div>
  
        <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
          Please verify all information before confirming your order.
        </div>
  
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg p-3 font-medium transition-colors duration-200"
          >
            Edit Details
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-3 font-medium transform transition-all duration-200 hover:scale-[1.02]"
          >
            Confirm Order
          </button>
        </div>
      </div>
    );
  }