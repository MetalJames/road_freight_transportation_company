import React from "react";

interface RepairRecord {
  _id: string;
  truck_id: string;
  mechanic_id: string;
  estimated_repair_time: number;
}

interface RepairRecordsComponentProps {
  repairRecords: RepairRecord[];
}

const RepairRecordsComponent: React.FC<RepairRecordsComponentProps> = ({
  repairRecords,
}) => {
  return (
    <div>
      <h2>Repair Records</h2>
      <ul>
        {repairRecords.map((record) => (
          <li key={record._id}>
            Truck ID: {record.truck_id} - Mechanic ID: {record.mechanic_id} -
            Estimated Time: {record.estimated_repair_time} days
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepairRecordsComponent;
