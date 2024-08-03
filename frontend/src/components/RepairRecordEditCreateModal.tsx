import React, { ChangeEvent, FormEvent } from 'react';
import { RepairRecordType } from '../types/types';

type RepirRecordFormModalProps = {
    repairrecord: RepairRecordType | null;
    isCreating: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: FormEvent) => void;
    onCancel: () => void;
}

const RepairRecordEditCreateModal: React.FC<RepirRecordFormModalProps> = ({ repairrecord, isCreating, onChange, onSubmit, onCancel }) => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
                {isCreating ? "Create New RepirRecord" : "Edit RepirRecord"}
            </h3>
            <form onSubmit={onSubmit} className="space-y-4">
                <label className="block">
                    <span className="text-gray-700">Id:</span>
                    <input
                        type="text"
                        name="id"
                        value={repairrecord?.id || ''}
                        onChange={onChange}
                        placeholder="Enter ID"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Mechanic:</span>
                    <input
                        type="text"
                        name="mechanic"
                        value={repairrecord?.mechanic || ''}
                        onChange={onChange}
                        placeholder="Enter mechanic"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Estimated Repair Time:</span>
                    <input
                        type="text"
                        name="estimatedRepairTime"
                        value={repairrecord?.estimatedRepairTime || ''}
                        onChange={onChange}
                        placeholder="Enter estimatedRepairTime"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Truck:</span>
                    <input
                        type="text"
                        name="truck"
                        value={repairrecord?.truck || ''}
                        onChange={onChange}
                        placeholder="Enter truck"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                
                <div className="flex justify-end space-x-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
                    >
                        {isCreating ? "Create" : "Save"}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
);

export default RepairRecordEditCreateModal;

