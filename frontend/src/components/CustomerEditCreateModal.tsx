import React, { ChangeEvent, FormEvent } from 'react';
import { CustomerType } from '../types/types';

type CustomerFormModalProps = {
    customer: CustomerType | null;
    isCreating: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: FormEvent) => void;
    onCancel: () => void;
}

const CustomerEditCreateModal: React.FC<CustomerFormModalProps> = ({ customer, isCreating, onChange, onSubmit, onCancel }) => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg max-h-screen overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">
                {isCreating ? "Create New Customer" : "Edit Customer"}
            </h3>
            <form onSubmit={onSubmit} className="space-y-4">
                <label className="block">
                    <span className="text-gray-700">Name:</span>
                    <input
                        type="text"
                        name="name"
                        value={customer?.name || ''}
                        onChange={onChange}
                        placeholder="Enter name"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Surname:</span>
                    <input
                        type="text"
                        name="surname"
                        value={customer?.surname || ''}
                        onChange={onChange}
                        placeholder="Enter surname"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Address:</span>
                    <input
                        type="text"
                        name="address"
                        value={customer?.address || ''}
                        onChange={onChange}
                        placeholder="Enter address"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">First Phone Number:</span>
                    <input
                        type="text"
                        name="phone_0"  // Updated from 'firstphone' to 'phone_0'
                        value={customer?.phone[0] || ''}
                        onChange={onChange}
                        placeholder="Enter first phone number"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Second Phone Number:</span>
                    <input
                        type="text"
                        name="phone_1"  // Updated from 'secondphone' to 'phone_1'
                        value={customer?.phone[1] || ''}
                        onChange={onChange}
                        placeholder="Enter second phone number"
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

export default CustomerEditCreateModal;

