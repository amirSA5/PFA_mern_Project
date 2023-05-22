// controllers/CompanyController.js
const Company = require('../models/Company');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const EmployeeCategory = require('../models/EmployeeCategory');
const mongoose = require('mongoose');


// Create a company
const createCompany = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const company = new Company({ name, email, password: hashedPassword, phoneNumber });
        const savedCompany = await company.save();
        res.status(201).json(savedCompany);
    } catch (error) {
        console.error('Error creating company:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all companies
const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getOneCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) return res.status(400).json({ msg: "Company does not exist." });

        res.json(company);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};



const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const company = await Company.findOne({ email })
        if (!company) return res.status(400).json({ msg: 'company does not exist.' })

        const isMatch = await bcrypt.compare(password, company.password)
        if (!isMatch) return res.status(400).json({ msg: 'Incorrect password.' })

        // If login success , create access token and refresh token
        const accesstoken = createAccessToken({ id: company._id })
        const refreshtoken = createRefreshToken({ id: company._id })

        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/company/refresh_token',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
        })

        res.json({ accesstoken, company })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('refreshtoken', { path: '/company/refresh_token' })
        return res.json({ msg: "Logged out" })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

const refreshToken = async (req, res) => {

    try {
        const rf_token = req.cookies.refreshtoken;
        if (!rf_token) return res.status(400).json({ msg: 'Please Login Or Register. ' })

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, company) => {
            if (err) return res.status(400).json({ msg: 'Please Login Or Register. ' })
            const accesstoken = createAccessToken({ id: company.id })
            res.json({ accesstoken })
        })

        //res.json({rf_token})

    } catch (err) {

        return res.status(500).json({ msg: err.message })
    }
}

const createAccessToken = (company) => {
    return jwt.sign(company, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

const createRefreshToken = (company) => {
    return jwt.sign(company, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

const updateCompany = async (req, res) => {
    try {
        const { email, password } = req.body;
        await Company.findOneAndUpdate({ _id: req.params.id }, { email, password })

        res.json({ msg: "Updated a Company" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

const deleteCompany = async (req, res) => {
    try {
        await Company.findByIdAndDelete(req.params.id)
        res.json({ msg: "Deleted a Company" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}


const createEmployeeCategory = async (req, res) => {
    try {
        let { companyId, category, description } = req.body;
        companyId = new mongoose.Types.ObjectId(companyId);
        const employeeCategory = new EmployeeCategory({ companyId, category, description });
        const savedEmployeeCategory = await employeeCategory.save();
        res.status(201).json(savedEmployeeCategory);
    } catch (error) {
        console.error('Error creating employeeCategory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteEmployeeCategory = async (req, res) => {
    try {
        await EmployeeCategory.findByIdAndDelete(req.params.id)
        res.json({ msg: "Deleted a EmployeeCategory" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

const getAllEmployeeCategory = async (req, res) => {
    try {
        const employeesCategory = await EmployeeCategory.find({companyId :req.params.id});
        res.json(employeesCategory);
    } catch (error) {
        console.error('Error fetching employeesCategory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




module.exports = {
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
};
