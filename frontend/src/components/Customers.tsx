import React from "react";

interface Customer {
  _id: string;
  name: string;
  address: string;
  phone1: string;
  phone2: string;
}

interface CustomersComponentProps {
  customers: Customer[];
}

const CustomersComponent: React.FC<CustomersComponentProps> = ({
  customers,
}) => {
  return (
    <div>
      <h2>Customers</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer._id}>
            {customer.name} - {customer.address} - Phone1: {customer.phone1} -
            Phone2: {customer.phone2}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomersComponent;
