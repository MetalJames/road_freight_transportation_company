import React, { useState, useEffect } from "react";
import axios from "axios";
import { ShipmentsType } from "../types/types";
import { ConfirmationModal, SuccessModal, ShipmentEditCreateModal } from "../components";
import { v4 as uuidv4 } from "uuid";

type ShipmentsComponentProps = {
    shipments: ShipmentsType[];
}

const Shipments: React.FC<ShipmentsComponentProps> = () => {
    const [shipments, setShipments] = useState<ShipmentsType[]>([]);
    const [editShipment, setEditShipment] = useState<ShipmentsType | null>(null);
    const [newShipment, setNewShipment] = useState<ShipmentsType>({
        shipmentId: uuidv4(),
        driverName: '',
        customerName: '',
        load: 0,
        destination: '',
        pickUpLocation: '',
        value: 0,
        shipmentDate: new Date(),
        shouldBeDeliveredBefore: new Date()
    });
    const [isCreating, setIsCreating] = useState<boolean>(false);

    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [shipmentToDelete, setShipmentToDelete] = useState<string | null>(null);

    useEffect(() => {
        const fetchShipments = async () => {
            try {
                //const response = await axios.get("http://localhost:5000/api/shipments");
                const response = await axios.get("https://road-freight-transportation-company.onrender.com/api/shipments");
                setShipments(response.data);
            } catch (error) {
                console.error("Error fetching shipments:", error);
            }
        };

        fetchShipments();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        // Handle date input types differently
        if (type === 'date') {
            const dateValue = value ? new Date(value) : null;

            if (isCreating) {
                setNewShipment({
                    ...newShipment,
                    [name]: dateValue
                });
            } else if (editShipment) {
                setEditShipment({
                    ...editShipment,
                    [name]: dateValue
                });
            }
        } else {
            // Handle number inputs differently
            const numberValue = type === 'number' ? (value === '' ? '' : Number(value)) : value;

            if (isCreating) {
                setNewShipment({
                    ...newShipment,
                    [name]: numberValue
                });
            } else if (editShipment) {
                setEditShipment({
                    ...editShipment,
                    [name]: numberValue
                });
            }
        }
    };

    const handleEditClick = (shipment: ShipmentsType) => {
        setEditShipment(shipment);
        setIsCreating(false); // Ensure we're not in "create" mode
    };

    const handleCreateClick = () => {
        setEditShipment(null);
        setIsCreating(true); // Set the component to "create" mode
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isCreating) {
            try {
                //const response = await axios.post("http://localhost:5000/api/shipments", newShipment);
                const response = await axios.post("https://road-freight-transportation-company.onrender.com/api/shipments", newShipment);
                console.log("Shipment created successfully:", response.data);

                // Add the new Shipment to the list
                setShipments([...shipments, response.data]);

                // Clear the newShipment state
                setNewShipment({
                    shipmentId: uuidv4(),
                    driverName: '',
                    customerName: '',
                    load: 0,
                    destination: '',
                    pickUpLocation: '',
                    value: 0,
                    shipmentDate: new Date(),
                    shouldBeDeliveredBefore: new Date()
                });

                // Exit create mode
                setIsCreating(false);

                // Set success message and open success modal
                setSuccessMessage("Shipment created successfully.");
                setIsSuccessModalOpen(true);
            } catch (error) {
                console.error("Error creating Shipment:", error);
            }
        } else if (editShipment) {
            try {
                const response = await axios.put(
                    //`http://localhost:5000/api/shipments/${editShipment._id}`,
                    `https://road-freight-transportation-company.onrender.com/api/shipments/${editShipment._id}`,
                    editShipment
                );
                console.log("Shipment updated successfully:", response.data);

                // Update the ShipmentList state without refreshing the page
                setShipments((prevShipments) =>
                    prevShipments.map((shipment) =>
                        shipment._id === editShipment._id ? editShipment : shipment
                    )
                );

                // Clear the editShipment state to close the edit form
                setEditShipment(null);

                // Set success message and open success modal
                setSuccessMessage("Shipment updated successfully.");
                setIsSuccessModalOpen(true);
            } catch (error) {
                console.error("Error updating Shipment:", error);
            }
        }
    };    

    const handleCancel = () => {
        setEditShipment(null);
        setIsCreating(false); // Exit create mode
    };

    const handleDeleteClick = (id1: string | undefined) => {
        if (!id1) return;
        setShipmentToDelete(id1);
        setIsConfirmDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (shipmentToDelete) {
            try {
                //const response = await axios.delete(`http://localhost:5000/api/shipments/${shipmentToDelete}`);
                const response = await axios.delete(`https://road-freight-transportation-company.onrender.com/api/shipments/${shipmentToDelete}`);
                if (response.status === 200) {
                    setShipments((prevShipments) => prevShipments.filter((shipment) => shipment._id !== shipmentToDelete));
                    
                    // Set success message and open success modal
                    setSuccessMessage("The shipment successfully deleted.");
                    setIsSuccessModalOpen(true);
                }
            } catch (error) {
                console.error("Error deleting shipment:", error);
            }
        }
        setIsConfirmDeleteModalOpen(false);
        setShipmentToDelete(null);
    };

    const cancelDelete = () => {
        setIsConfirmDeleteModalOpen(false);
        setShipmentToDelete(null);
    };


    return (
        <div className="p-6 bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Shipments</h2>
            <button 
                onClick={handleCreateClick} 
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
            >
                Create New Shipment
            </button>
            <ul className="space-y-4">
                {shipments.map((shipment) => (
                    <li
                        key={shipment._id}
                        className="p-4 bg-white shadow rounded flex justify-between items-center"
                    >
                        <div>
                            <span className="block text-lg font-semibold">Shipment ID: {shipment.shipmentId}</span>
                            <span className="block text-sm text-gray-500">Driver: {shipment.driverName}</span>
                            <span className="block text-sm text-gray-500">Customer: {shipment.customerName}</span>
                            <span className="block text-sm text-gray-500">Load: {shipment.load}kg</span>
                            <span className="block text-sm text-gray-500">Destination: {shipment.destination}</span>
                            <span className="block text-sm text-gray-500">Pick-Up Location: {shipment.pickUpLocation}</span>
                            <span className="block text-sm text-gray-500">Value: ${shipment.value}</span>
                            <span className="block text-sm text-gray-500">
                                Shipment Date: {shipment.shipmentDate ? new Date(shipment.shipmentDate).toDateString() : 'N/A'}
                            </span>
                            <span className="block text-sm text-gray-500">
                                Should Be Delivered Before: {shipment.shouldBeDeliveredBefore ? new Date(shipment.shouldBeDeliveredBefore).toDateString() : 'N/A'}
                            </span>
                        </div>
                        <div>
                            <button
                                onClick={() => handleEditClick(shipment)}
                                className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteClick(shipment._id)}
                                className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {(isCreating || editShipment) && (
                <ShipmentEditCreateModal
                    shipment={isCreating ? newShipment : editShipment}
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
export default Shipments;
