  export default function SpecificationTable({ specifications }) {
    return (
      <div className="mt-6">
        <table className="w-full text-sm text-left text-gray-700 mb-4 border-collapse">
          <thead>
            <tr>
              <th className="p-3 bg-gray-200 font-semibold rounded-tl-lg">Specification</th>
              <th className="p-3 bg-gray-200 font-semibold rounded-tr-lg">Details</th>
            </tr>
          </thead>
          <tbody>
            {specifications.map((spec, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-gray-100 transition-colors duration-150`}
              >
                <td className="p-3 font-semibold border-t">{spec.placeholder}</td>
                <td className="p-3 border-t">{spec.value || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }