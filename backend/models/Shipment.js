const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
    truckId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Truck',
        required: true,
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    load: {
        type: Number,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    shipmentDate: {
        type: Date,
        required: true,
    },
    deliveryDate: {
        type: Date,
        required: true,
    },
});

const Shipment = mongoose.model('Shipment', shipmentSchema);

module.exports = Shipment;