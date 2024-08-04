import React, { ChangeEvent, FormEvent } from 'react';
import { ShipmentsType } from '../types/types';

type ShipmentFormModalProps = {
    shipment: ShipmentsType | null;
    isCreating: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: FormEvent) => void;
    onCancel: () => void;
}

const ShipmentEditCreateModal: React.FC<ShipmentFormModalProps> = ({ shipment, isCreating, onChange, onSubmit, onCancel }) => {
    // Helper function to format Date object to YYYY-MM-DD string
    const formatDate = (date: Date | undefined | null): string => {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            return ''; // Return an empty string if date is invalid or null
        }
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">
                    {isCreating ? "Create New Shipment" : "Edit Shipment"}
                </h3>
                <form onSubmit={onSubmit} className="space-y-4">
                    <label className="block">
                        <span className="text-gray-700">Shipment Id:</span>
                        <input
                            type="text"
                            name="shipmentId"
                            value={shipment?.shipmentId || ''}
                            onChange={onChange}
                            placeholder="Enter id"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Driver Name:</span>
                        <input
                            type="text"
                            name="driverName"
                            value={shipment?.driverName || ''}
                            onChange={onChange}
                            placeholder="Enter driver's name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Customer Name:</span>
                        <input
                            type="text"
                            name="customerName"
                            value={shipment?.customerName || ''}
                            onChange={onChange}
                            placeholder="Enter customer's name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Load (kg):</span>
                        <input
                            type="number"
                            name="load"
                            value={shipment?.load || ''}
                            onChange={onChange}
                            placeholder="Enter load in kg"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Pick Up Location:</span>
                        <input
                            type="text"
                            name="pickUpLocation"
                            value={shipment?.pickUpLocation || ''}
                            onChange={onChange}
                            placeholder="Enter pick up location"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Destination:</span>
                        <input
                            type="text"
                            name="destination"
                            value={shipment?.destination || ''}
                            onChange={onChange}
                            placeholder="Enter destination"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Value:</span>
                        <input
                            type="number"
                            name="value"
                            value={shipment?.value || ''}
                            onChange={onChange}
                            placeholder="Enter value of shipment"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Shipment Date:</span>
                        <input
                            type="date"
                            name="shipmentDate"
                            value={formatDate(shipment?.shipmentDate)}
                            onChange={onChange}
                            placeholder="Enter shipment date"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Should Be Delivered Before:</span>
                        <input
                            type="date"
                            name="shouldBeDeliveredBefore"
                            value={formatDate(shipment?.shouldBeDeliveredBefore)}
                            onChange={onChange}
                            placeholder="Enter delivery deadline"
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
};

export default ShipmentEditCreateModal;