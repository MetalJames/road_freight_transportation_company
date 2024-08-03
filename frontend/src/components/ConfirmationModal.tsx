const ConfirmationModal = ({ onConfirm, onCancel }: { onConfirm: () => void, onCancel: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl font-semibold">Confirm Deletion</h3>
            <p>Do you really wish to delete?</p>
            <div className="mt-4 flex justify-end space-x-4">
                <button 
                    onClick={onConfirm}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
                >
                    Yes
                </button>
                <button 
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-300"
                >
                    No
                </button>
            </div>
        </div>
    </div>
);

export default ConfirmationModal
