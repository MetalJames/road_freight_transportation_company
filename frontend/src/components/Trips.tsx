import React from "react";

interface Trip {
  _id: string;
  route_from: string;
  route_to: string;
  drivers: string[];
  shipments: string[];
}

interface TripsComponentProps {
  trips: Trip[];
}

const TripsComponent: React.FC<TripsComponentProps> = ({ trips }) => {
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

export default TripsComponent;
