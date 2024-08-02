import React, { useState, useEffect } from "react";
import axios from "axios";
import { RepairRecordType } from "../types/types";
import { ConfirmationModal, SuccessModal, RepairRecordEditCreateModal } from "../components";

type RepairRecordsComponentProps = {
  repairRecords: RepairRecordType[];
}

const RepairRecords: React.FC<RepairRecordsComponentProps> = () => {
  const [repairrecords, setRepairRecords] = useState<RepairRecordType[]>([]);
  const [editRepairRecord, setEditRepairRecord] = useState<RepairRecordType | null>(null);
  const [newRepairRecord, setNewRepairRecord] = useState<RepairRecordType>({
      id: 0,
      mechanic: '',
      estimatedRepairTime: 0,
      truck: ''
  });
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [repairrecordToDelete, setRepairRecordToDelete] = useState<string | null>(null);

  useEffect(() => {
      const fetchRepairRecords = async () => {
          try {
              const response = await axios.get("http://localhost:5000/api/repairrecords");
              setRepairRecords(response.data);
          } catch (error) {
              console.error("Error fetching repair records:", error);
          }
      };

      fetchRepairRecords();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const numberValue = value === '' ? '' : (name === 'id' || name === 'estimatedRepairTime'
          ? Number(value)
          : value);

      if (isCreating) {
          setNewRepairRecord({
              ...newRepairRecord,
              [name]: numberValue
          });
      } else if (editRepairRecord) {
          setEditRepairRecord({
              ...editRepairRecord,
              [name]: numberValue
          });
      }
  };

  const handleEditClick = (repairrecord: RepairRecordType) => {
      setEditRepairRecord(repairrecord);
      setIsCreating(false); // Ensure we're not in "create" mode
  };

  const handleCreateClick = () => {
      setEditRepairRecord(null);
      setIsCreating(true); // Set the component to "create" mode
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (isCreating) {
          try {
              const response = await axios.post("http://localhost:5000/api/repairrecords", newRepairRecord);
              console.log("Repair Record created successfully:", response.data);

              // Add the new RepairRecord to the list
              setRepairRecords([...repairrecords, response.data]);

              // Clear the newRepairRecord state
              setNewRepairRecord({
                id: 0,
                mechanic: '',
                estimatedRepairTime: 0,
                truck: ''
              });

              // Exit create mode
              setIsCreating(false);

              // Set success message and open success modal
              setSuccessMessage("Repair Record created successfully.");
              setIsSuccessModalOpen(true);
          } catch (error) {
              console.error("Error creating Repair Record:", error);
          }
      } else if (editRepairRecord) {
          try {
              const response = await axios.put(
                  `http://localhost:5000/api/repairrecords/${editRepairRecord._id}`,
                  editRepairRecord
              );
              console.log("Repair Record updated successfully:", response.data);

              // Update the RepairRecordList state without refreshing the page
              setRepairRecords((prevRepairRecords) =>
                  prevRepairRecords.map((repairrecord) =>
                    repairrecord._id === editRepairRecord._id ? editRepairRecord : repairrecord
                  )
              );

              // Clear the editRepairRecord state to close the edit form
              setEditRepairRecord(null);

              // Set success message and open success modal
              setSuccessMessage("Repair Record updated successfully.");
              setIsSuccessModalOpen(true);
          } catch (error) {
              console.error("Error updating Repair Record:", error);
          }
      }
  };    

  const handleCancel = () => {
      setEditRepairRecord(null);
      setIsCreating(false); // Exit create mode
  };

  const handleDeleteClick = (id: string | undefined) => {
      if (!id) return;
      setRepairRecordToDelete(id);
      setIsConfirmDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
      if (repairrecordToDelete) {
          try {
              const response = await axios.delete(`http://localhost:5000/api/repairrecords/${repairrecordToDelete}`);
              if (response.status === 200) {
                  setRepairRecords((prevRepairRecords) => prevRepairRecords.filter((repairrecord) => repairrecord._id !== repairrecordToDelete));
                  
                  // Set success message and open success modal
                  setSuccessMessage("The repair record successfully deleted.");
                  setIsSuccessModalOpen(true);
              }
          } catch (error) {
              console.error("Error deleting repair record:", error);
          }
      }
      setIsConfirmDeleteModalOpen(false);
      setRepairRecordToDelete(null);
  };

  const cancelDelete = () => {
      setIsConfirmDeleteModalOpen(false);
      setRepairRecordToDelete(null);
  };


  return (
      <div className="p-6 bg-gray-100">
          <h2 className="text-2xl font-bold mb-4">Repair Records</h2>
          <button 
              onClick={handleCreateClick} 
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
          >
              Create New Repair Record
          </button>
          <ul className="space-y-4">
              {repairrecords.map((repairrecord) => (
              <li 
                  key={repairrecord._id} 
                  className="p-4 bg-white shadow rounded flex justify-between items-center"
              >
                  <div>
                      <span className="block text-lg font-semibold">{repairrecord.id}</span>
                      <span className="block text-sm text-gray-500">{repairrecord.mechanic} - {repairrecord.estimatedRepairTime}</span>
                      <span className="block text-sm text-gray-500">Repairs: {repairrecord.truck}</span>
                  </div>
                  <div>
                      <button 
                          onClick={() => handleEditClick(repairrecord)} 
                          className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300"
                      >
                          Edit
                      </button>
                      <button
                      onClick={() => handleDeleteClick(repairrecord._id)}
                      className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
                      >
                          Delete
                      </button>
                  </div>
              </li>
              ))}
          </ul>

          {(isCreating || editRepairRecord) && (
              <RepairRecordEditCreateModal
              repairrecord={isCreating ? newRepairRecord : editRepairRecord}
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
export default RepairRecords;

