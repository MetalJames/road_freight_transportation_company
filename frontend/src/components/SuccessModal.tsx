const SuccessModal = ({  message, onClose }: { message: string, onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl font-semibold">Success</h3>
            <p>{message}</p>
            <div className="mt-4 flex justify-end">
                <button 
                    onClick={onClose}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
                >
                    OK
                </button>
            </div>
        </div>
    </div>
);

export default SuccessModal