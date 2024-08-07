import React, { ChangeEvent, FormEvent } from 'react';
import { TripsType } from '../types/types';

type TripFormModalProps = {
    trip: TripsType | null;
    isCreating: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: FormEvent) => void;
    onCancel: () => void;
}

const TripEditCreateModal: React.FC<TripFormModalProps> = ({ trip, isCreating, onChange, onSubmit, onCancel }) => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg max-h-screen overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">
                {isCreating ? "Create New Trip" : "Edit Trip"}
            </h3>
            <form onSubmit={onSubmit} className="space-y-4">
                <label className="block">
                    <span className="text-gray-700">Trip Id:</span>
                    <input
                        type="text"
                        name="id"
                        value={trip?.tripId || ''}
                        onChange={onChange}
                        placeholder="Enter id"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">From Route:</span>
                    <input
                        type="text"
                        name="route_from"
                        value={trip?.route_from || ''}
                        onChange={onChange}
                        placeholder="Enter route_from"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">To Route:</span>
                    <input
                        type="text"
                        name="route_to"
                        value={trip?.route_to || ''}
                        onChange={onChange}
                        placeholder="Enter route_to"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">First Driver:</span>
                    <input
                        type="text"
                        name="driver_0"
                        value={trip?.drivers[0] || ''}
                        onChange={onChange}
                        placeholder="Enter first driver"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Second Driver:</span>
                    <input
                        type="text"
                        name="driver_1"
                        value={trip?.drivers[1] || ''}
                        onChange={onChange}
                        placeholder="Enter second driver"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Shipment One:</span>
                    <input
                        type="text"
                        name="shipment_0"
                        value={trip?.shipments[0] || ''}
                        onChange={onChange}
                        placeholder="Enter first shipment"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Shipment Two:</span>
                    <input
                        type="text"
                        name="shipment_1"
                        value={trip?.shipments[1] || ''}
                        onChange={onChange}
                        placeholder="Enter second shipment"
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

export default TripEditCreateModal;

