import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import TrucksComponent from "./components/TrucksComponent";
import EmployeesComponent from "./components/EmployeesComponent";
import RepairRecordsComponent from "./components/RepairRecordsComponent";
import CustomersComponent from "./components/CustomersComponent";
import ShipmentsComponent from "./components/ShipmentsComponent";
import TripsComponent from "./components/TripsComponent";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Truck, Customer, Employee, RepairRecord, Shipments, Trips } from "./types/types";

const App: React.FC = () => {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [repairRecords, setRepairRecords] = useState<RepairRecord[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [shipments, setShipments] = useState<Shipments[]>([]);
  const [trips, setTrips] = useState<Trips[]>([]);

  const axiosInstance = useMemo(() => axios.create({
    baseURL: "http://localhost:5000/api", // Adjust as per your backend server setup
  }), []);

  console.log(trucks);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trucksResponse = await axiosInstance.get("/trucks");
        const employeesResponse = await axiosInstance.get("/employees");
        const repairRecordsResponse = await axiosInstance.get("/repairRecords");
        const customersResponse = await axiosInstance.get("/customers");
        const shipmentsResponse = await axiosInstance.get("/shipments");
        const tripsResponse = await axiosInstance.get("/trips");

        setTrucks(trucksResponse.data);
        setEmployees(employeesResponse.data);
        setRepairRecords(repairRecordsResponse.data);
        setCustomers(customersResponse.data);
        setShipments(shipmentsResponse.data);
        setTrips(tripsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [axiosInstance]);

  return (
    <div className="flex flex-col h-screen">
      <BrowserRouter>
        <header>
          <NavBar />
        </header>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<TrucksComponent trucks={trucks} />} />
            <Route path="/employees" element={<EmployeesComponent employees={employees} />} />
            <Route path="/repair_records" element={<RepairRecordsComponent repairRecords={repairRecords} />} />
            <Route path="/customers" element={<CustomersComponent customers={customers} />} />
            <Route path="/shipments" element={<ShipmentsComponent shipments={shipments} />} />
            <Route path="/trips" element={<TripsComponent trips={trips} />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
