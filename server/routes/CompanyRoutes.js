// routes/CompanyRoute.js
const express = require('express');
const router = express.Router();
const { createCompany, getAllCompanies, login, getOneCompany, logout, updateCompany, deleteCompany } = require('../controllers/CompanyController');

// Create a company
router.post('/create', createCompany);

// Get all companies
router.get('/getAllCompanies', getAllCompanies);


router.get('/getOneCompanie/:id', getOneCompany);

router.post('/login', login);
router.get('/logout', logout)
router.put('/updateCompany/:id', updateCompany);
router.delete('/deleteCompany/:id', deleteCompany);


module.exports = router;
