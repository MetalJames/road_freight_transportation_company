import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { NavBar } from "./components";
import { Customers, Employees, RepairRecords, Shipments, Trips, Trucks } from "./pages";
import { TruckType, CustomerType, EmployeeType, RepairRecordType, ShipmentsType, TripsType } from "./types/types";

const App: React.FC = () => {
  const [trucks, setTrucks] = useState<TruckType[]>([]);
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [repairRecords, setRepairRecords] = useState<RepairRecordType[]>([]);
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [shipments, setShipments] = useState<ShipmentsType[]>([]);
  const [trips, setTrips] = useState<TripsType[]>([]);

  //using memo hook so I will not have an issue with refreshing - memorizing our data
  const axiosInstance = useMemo(() => axios.create({
    baseURL: "http://localhost:5000/api", // Adjust as per your backend server setup
  }), []);

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
            <Route path="/" element={<Trucks trucks={trucks} />} />
            <Route path="/employees" element={<Employees employees={employees} />} />
            <Route path="/repair_records" element={<RepairRecords repairRecords={repairRecords} />} />
            <Route path="/customers" element={<Customers customers={customers} />} />
            <Route path="/shipments" element={<Shipments shipments={shipments} />} />
            <Route path="/trips" element={<Trips trips={trips} />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
