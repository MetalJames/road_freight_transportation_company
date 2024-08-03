export type TruckType = {
    _id?: string; // _id is optional for new trucks
    brand: string;
    load: number;
    capacity: number;
    year: number;
    numberOfRepairs: number;
}


export type CustomerType = {
    _id?: string; // Optional for new records
   // id: number;
    name: string;
    address: string;
    phone: string[]; // Array of phone numbers
}

export type EmployeeType = {
    _id?: string; // Optional for new records
    id: number;
    name: string;
    surname: string;
    seniority: number; // Number of years
    type: "driver" | "mechanic" | "other"; // Add other types as needed
    category: string; // Category such as "A", "B", etc.
}


export type RepairRecordType = {
    _id?: string; // Optional for new records
    id: number;
    mechanic: string;
    estimatedRepairTime: number; // In hours
    truck: string; // Truck brand or model
}


export type ShipmentsType = {
    _id?: string; // _id is optional for new shipments
    id: number;
    weight: number;
    value: number;
    origin: string;
    destination: string;
}

export type TripsType =  {
    _id?: string; // Optional for new trips
    id: number;
    route_from: string;
    route_to: string;
    drivers: string[]; // Array of driver names
    shipments: string[]; // Array of shipment names
}
