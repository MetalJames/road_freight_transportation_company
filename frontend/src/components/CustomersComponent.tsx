import React from "react";
import { Customer } from "../types/types";

type CustomersComponentProps = {
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
            {customer.name} - {customer.address} - 
            {customer.phoneNumbers.map((index, phone) => (
              <p key={index}>Phone{index}: {phone}</p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomersComponent;
