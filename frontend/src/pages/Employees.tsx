import React, { useState, useEffect } from "react";
import axios from "axios";
import { EmployeeType } from "../types/types";
import { ConfirmationModal, SuccessModal, EmployeeEditCreateModal } from "../components";

type EmployeesComponentProps = {
    employees: EmployeeType[];
}

const Employees: React.FC<EmployeesComponentProps> = () => {
    const [employees, setEmployees] = useState<EmployeeType[]>([]);
    const [editEmployee, setEditEmployee] = useState<EmployeeType | null>(null);
    const [newEmployee, setNewEmployee] = useState<EmployeeType>({
        name: '',
        surname: '',
        seniority: 0,
        type: 'Driver',
        category: '',
        specializedBrand: ''
    });
    const [isCreating, setIsCreating] = useState<boolean>(false);

    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/employees");
                setEmployees(response.data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };

        fetchEmployees();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        let formattedValue: string | number = value;

        // Handle special cases for specific fields
        if (name === 'category') {
            // Convert to uppercase and allow only 'A-D'
            formattedValue = value.toUpperCase().replace(/[^A-D]/g, '');
        } else if (name === 'type') {
            // Convert to uppercase
            formattedValue = value;
        } else if (name === 'seniority') {
            // Convert to number, if applicable
            formattedValue = value === '' ? '' : Number(value);
        }

        console.log(`Name: ${name}, Value: ${formattedValue}`);
        //const numberValue = value === '' ? '' : (name === 'seniority' ? Number(value) : value);

        if (isCreating) {
            setNewEmployee({
                ...newEmployee,
                //[name]: numberValue
                [name]: formattedValue
            });
        } else if (editEmployee) {
            setEditEmployee({
                ...editEmployee,
                //[name]: numberValue
                [name]: formattedValue
            });
        }
    };

    const handleEditClick = (employee: EmployeeType) => {
        setEditEmployee(employee);
        setIsCreating(false); // Ensure we're not in "create" mode
    };

    const handleCreateClick = () => {
        setEditEmployee(null);
        setIsCreating(true); // Set the component to "create" mode
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const employeeData = {...newEmployee};

        // Conditionally exclude specializedBrand for non-mechanic types
        if (isCreating && newEmployee.type !== 'Mechanic' && 'specializedBrand' in employeeData) {
            delete employeeData.specializedBrand;
        }

        if (isCreating) {
            try {
                const response = await axios.post("http://localhost:5000/api/employees", employeeData);
                console.log("Employee created successfully:", response.data);

                // Add the new employee to the list
                setEmployees([...employees, response.data]);

                // Clear the newEmployee state
                setNewEmployee({
                    name: '',
                    surname: '',
                    seniority: 0,
                    type: 'Driver',
                    category: '',
                    specializedBrand: ''
                });

                // Exit create mode
                setIsCreating(false);

                // Set success message and open success modal
                setSuccessMessage("Employee created successfully.");
                setIsSuccessModalOpen(true);
            } catch (error) {
                console.error("Error creating employee:", error);
            }
        } else if (editEmployee) {
            try {
                const response = await axios.put(
                    `http://localhost:5000/api/employees/${editEmployee._id}`,
                    editEmployee
                );
                console.log("Employee updated successfully:", response.data);

                // Update the employeeList state without refreshing the page
                setEmployees((prevEmployees) =>
                    prevEmployees.map((employee) =>
                        employee._id === editEmployee._id ? editEmployee : employee
                    )
                );

                // Clear the editEmployee state to close the edit form
                setEditEmployee(null);

                // Set success message and open success modal
                setSuccessMessage("Employee updated successfully.");
                setIsSuccessModalOpen(true);
            } catch (error) {
                console.error("Error updating employee:", error);
            }
        }
    };    

    const handleCancel = () => {
        setEditEmployee(null);
        setIsCreating(false); // Exit create mode
    };

    const handleDeleteClick = (id: string | undefined) => {
        if (!id) return;
        setEmployeeToDelete(id);
        setIsConfirmDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (employeeToDelete) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/employees/${employeeToDelete}`);
                if (response.status === 200) {
                    setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== employeeToDelete));
                    
                    // Set success message and open success modal
                    setSuccessMessage("An employee successfully deleted.");
                    setIsSuccessModalOpen(true);
                }
            } catch (error) {
                console.error("Error deleting employee:", error);
            }
        }
        setIsConfirmDeleteModalOpen(false);
        setEmployeeToDelete(null);
    };

    const cancelDelete = () => {
        setIsConfirmDeleteModalOpen(false);
        setEmployeeToDelete(null);
    };


    return (
        <div className="p-6 bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Employees</h2>
            <button 
                onClick={handleCreateClick} 
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
            >
                Create New Employee
            </button>
            <ul className="space-y-4">
                {employees.map((employee) => (
                <li 
                    key={employee._id} 
                    className="p-4 bg-white shadow rounded flex justify-between items-center"
                >
                <div>
                    <span className="block text-lg font-semibold">Employee: {employee.name} {employee.surname}</span>
                    <span className="block text-sm text-gray-500">Seniority: {employee.seniority} years</span>
                    <span className="block text-sm text-gray-500">Type: {employee.type}</span>
                    <span className="block text-sm text-gray-500">Category: {employee.category}</span>
                    {/* {employee.type === 'driver' && (
                    )} */}
                    {employee.type === 'Mechanic' && (
                        <span className="block text-sm text-gray-500">Specialized Brand: {employee.specializedBrand}</span>
                    )}
                </div>
                    <div>
                        <button 
                            onClick={() => handleEditClick(employee)} 
                            className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300"
                        >
                            Edit
                        </button>
                        <button
                        onClick={() => handleDeleteClick(employee._id)}
                        className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
                        >
                            Delete
                        </button>
                    </div>
                </li>
                ))}
            </ul>

            {(isCreating || editEmployee) && (
                <EmployeeEditCreateModal
                    employee={isCreating ? newEmployee : editEmployee}
                    isCreating={isCreating}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            )}
            {isConfirmDeleteModalOpen && (
                <ConfirmationModal onConfirm={confirmDelete} onCancel={cancelDelete} />
            )}
            {isSuccessModalOpen && (
                <SuccessModal message={successMessage} onClose={() => setIsSuccessModalOpen(false)} />
            )}
        </div>
    );
};


export default Employees;


