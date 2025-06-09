import { ShoppingCart, Heart } from 'lucide-react';

export default function ProductActions({
  onAddToCart,
  onToggleFavorite,
  onBuyNow,
  cartItemCount,
  isFavorite,
  isProcessing,
  isInBuyingProcess
}) {
  return (
    <div className="space-y-4">
      <div className="flex justify-center items-center">
        <button
          className={`w-10 h-10 flex justify-center items-center mr-2 rounded-md duration-300 ${
            isFavorite ? 'bg-red-100 text-red-500' : 'bg-gray-200 hover:bg-slate-300'
          }`}
          onClick={onToggleFavorite}
          disabled={isProcessing}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
        
        <button
          onClick={onAddToCart}
          className="flex items-center justify-center gap-2 w-full h-10 border border-blue-500 rounded-md px-4 py-2 hover:bg-blue-500 text-base duration-300 font-semibold hover:text-white relative hover:scale-[1.02] text-blue-500"
        >
          Add To Cart <ShoppingCart className="w-5 h-5" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>

      <button
        onClick={onBuyNow}
        disabled={isInBuyingProcess}
        className={`w-full py-3 px-4 rounded-md font-semibold text-white transition-all duration-300 ${
          isInBuyingProcess
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
        }`}
      >
        {isInBuyingProcess ? 'Processing...' : 'Buy Now'}
      </button>
    </div>
  );
}