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
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
                {isCreating ? "Create New Trip" : "Edit Trip"}
            </h3>
            <form onSubmit={onSubmit} className="space-y-4">
                <label className="block">
                    <span className="text-gray-700">Id:</span>
                    <input
                        type="text"
                        name="id"
                        value={trip?.id || ''}
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
                    <span className="text-gray-700">Drivers:</span>
                    <input
                        type="text"
                        name="drivers"
                        value={trip?.drivers || ''}
                        onChange={onChange}
                        placeholder="Enter drivers"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Shipments:</span>
                    <input
                        type="text"
                        name="shipments"
                        //have to do this weird thing as '0' is not deletable otherwise
                        value={trip?.shipments || ''}
                        // value={truck?.numberOfRepairs || ''}
                        onChange={onChange}
                        placeholder="Enter shipments"
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

