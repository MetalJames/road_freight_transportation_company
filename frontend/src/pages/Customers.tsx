import React, { useState, useEffect } from "react";
import axios from "axios";
import { CustomerType } from "../types/types";
import { ConfirmationModal, SuccessModal, CustomerEditCreateModal } from "../components";

type CustomersComponentProps = {
  customers: CustomerType[];
}

const Customers: React.FC<CustomersComponentProps> = () => {
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [editCustomer, setEditCustomer] = useState<CustomerType | null>(null);
  const [newCustomer, setNewCustomer] = useState<CustomerType>({
      name: '',
      address: ''
  });
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null);

  useEffect(() => {
      const fetchCustomers = async () => {
          try {
              const response = await axios.get("http://localhost:5000/api/customers");
              setCustomers(response.data);
          } catch (error) {
              console.error("Error fetching customers:", error);
          }
      };

      fetchCustomers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const numberValue = value === '' ? '' : (name === 'id'
          ? Number(value)
          : value);

      if (isCreating) {
          setNewCustomer({
              ...newCustomer,
              [name]: numberValue
          });
      } else if (editCustomer) {
          setEditCustomer({
              ...editCustomer,
              [name]: numberValue
          });
      }
  };

  const handleEditClick = (customer: CustomerType) => {
      setEditCustomer(customer);
      setIsCreating(false); // Ensure we're not in "create" mode
  };

  const handleCreateClick = () => {
      setEditCustomer(null);
      setIsCreating(true); // Set the component to "create" mode
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (isCreating) {
          try {
              const response = await axios.post("http://localhost:5000/api/customers", newCustomer);
              console.log("Customer created successfully:", response.data);

              // Add the new customer to the list
              setCustomers([...customers, response.data]);

              // Clear the newCustomer state
              setNewCustomer({
                name: '',
                address: ''
              });

              // Exit create mode
              setIsCreating(false);

              // Set success message and open success modal
              setSuccessMessage("Customer created successfully.");
              setIsSuccessModalOpen(true);
          } catch (error) {
              console.error("Error creating Customer:", error);
          }
      } else if (editCustomer) {
          try {
              const response = await axios.put(
                  `http://localhost:5000/api/customers/${editCustomer._id}`,
                  editCustomer
              );
              console.log("Customer updated successfully:", response.data);

              // Update the customerList state without refreshing the page
              setCustomers((prevCustomers) =>
                  prevCustomers.map((customer) =>
                      customer._id === editCustomer._id ? editCustomer : customer
                  )
              );

              // Clear the editCustomer state to close the edit form
              setEditCustomer(null);

              // Set success message and open success modal
              setSuccessMessage("Customer updated successfully.");
              setIsSuccessModalOpen(true);
          } catch (error) {
              console.error("Error updating Customer:", error);
          }
      }
  };    

  const handleCancel = () => {
      setEditCustomer(null);
      setIsCreating(false); // Exit create mode
  };

  const handleDeleteClick = (id: string | undefined) => {
      if (!id) return;
      setCustomerToDelete(id);
      setIsConfirmDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
      if (customerToDelete) {
          try {
              const response = await axios.delete(`http://localhost:5000/api/customers/${customerToDelete}`);
              if (response.status === 200) {
                  setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer._id !== customerToDelete));
                  
                  // Set success message and open success modal
                  setSuccessMessage("The customer successfully deleted.");
                  setIsSuccessModalOpen(true);
              }
          } catch (error) {
              console.error("Error deleting customer:", error);
          }
      }
      setIsConfirmDeleteModalOpen(false);
      setCustomerToDelete(null);
  };

  const cancelDelete = () => {
      setIsConfirmDeleteModalOpen(false);
      setCustomerToDelete(null);
  };


  return (
      <div className="p-6 bg-gray-100">
          <h2 className="text-2xl font-bold mb-4">Customers</h2>
          <button 
              onClick={handleCreateClick} 
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
          >
              Create New Customer
          </button>
          <ul className="space-y-4">
              {customers.map((customer) => (
              <li 
                  key={customer._id} 
                  className="p-4 bg-white shadow rounded flex justify-between items-center"
              >
                  <div>
                      <span className="block text-lg font-semibold">{customer.name}</span>
                      <span className="block text-sm text-gray-500">{customer.address}</span>
                  </div>
                  <div>
                      <button 
                          onClick={() => handleEditClick(customer)} 
                          className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300"
                      >
                          Edit
                      </button>
                      <button
                      onClick={() => handleDeleteClick(customer._id)}
                      className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
                      >
                          Delete
                      </button>
                  </div>
              </li>
              ))}
          </ul>

          {(isCreating || editCustomer) && (
              <CustomerEditCreateModal
                  customer={isCreating ? newCustomer : editCustomer}
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
export default Customers;
