const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    load: {
        type: Number,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    numberOfRepairs: {
        type: Number,
        required: true,
    },
});

const Truck = mongoose.model('Truck', truckSchema);

module.exports = Truck;
