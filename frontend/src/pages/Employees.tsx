import React from "react";
import { EmployeeType } from "../types/types";

type EmployeesComponentProps = {
  employees: EmployeeType[];
}

const Employees: React.FC<EmployeesComponentProps> = ({
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

export default Employees;
