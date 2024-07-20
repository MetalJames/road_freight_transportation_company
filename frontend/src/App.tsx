import React, { useState, useEffect } from "react";
import axios from "axios";
import TrucksComponent from "./components/Trucks";
import EmployeesComponent from "./components/Employees";
import RepairRecordsComponent from "./components/RepairRecords";
import CustomersComponent from "./components/Customers";
import ShipmentsComponent from "./components/Shipments";
import TripsComponent from "./components/Trips";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  const [trucks, setTrucks] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [repairRecords, setRepairRecords] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [shipments, setShipments] = useState<any[]>([]);
  const [trips, setTrips] = useState<any[]>([]);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api", // Adjust as per your backend server setup
  });

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
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <BrowserRouter>
        <header>
          <NavBar />
        </header>
        <main className="flex-grow sm:mt-[120px] lg:mt-[100px]">
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
