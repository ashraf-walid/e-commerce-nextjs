export function FilterSection({ title, options, selected, onChange }) {
    
    // options = {[Dell, HP], [i3, ....], [8GB, .... ], [128GB, ....],}

    const isSelected = (option) => selected.includes(option);

    const toggleOption = (option) => {
        onChange(
            isSelected(option)
                ? selected.filter((item) => item !== option)
                : [...selected, option]
        );
    };

    return (
        <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">{title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {options.map((option, index) => (
                    <button
                        key={`${option}-${index}`}
                        className={`text-sm px-3 py-2 rounded-lg border ${
                            isSelected(option)
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-800 border-gray-300"
                        } hover:bg-blue-100`}
                        onClick={() => toggleOption(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}
