export default function InputField({ 
    type, 
    name, 
    placeholder, 
    value, 
    onChange, 
    className, 
    required, 
    error 
  }) {
    return (
      <div className="flex flex-col">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${className} ${error ? 'border-red-500' : ''}`}
          required={required}
        />
        {error && (
          <p className="text-sm text-red-500 mt-1">{error}</p>
        )}
      </div>
    );
  }