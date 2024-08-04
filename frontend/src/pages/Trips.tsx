import React, { useState, useEffect } from "react";
import axios from "axios";
import { TripsType } from "../types/types";
import { ConfirmationModal, SuccessModal, TripEditCreateModal } from "../components";

type TripsComponentProps = {
    trips: TripsType[];
}

const Trips: React.FC<TripsComponentProps> = () => {
    const [trips, setTrips] = useState<TripsType[]>([]);
    const [editTrip, setEditTrip] = useState<TripsType | null>(null);
    const [newTrip, setNewTrip] = useState<TripsType>({
        id: 0,
        route_from: '',
        route_to: '',
        drivers: ['', ''],
        shipments: ['', '']
    });
    const [isCreating, setIsCreating] = useState<boolean>(false);

    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [tripToDelete, setTripToDelete] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/trips");
                setTrips(response.data);
            } catch (error) {
                console.error("Error fetching trips:", error);
            }
        };

        fetchTrips();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (isCreating) {
            if (name.startsWith('driver_')) {
                const index = parseInt(name.split('_')[1]);
                const updatedDrivers = [...newTrip.drivers];
                updatedDrivers[index] = value;
                setNewTrip({
                    ...newTrip,
                    drivers: updatedDrivers
                });
            } else if (name.startsWith('shipment_')) {
                const index = parseInt(name.split('_')[1]);
                const updatedShipments = [...newTrip.shipments];
                updatedShipments[index] = value;
                setNewTrip({
                    ...newTrip,
                    shipments: updatedShipments
                });
            } else {
                setNewTrip({
                    ...newTrip,
                    [name]: value
                });
            }
        } else if (editTrip) {
            if (name.startsWith('driver_')) {
                const index = parseInt(name.split('_')[1]);
                const updatedDrivers = [...editTrip.drivers];
                updatedDrivers[index] = value;
                setEditTrip({
                    ...editTrip,
                    drivers: updatedDrivers
                });
            } else if (name.startsWith('shipment_')) {
                const index = parseInt(name.split('_')[1]);
                const updatedShipments = [...editTrip.shipments];
                updatedShipments[index] = value;
                setEditTrip({
                    ...editTrip,
                    shipments: updatedShipments
                });
            } else {
                setEditTrip({
                    ...editTrip,
                    [name]: value
                });
            }
        }
    }

    const handleEditClick = (trip: TripsType) => {
        setEditTrip(trip);
        setIsCreating(false); // Ensure we're not in "create" mode
    };

    const handleCreateClick = () => {
        setEditTrip(null);
        setIsCreating(true); // Set the component to "create" mode
    };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) {
        try {
            const response = await axios.post("http://localhost:5000/api/trips", newTrip);
            console.log("Trip created successfully:", response.data);

            // Add the new trip to the list
            setTrips([...trips, response.data]);

            // Clear the newTrip state
            setNewTrip({
                id: 0,
                route_from: '',
                route_to: '',
                drivers: ['', ''],
                shipments: ['', '']
            });

            // Exit create mode
            setIsCreating(false);

            // Set success message and open success modal
            setSuccessMessage("Trip created successfully.");
            setIsSuccessModalOpen(true);
        } catch (error) {
            console.error("Error creating trip:", error);
        }
    } else if (editTrip) {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/trips/${editTrip._id}`,
                editTrip
            );
            console.log("Trip updated successfully:", response.data);

            // Update the tripList state without refreshing the page
            setTrips((prevTrips) =>
                prevTrips.map((trip) =>
                    trip._id === editTrip._id ? editTrip : trip
                )
            );

            // Clear the editTrip state to close the edit form
            setEditTrip(null);

            // Set success message and open success modal
            setSuccessMessage("Trip updated successfully.");
            setIsSuccessModalOpen(true);
        } catch (error) {
            console.error("Error updating trip:", error);
        }
    }
};

    const handleCancel = () => {
        setEditTrip(null);
        setIsCreating(false); // Exit create mode
    };

    const handleDeleteClick = (id: string | undefined) => {
        if (!id) return;
        setTripToDelete(id);
        setIsConfirmDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (tripToDelete) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/trips/${tripToDelete}`);
                if (response.status === 200) {
                    setTrips((prevTrips) => prevTrips.filter((trip) => trip._id !== tripToDelete));
                    
                    // Set success message and open success modal
                    setSuccessMessage("The trip successfully deleted.");
                    setIsSuccessModalOpen(true);
                }
            } catch (error) {
                console.error("Error deleting trip:", error);
            }
        }
        setIsConfirmDeleteModalOpen(false);
        setTripToDelete(null);
    };

    const cancelDelete = () => {
        setIsConfirmDeleteModalOpen(false);
        setTripToDelete(null);
    };


    return (
        <div className="p-6 bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Trips</h2>
            <button 
                onClick={handleCreateClick} 
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
            >
                Create New Trip
            </button>
            <ul className="space-y-4">
                {trips.map((trip) => (
                <li 
                    key={trip._id} 
                    className="p-4 bg-white shadow rounded flex justify-between items-center"
                >
                    <div>
                        <span className="block text-lg font-semibold">{trip.id} - From: {trip.route_from} - To: {trip.route_to}</span>
                        <span className="block text-sm text-gray-500">Drivers: {trip.drivers}</span>
                        <span className="block text-sm text-gray-500">Shipments: {trip.shipments}</span>
                    </div>
                    <div>
                        <button 
                            onClick={() => handleEditClick(trip)} 
                            className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300"
                        >
                            Edit
                        </button>
                        <button
                        onClick={() => handleDeleteClick(trip._id)}
                        className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
                        >
                            Delete
                        </button>
                    </div>
                </li>
                ))}
            </ul>

            {(isCreating || editTrip) && (
                <TripEditCreateModal
                    trip={isCreating ? newTrip : editTrip}
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

export default Trips;
