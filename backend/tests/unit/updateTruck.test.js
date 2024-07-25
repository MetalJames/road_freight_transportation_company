const { updateTruck } = require('../../routes/trucks');
const Truck = require('../../models/Truck');

jest.mock('../../models/Truck'); // Mock the Truck model

describe('Truck Update Handler', () => {
    test('updateTruck should update a truck', async () => {
        const updatedTruck = { brand: 'Updated Brand', load: 1600, capacity: 2600, year: 2026, numberOfRepairs: 2 };
        // Mocking the return value to include _id
        Truck.findByIdAndUpdate.mockResolvedValue({ ...updatedTruck, _id: '12345' });
        
        const req = { params: { id: '12345' }, body: updatedTruck };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        
        await updateTruck(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);

        // Get the actual response object
        const responseObject = res.json.mock.calls[0][0];

        // Assert that the response has the expected properties and ignore _id
        expect(responseObject).toHaveProperty('message', 'Truck updated successfully');
        expect(responseObject).toHaveProperty('truck');
        const { truck } = responseObject;
        expect(truck).toMatchObject({
            brand: updatedTruck.brand,
            load: updatedTruck.load,
            capacity: updatedTruck.capacity,
            year: updatedTruck.year,
            numberOfRepairs: updatedTruck.numberOfRepairs
        });
    });
});
