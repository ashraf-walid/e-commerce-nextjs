import PropTypes from 'prop-types';

export function FormTextArea({
    label,
    name,
    value,
    onChange,
    error,
    required = false,
    rows = 4,
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
            <textarea
            id={name}
            name={name}
            rows={rows}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`
                block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-sky-500 focus:ring-sky-500 p-2
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

FormTextArea.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    required: PropTypes.bool,
    rows: PropTypes.number,
    placeholder: PropTypes.string,
    className: PropTypes.string
};