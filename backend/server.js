const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 800;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//the stuff above no longer needed in a new versions
mongoose.connect(uri)
.then(() => {
    if (process.env.NODE_ENV !== 'test') {
        console.log('Connected to MongoDB!');
    }
})
// .then(() => console.log('Connected to MongoDB!'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Import and use routes
const truckRoutes = require('./routes/trucks');
app.use('/api/trucks', truckRoutes.router);

const employeesRoutes = require('./routes/employees');
app.use('/api/employees', employeesRoutes.router);

const repairRecordsRoutes = require('./routes/repairRecords');
app.use('/api/repairRecords', repairRecordsRoutes.router);

const customersRoutes = require('./routes/customers');
app.use('/api/customers', customersRoutes.router);

const shipmentsRoutes = require('./routes/shipments');
app.use('/api/shipments', shipmentsRoutes.router);

const tripsRoutes = require('./routes/trips');
app.use('/api/trips', tripsRoutes.router);

// have to use "if" for testing purposes - otherwise can not run integration tests
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

// Export the app for testing
module.exports = app;