import { Clock, CheckCircle, Truck, XCircle } from 'lucide-react';

const statusConfig = {
  pending: {
    icon: Clock,
    color: 'text-yellow-700',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200'
  },
  processing: {
    icon: Truck,
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200'
  },
  completed: {
    icon: CheckCircle,
    color: 'text-green-700',
    bg: 'bg-green-50',
    border: 'border-green-200'
  },
  cancelled: {
    icon: XCircle,
    color: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200'
  }
};

export default function OrderStatusBadge({ status, onChange }) {
  const config = statusConfig[status] || statusConfig.pending;
  const StatusIcon = config.icon;

  return (
    <div className="inline-flex items-center">
      <select
        value={status}
        onChange={(e) => onChange(e.target.value)}
          className={`${config.bg} ${config.color} ${config.border} text-xs sm:text-base rounded-full sm:px-3 py-1 border 
          focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer`}
      >
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <StatusIcon className={`${config.color} w-4 h-4 ml-1`} />
    </div>
  );
}
