import React, { useState, useEffect } from "react";
import axios from "axios";
import { ShipmentsType } from "../types/types";
import { ConfirmationModal, SuccessModal, ShipmentEditCreateModal } from "../components";

type ShipmentsComponentProps = {
  shipments: ShipmentsType[];
}

const Shipments: React.FC<ShipmentsComponentProps> = () => {
  const [shipments, setShipments] = useState<ShipmentsType[]>([]);
  const [editShipment, setEditShipment] = useState<ShipmentsType | null>(null);
  const [newShipment, setNewShipment] = useState<ShipmentsType>({
      id: 0,
      weight: 0,
      value: 0,
      origin: '',
      destination: ''
  });
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [shipmentToDelete, setShipmentToDelete] = useState<string | null>(null);

  useEffect(() => {
      const fetchShipments = async () => {
          try {
              const response = await axios.get("http://localhost:5000/api/shipments");
              setShipments(response.data);
          } catch (error) {
              console.error("Error fetching shipments:", error);
          }
      };

      fetchShipments();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const numberValue = value === '' ? '' : (name === 'id' || name === 'weight' || name === 'value'
          ? Number(value)
          : value);

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
              const response = await axios.post("http://localhost:5000/api/shipments", newShipment);
              console.log("Shipment created successfully:", response.data);

              // Add the new Shipment to the list
              setShipments([...shipments, response.data]);

              // Clear the newShipment state
              setNewShipment({
                id: 0,
                weight: 0,
                value: 0,
                origin: '',
                destination: ''
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
                  `http://localhost:5000/api/shipments/${editShipment._id}`,
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
              const response = await axios.delete(`http://localhost:5000/api/shipments/${shipmentToDelete}`);
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
                      <span className="block text-lg font-semibold">{shipment.id}</span>
                      <span className="block text-sm text-gray-500">Weight: {shipment.weight}kg - Value: {shipment.value}</span>
                      <span className="block text-sm text-gray-500">Origin: {shipment.origin} to Destination: {shipment.destination}</span>
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
