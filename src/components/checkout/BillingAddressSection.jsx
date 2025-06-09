import { ChevronDown, ChevronUp } from 'lucide-react';

const billingFields = [
  { name: 'billingAddress', label: 'Street Address', type: 'textarea' },
  { name: 'billingCity', label: 'City', type: 'text' },
  { name: 'billingState', label: 'State', type: 'text' }
];

export default function BillingAddressSection({
  show,
  onToggle,
  formData,
  onChange,
  errors
}) {
  return (
    <div className="border-t pt-4 mt-4">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="text-sm font-medium text-gray-700">
          Use Different Billing Address
        </span>
        {show ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {show && (
        <div className="mt-4 space-y-4">
          {billingFields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={(e) => onChange({ ...formData, [field.name]: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors[field.name] ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  rows={3}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={(e) => onChange({ ...formData, [field.name]: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors[field.name] ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              )}
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}