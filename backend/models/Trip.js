const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    truckId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Truck',
        required: true,
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    startLocation: {
        type: String,
        required: true,
    },
    endLocation: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
}, {versionKey: false});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;