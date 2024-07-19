import React, { useState, useEffect } from "react";
import axios from "axios";

interface Truck {
    _id?: string; // _id is optional for new trucks
    brand: string;
    load: number;
    capacity: number;
    year: number;
    numberOfRepairs: number;
}

const TrucksComponent: React.FC = () => {
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
            } catch (error) {
                console.error("Error updating truck:", error);
            }
        }
    };

    const handleCancel = () => {
        setEditTruck(null);
        setIsCreating(false); // Exit create mode
    };

    return (
        <div>
            <h2>Trucks</h2>
            <button onClick={handleCreateClick}>Create New Truck</button>
            <ul>
                {trucks.map((truck) => (
                    <li key={truck._id}>
                        {truck.brand} - {truck.load}kg - {truck.capacity}kg - {truck.year} -
                        Repairs: {truck.numberOfRepairs}
                        <button onClick={() => handleEditClick(truck)}>Edit</button>
                    </li>
                ))}
            </ul>

            {/* Form to create a new truck or edit an existing one */}
            {(isCreating || editTruck) && (
                <form onSubmit={handleSubmit}>
                    <h3>{isCreating ? "Create New Truck" : "Edit Truck"}</h3>
                    <label>
                        Brand:
                        <input
                            type="text"
                            name="brand"
                            value={isCreating ? newTruck.brand : editTruck?.brand || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Load:
                        <input
                            type="number"
                            name="load"
                            value={isCreating ? newTruck.load : editTruck?.load || 0}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Capacity:
                        <input
                            type="number"
                            name="capacity"
                            value={isCreating ? newTruck.capacity : editTruck?.capacity || 0}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Year:
                        <input
                            type="number"
                            name="year"
                            value={isCreating ? newTruck.year : editTruck?.year || 0}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Number of Repairs:
                        <input
                            type="number"
                            name="numberOfRepairs"
                            value={isCreating ? newTruck.numberOfRepairs : editTruck?.numberOfRepairs || 0}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button type="submit">{isCreating ? "Create" : "Save"}</button>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default TrucksComponent;
