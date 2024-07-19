import React from "react";

interface Shipment {
  _id: string;
  weight: number;
  value: number;
}

interface ShipmentsComponentProps {
  shipments: Shipment[];
}

const ShipmentsComponent: React.FC<ShipmentsComponentProps> = ({
  shipments,
}) => {
  return (
    <div>
      <h2>Shipments</h2>
      <ul>
        {shipments.map((shipment) => (
          <li key={shipment._id}>
            Weight: {shipment.weight} - Value: {shipment.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShipmentsComponent;
