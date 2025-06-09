import { formatDate } from '@/utils/dateFormatter';
import OrderStatusBadge from './OrderStatusBadge';
import { Package } from 'lucide-react';

export default function OrdersTable({ orders, onStatusChange, onViewDetails }) {
  
  return (
  <div className="overflow-x-auto max-sm:p-2 ">
    <table className="w-full table-auto max-sm:hidden"> 
      <thead className="bg-gray-50">
        <tr>
          <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Order Info
          </th>
          <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Customer
          </th>
          <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Total
          </th>
          <th className="px-1 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {orders.map((order) => (
          <tr key={order.id} className="hover:bg-gray-50">
            <td className="px-2 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <Package className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <div className="text-xs font-medium text-gray-900">
                    {order.orderNumber}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(order.createdAt)}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-1 py-4">
              <div className="text-xs text-gray-900">{order.firstName} {order.lastName}</div>
              <div className="text-xs text-gray-500 truncate max-w-[160px]" title={order.UserEmail}>
                {order.UserEmail}
              </div>
            </td>
            <td className="px-2 py-4">
              <OrderStatusBadge 
                status={order.status}
                onChange={(status) => onStatusChange(order.id, status)}
              />
            </td>
            <td className="pl-1 whitespace-nowrap">
              <div className="text-xs font-medium text-gray-900">
                £{order.total}
              </div>
            </td>
            <td className="px-2 py-4 text-right">
              <button
                onClick={() => onViewDetails(order)}
                className="text-blue-600 hover:text-blue-900 text-xs font-medium"
              >
                View Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="bg-blue-100 p-4 rounded-lg shadow-lg text-center text-gray-800 sm:hidden mb-4">
      <h2 className="text-sm font-semibold">Orders Overview</h2>
      <p className="text-xs">Here is the list of your orders, you can filter or view details below.</p>
    </div>

    {/* Display data stacked on small screens */}
    <div className="block sm:hidden">
      {orders.map((order) => (
        <div key={order.id} className="bg-white shadow rounded-lg p-4 mb-6">
          <div className="flex flex-col gap-2">
            <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
            <div className="text-sm text-gray-500">{formatDate(order.createdAt)}</div>
          </div>
          <div className="mt-2 text-sm text-gray-900 font-bold">{order.firstName} {order.lastName}</div>
          <div className="text-sm text-gray-500 truncate max-w-[200px]" title={order.UserEmail}>
            {order.UserEmail}
          </div>
          <div className="mt-2 text-sm font-medium text-gray-900">£{order.total}</div>
          <div className="mt-2">
            <OrderStatusBadge 
              status={order.status}
              onChange={(status) => onStatusChange(order.id, status)}
            />
          </div>
          <div className="mt-2 text-right">
            <button
              onClick={() => onViewDetails(order)}
              className="text-blue-600 hover:text-blue-900 text-sm font-medium"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}   
