import React from "react";
import { TripsType } from "../types/types";

type TripsComponentProps = {
  trips: TripsType[];
}

const Trips: React.FC<TripsComponentProps> = ({ trips }) => {
  return (
    <div>
      <h2>Trips</h2>
      <ul>
        {trips.map((trip) => (
          <li key={trip._id}>
            From: {trip.route_from} - To: {trip.route_to} - Drivers:{" "}
            {trip.drivers.join(", ")} - Shipments: {trip.shipments.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trips;
