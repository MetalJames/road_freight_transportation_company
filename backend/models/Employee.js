const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    seniority: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
}, {versionKey: false});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;