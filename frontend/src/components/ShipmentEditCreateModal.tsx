import React, { ChangeEvent, FormEvent } from 'react';
import { ShipmentsType } from '../types/types';

type ShipmentFormModalProps = {
    shipment: ShipmentsType | null;
    isCreating: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: FormEvent) => void;
    onCancel: () => void;
}

const ShipmentEditCreateModal: React.FC<ShipmentFormModalProps> = ({ shipment, isCreating, onChange, onSubmit, onCancel }) => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
                {isCreating ? "Create New Shipment" : "Edit Shipment"}
            </h3>
            <form onSubmit={onSubmit} className="space-y-4">
                <label className="block">
                    <span className="text-gray-700">Id:</span>
                    <input
                        type="text"
                        name="id"
                        value={shipment?.id || ''}
                        onChange={onChange}
                        placeholder="Enter id"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Weight:</span>
                    <input
                        type="text"
                        name="weight"
                        value={shipment?.weight || ''}
                        onChange={onChange}
                        placeholder="Enter weight (kg)"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Value:</span>
                    <input
                        type="text"
                        name="value"
                        value={shipment?.value || ''}
                        onChange={onChange}
                        placeholder="Enter value"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Origin:</span>
                    <input
                        type="text"
                        name="origin"
                        value={shipment?.origin || ''}
                        onChange={onChange}
                        placeholder="Enter origin"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Destination:</span>
                    <input
                        type="text"
                        name="destination"
                        //have to do this weird thing as '0' is not deletable otherwise
                        value={shipment?.destination || ''}
                        // value={truck?.numberOfRepairs || ''}
                        onChange={onChange}
                        placeholder="Enter destination"
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

export default ShipmentEditCreateModal;

