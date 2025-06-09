export function FilterStats({ resultsCount, totalCount }) {
    return (
        <div className="bg-blue-100 px-3 py-1 rounded-md shadow-sm flex items-center text-sm text-gray-600">
            <span className="text-blue-600 font-bold mr-1">{resultsCount}</span>
            <span>of</span>
            <span className="text-gray-800 font-bold ml-1">{totalCount}</span>
            <span className="ml-2 text-gray-500">products found</span>
        </div>
    );
}

