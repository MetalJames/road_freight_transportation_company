import React, { ChangeEvent, FormEvent } from 'react';
import { EmployeeType } from '../types/types';

type EmployeeFormModalProps = {
    employee: EmployeeType | null;
    isCreating: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: FormEvent) => void;
    onCancel: () => void;
}

const EmployeeEditCreateModal: React.FC<EmployeeFormModalProps> = ({ employee, isCreating, onChange, onSubmit, onCancel }) => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
                {isCreating ? "Create New Employee" : "Edit Employee"}
            </h3>
            <form onSubmit={onSubmit} className="space-y-4">
                <label className="block">
                    <span className="text-gray-700">Name:</span>
                    <input
                        type="text"
                        name="name"
                        value={employee?.name || ''}
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
                        value={employee?.surname || ''}
                        onChange={onChange}
                        placeholder="Enter surname"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Seniority:</span>
                    <input
                        type="text"
                        name="seniority"
                        value={employee?.seniority || ''}
                        onChange={onChange}
                        placeholder="Enter seniority"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Type:</span>
                    <input
                        type="text"
                        name="type"
                        value={employee?.type || ''}
                        onChange={onChange}
                        placeholder="Enter type"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Category:</span>
                    <input
                        type="text"
                        name="category"
                        //have to do this weird thing as '0' is not deletable otherwise
                        value={employee?.category || ''}
                        // value={truck?.numberOfRepairs || ''}
                        onChange={onChange}
                        placeholder="Enter category"
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

export default EmployeeEditCreateModal;

