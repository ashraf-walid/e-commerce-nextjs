import { ArrowLeft, Loader2 } from 'lucide-react';

const InputField = ({ field, value, onChange, error }) => {
  const isTextarea = field.type === 'textarea';
  const Component = isTextarea ? 'textarea' : 'input';
  
  return (
    <div className={`${field.span} space-y-1`}>
      <label className="block text-sm font-medium text-gray-700" htmlFor={field.name}>
        {field.label}
      </label>
      <Component
        id={field.name}
        name={field.name}
        type={field.type}
        value={value}
        onChange={onChange}
        rows={isTextarea ? 3 : undefined}
        className={`w-full px-3 py-2 rounded-lg border transition-colors duration-200 ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
        } focus:ring-2 focus:border-transparent`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${field.name}-error` : undefined}
      />
      {error && (
        <p id={`${field.name}-error`} className="text-red-500 text-sm mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

const DeliveryForm = ({
  formData,
  errors,
  onChange,
  onSubmit,
  onBack,
  isSubmitting,
  children
}) => {
  const inputFields = [
    { name: 'firstName', label: 'First Name', type: 'text', span: 'col-span-1' },
    { name: 'lastName', label: 'Last Name', type: 'text', span: 'col-span-1' },
    { name: 'phone', label: 'Phone Number', type: 'tel', span: 'col-span-2' },
    { name: 'address', label: 'Delivery Address', type: 'textarea', span: 'col-span-2' },
    { name: 'city', label: 'City', type: 'text', span: 'col-span-1' },
    { name: 'state', label: 'State', type: 'text', span: 'col-span-1' }
  ];

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...formData, [name]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      <form onSubmit={onSubmit} className="space-y-6" noValidate>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Delivery Details</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {inputFields.map((field) => (
              <InputField
                key={field.name}
                field={field}
                value={formData[field.name] || ''}
                onChange={handleFieldChange}
                error={errors[field.name]}
              />
            ))}
          </div>

          <div className="space-y-6">
            {children}
          </div>
        </div>

        <div className="space-y-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              'Review Order'
            )}
          </button>

          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg p-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back to Payment Methods</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeliveryForm;