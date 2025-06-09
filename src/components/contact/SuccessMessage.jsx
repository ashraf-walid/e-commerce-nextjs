import PropTypes from 'prop-types';
import { CheckCircle2 } from 'lucide-react';

export function SuccessMessage({ message, onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex flex-col items-center text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
            <h3 className="text-xl font-semibold text-gray-900">Sent successfully</h3>
            <p className="text-gray-600">{message}</p>
            <button
                onClick={onClose}
                className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition duration-150 ease-in-out"
            >
                ok
            </button>
            </div>
        </div>
        </div>
    );
}

SuccessMessage.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};