// server.js
const express = require('express');
const { connect } = require('./db/DB');
const companyRoute = require('./routes/CompanyRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());


const port = 5000;

connect(); // Establish the database connection

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up your routes and middleware here
app.use('/companies', companyRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
