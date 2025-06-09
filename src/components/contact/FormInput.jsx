export function FormInput({
    label,
    name,
    type = 'text',
    value,
    onChange,
    error,
    required = false,
    placeholder,
    className = '',
    ...props
}) {
    return (
    <div className="space-y-1">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
            <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`
                block w-full rounded-md border-gray-300 shadow-sm p-2
                focus:border-sky-500 focus:ring-sky-500 
                transition duration-150 ease-in-out
                ${error ? 'border-red-300' : ''}
                ${className}
            `}
            {...props}
            />
            {error && (
            <p className="mt-1 text-xs text-red-600 absolute">
                {error}
            </p>
            )}
        </div>
    </div>
);
}
