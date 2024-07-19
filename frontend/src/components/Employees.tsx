import React from "react";

interface Employee {
  _id: string;
  name: string;
  surname: string;
  seniority: string;
}

interface EmployeesComponentProps {
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
