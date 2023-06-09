// routes/CompanyRoute.js
const express = require('express');
const router = express.Router();
const {
    createCompany,
    getAllCompanies,
    login,
    getOneCompany,
    logout,
    updateCompany,
    deleteCompany,
    createEmployeeCategory,
    deleteEmployeeCategory,
    getAllEmployeeCategory,
    createEmployee,
    deleteEmployee,
    getAllEmployee,
    updateEmployee,
} = require('../controllers/CompanyController');

// Create a company
router.post('/create', createCompany);

// Get all companies
router.get('/getAllCompanies', getAllCompanies);


router.get('/getOneCompanie/:id', getOneCompany);

router.post('/login', login);
router.get('/logout', logout)
router.put('/updateCompany/:id', updateCompany);
router.delete('/deleteCompany/:id', deleteCompany);

router.post('/createEmployeeCategory', createEmployeeCategory);
router.delete('/deleteEmployeeCategory/:id', deleteEmployeeCategory);
router.get('/getAllEmployeeCategory/:id', getAllEmployeeCategory);

router.post('/createEmployee', createEmployee);
router.delete('/deleteEmployee/:id', deleteEmployee);
router.get('/getAllEmployee/:id', getAllEmployee);
router.put('/updateEmployee/:id', updateEmployee);


module.exports = router;
