// db.js
const mongoose = require('mongoose');

const uri = 'mongodb+srv://amir434soussi:amir434A@cluster0.ogajmd8.mongodb.net/?retryWrites=true&w=majority';


async function connect() {
    try {
        await mongoose.connect(`${uri}/`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            writeConcern: { w: 'majority' }
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = { connect };
