import React from "react";
import { Employee } from "../types/types";

type EmployeesComponentProps = {
  employees: Employee[];
}

const EmployeesComponent: React.FC<EmployeesComponentProps> = ({
  employees,
}) => {
  return (
    <div>
      <h2>Employees</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            {employee.name} {employee.surname} - {employee.seniority}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeesComponent;
