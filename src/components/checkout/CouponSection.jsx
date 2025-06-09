import { useState } from 'react';
import { Tag, Loader2, Check, AlertCircle } from 'lucide-react';

export default function CouponSection({ onApplyCoupon }) {
  const [couponCode, setCouponCode] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [status, setStatus] = useState(null);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setIsChecking(true);
    setStatus(null);

    try {
      const result = await onApplyCoupon(couponCode);
      setStatus({
        type: 'success',
        message: `Coupon applied! You save ${result.discount}%`,
        discount: result.discount
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="space-y-3 border-t pt-4 mt-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Have a coupon?</h3>
        {status?.type === 'success' && (
          <span className="text-sm text-green-600 flex items-center gap-1">
            <Check className="w-4 h-4" />
            {status.discount}% OFF
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="Enter code"
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={handleApplyCoupon}
          disabled={isChecking || !couponCode.trim()}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            isChecking || !couponCode.trim()
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isChecking ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Apply'}
        </button>
      </div>

      {status && (
        <div className={`flex items-center gap-2 text-sm ${
          status.type === 'success' ? 'text-green-600' : 'text-red-500'
        }`}>
          {status.type === 'success' ? (
            <Check className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          {status.message}
        </div>
      )}
    </div>
  );
}