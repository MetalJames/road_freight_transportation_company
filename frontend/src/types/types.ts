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
    surname: string;
    address: string;
    phone: string[]; // Array of phone numbers
}

export type EmployeeType = {
    _id?: string; // Optional for new records
    //id: number;
    name: string;
    surname: string;
    seniority: number; // Number of years
    type: 'Driver' | 'Mechanic' | 'Other'; // Add other types as needed
    category: string; // Category such as "A", "B", etc.
    specializedBrand?: string; // Category such as "Ford", "Volvo", etc.
}


export type RepairRecordType = {
    _id?: string; // Optional for new records
    recordId: string;
    mechanic: string;
    estimatedRepairTime: string; // In hours
    truck: string; // Truck brand or model
}


export type ShipmentsType = {
    _id?: string; // _id is optional for new shipments
    shipmentId: string;
    driverName: string;
    customerName: string;
    load: number;
    destination: string;
    pickUpLocation: string; // Added field
    value: number; // Added field
    shipmentDate: Date;
    shouldBeDeliveredBefore: Date;
}

export type TripsType =  {
    _id?: string; // Optional for new trips
    tripId: string;
    route_from: string;
    route_to: string;
    drivers: string[]; // Array of driver names
    shipments: string[]; // Array of shipment names
}
