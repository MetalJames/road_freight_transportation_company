import React, { useState, useEffect } from "react";
import axios from "axios";
import ConfirmationModal from "./ConfirmationModal";
import SuccessModal from "./SuccessModal";
import TruckEditCreateModal from "./TruckEditCreateModal";
import { Truck } from '../types/types';

type TrucksComponentProps = {
    trucks: Truck[];
}

const TrucksComponent: React.FC<TrucksComponentProps> = () => {
    const [trucks, setTrucks] = useState<Truck[]>([]);
    const [editTruck, setEditTruck] = useState<Truck | null>(null);
    const [newTruck, setNewTruck] = useState<Truck>({
        brand: '',
        load: 0,
        capacity: 0,
        year: 0,
        numberOfRepairs: 0
    });
    const [isCreating, setIsCreating] = useState<boolean>(false);

    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [truckToDelete, setTruckToDelete] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrucks = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/trucks");
                setTrucks(response.data);
            } catch (error) {
                console.error("Error fetching trucks:", error);
            }
        };

        fetchTrucks();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numberValue = name === 'numberOfRepairs' || name === 'load' || name === 'capacity' || name === 'year'
            ? Number(value)
            : value;

        if (isCreating) {
            setNewTruck({
                ...newTruck,
                [name]: numberValue
            });
        } else if (editTruck) {
            setEditTruck({
                ...editTruck,
                [name]: numberValue
            });
        }
    };

    const handleEditClick = (truck: Truck) => {
        setEditTruck(truck);
        setIsCreating(false); // Ensure we're not in "create" mode
    };

    const handleCreateClick = () => {
        setEditTruck(null);
        setIsCreating(true); // Set the component to "create" mode
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isCreating) {
            try {
                const response = await axios.post("http://localhost:5000/api/trucks", newTruck);
                console.log("Truck created successfully:", response.data);

                // Add the new truck to the list
                setTrucks([...trucks, response.data]);

                // Clear the newTruck state
                setNewTruck({
                    brand: '',
                    load: 0,
                    capacity: 0,
                    year: 0,
                    numberOfRepairs: 0
                });

                // Exit create mode
                setIsCreating(false);

                // Set success message and open success modal
                setSuccessMessage("Truck created successfully.");
                setIsSuccessModalOpen(true);
            } catch (error) {
                console.error("Error creating truck:", error);
            }
        } else if (editTruck) {
            try {
                const response = await axios.put(
                    `http://localhost:5000/api/trucks/${editTruck._id}`,
                    editTruck
                );
                console.log("Truck updated successfully:", response.data);

                // Update the truckList state without refreshing the page
                setTrucks((prevTrucks) =>
                    prevTrucks.map((truck) =>
                        truck._id === editTruck._id ? editTruck : truck
                    )
                );

                // Clear the editTruck state to close the edit form
                setEditTruck(null);

                // Set success message and open success modal
                setSuccessMessage("Truck updated successfully.");
                setIsSuccessModalOpen(true);
            } catch (error) {
                console.error("Error updating truck:", error);
            }
        }
    };    

    const handleCancel = () => {
        setEditTruck(null);
        setIsCreating(false); // Exit create mode
    };

    const handleDeleteClick = (id: string | undefined) => {
        if (!id) return;
        setTruckToDelete(id);
        setIsConfirmDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (truckToDelete) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/trucks/${truckToDelete}`);
                if (response.status === 200) {
                    setTrucks((prevTrucks) => prevTrucks.filter((truck) => truck._id !== truckToDelete));
                    
                    // Set success message and open success modal
                    setSuccessMessage("The truck successfully deleted.");
                    setIsSuccessModalOpen(true);
                }
            } catch (error) {
                console.error("Error deleting truck:", error);
            }
        }
        setIsConfirmDeleteModalOpen(false);
        setTruckToDelete(null);
    };

    const cancelDelete = () => {
        setIsConfirmDeleteModalOpen(false);
        setTruckToDelete(null);
    };


    return (
        <div className="p-6 bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Trucks</h2>
            <button 
                onClick={handleCreateClick} 
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
            >
                Create New Truck
            </button>
            <ul className="space-y-4">
                {trucks.map((truck) => (
                <li 
                    key={truck._id} 
                    className="p-4 bg-white shadow rounded flex justify-between items-center"
                >
                    <div>
                        <span className="block text-lg font-semibold">{truck.brand}</span>
                        <span className="block text-sm text-gray-500">{truck.load}kg - {truck.capacity}kg - {truck.year}</span>
                        <span className="block text-sm text-gray-500">Repairs: {truck.numberOfRepairs}</span>
                    </div>
                    <div>
                        <button 
                            onClick={() => handleEditClick(truck)} 
                            className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300"
                        >
                            Edit
                        </button>
                        <button
                        onClick={() => handleDeleteClick(truck._id)}
                        className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
                        >
                            Delete
                        </button>
                    </div>
                </li>
                ))}
            </ul>

            {(isCreating || editTruck) && (
                <TruckEditCreateModal
                    truck={isCreating ? newTruck : editTruck}
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

export default TrucksComponent;
