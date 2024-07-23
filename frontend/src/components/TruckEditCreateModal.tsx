import React, { ChangeEvent, FormEvent } from 'react';
import { TruckType } from '../types/types';

type TruckFormModalProps = {
    truck: TruckType | null;
    isCreating: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: FormEvent) => void;
    onCancel: () => void;
}

const TruckEditCreateModal: React.FC<TruckFormModalProps> = ({ truck, isCreating, onChange, onSubmit, onCancel }) => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
                {isCreating ? "Create New Truck" : "Edit Truck"}
            </h3>
            <form onSubmit={onSubmit} className="space-y-4">
                <label className="block">
                    <span className="text-gray-700">Brand:</span>
                    <input
                        type="text"
                        name="brand"
                        value={truck?.brand || ''}
                        onChange={onChange}
                        placeholder="Enter brand"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Load:</span>
                    <input
                        type="text"
                        name="load"
                        value={truck?.load || ''}
                        onChange={onChange}
                        placeholder="Enter load (kg)"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Capacity:</span>
                    <input
                        type="text"
                        name="capacity"
                        value={truck?.capacity || ''}
                        onChange={onChange}
                        placeholder="Enter capacity (kg)"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Year:</span>
                    <input
                        type="text"
                        name="year"
                        value={truck?.year || ''}
                        onChange={onChange}
                        placeholder="Enter year"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Number of Repairs:</span>
                    <input
                        type="text"
                        name="numberOfRepairs"
                        value={truck?.numberOfRepairs || ''}
                        onChange={onChange}
                        placeholder="Enter number of repairs"
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

export default TruckEditCreateModal;
