// models/Company.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
