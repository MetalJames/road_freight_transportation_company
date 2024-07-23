import React from "react";
import { ShipmentsType } from "../types/types";

type ShipmentsComponentProps = {
  shipments: ShipmentsType[];
}

const Shipments: React.FC<ShipmentsComponentProps> = ({
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

export default Shipments;
