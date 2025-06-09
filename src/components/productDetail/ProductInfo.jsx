import { Wallet, RefreshCw } from 'lucide-react';

export default function ProductInfo({ name, description, brand, price }) {
  const formattedPrice = price.toLocaleString('en-US', { minimumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-md shadow-md border">
        <h1 className="text-3xl font-bold text-gray-800 mb-3 tracking-tight">
          {name}
        </h1>

        <p className="text-gray-600 text-base leading-relaxed mb-4">
          <span className="font-semibold text-gray-700">Description:</span> {description}
        </p>

        <p className="text-base text-gray-600 mb-4">
          <span className="font-semibold text-gray-700">Brand:</span> {brand}
        </p>

        <div className="flex items-center gap-2 text-xl font-bold text-blue-600">
          <span>{formattedPrice}</span>
          {/* <span className="text-sm text-gray-500">EGP</span> */}
        </div>
      </div>

      <div className="flex justify-center gap-x-8 py-4 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col items-center gap-y-2">
          <Wallet className="w-6 h-6 text-blue-500" />
          <p className="text-sm font-semibold">Cash on delivery</p>
          <span className="text-xs text-gray-500">Cash or card</span>
        </div>

        <div className="flex flex-col items-center gap-y-2 border-l pl-8">
          <RefreshCw className="w-6 h-6 text-blue-500" />
          <p className="text-sm font-semibold">Return for free</p>
          <span className="text-xs text-gray-500">Up to 30 days</span>
        </div>
      </div>
    </div>
  );
}