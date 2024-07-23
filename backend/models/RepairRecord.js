const mongoose = require('mongoose');

const repairRecordSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    mechanic: {
        type: String,
        required: true,
    },
    estimatedRepairTime: {
        type: Number,
        required: true,
    },
    truck: {
        type: String,
        required: true,
    },
}, { collection: 'repairRecords' });

const RepairRecord = mongoose.model('RepairRecord', repairRecordSchema);

module.exports = RepairRecord;