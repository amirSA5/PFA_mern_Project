// models/Company.js
const mongoose = require('mongoose');

const employeeCategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
});

const EmployeeCategory = mongoose.model('employeeCategory', employeeCategorySchema);

module.exports = EmployeeCategory;
