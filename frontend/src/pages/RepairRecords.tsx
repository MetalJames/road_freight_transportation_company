import React from "react";
import { RepairRecordType } from "../types/types";

type RepairRecordsComponentProps = {
  repairRecords: RepairRecordType[];
}

const RepairRecords: React.FC<RepairRecordsComponentProps> = ({
  repairRecords,
}) => {
  return (
    <div>
      <h2>Repair Records</h2>
      <ul>
        {repairRecords.map((record) => (
          <li key={record._id}>
            Truck ID: {record.id} - Mechanic Name: {record.mechanic} -
            Estimated Time: {record.estimatedRepairTime} days
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepairRecords;
