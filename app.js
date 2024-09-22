const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public'

// MongoDB connection
mongoose.connect('mongodb://return-exchange-system-mongo:27017/returnExchangeDataBase', {
   
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Connected to MongoDB");
});

// Create a Schema for form data
const formSchema = new mongoose.Schema({
    orderNo: { type: String, required: true },
    orderDate: { type: Date, required: true },
    mobileNumber: { type: String, required: true, match: /^\d{10}$/ },
    actionType: { type: String, required: true },
    accountNumber: { type: String },
    reason: { type: String, required: true },
    method: { type: String, required: true },
    comments: { type: String }
});

const Form = mongoose.model('Form', formSchema);

// Handle form submission for return/exchange form
app.post('/submit', async (req, res) => {
    try {
        const formData = req.body;

        // Validate account number for returns
        if (formData.actionType === 'Return' && !formData.accountNumber) {
            return res.status(400).json({ message: 'Account number is required for returns.' });
        }

        // Save the form data (assuming you have a MongoDB or other DB setup)
        const newForm = new Form(formData);  // Adjust as per your DB setup
        await newForm.save();

        // Respond with success
        res.status(201).json({ message: 'Form submitted successfully', formData: newForm });
    } catch (error) {
        console.error("Error submitting form:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST route for login (after user submits login form)
app.post('/login', (req, res) => {
    // Assuming login is successful, redirect to signup.html
    res.redirect('/signup.html');
});

// POST route for signup (after user submits signup form)
app.post('/signup', (req, res) => {
    // Assuming signup is successful, redirect to return_exchange_form.html
    res.redirect('/return_exchange_form.html');
});

// Start the server
const PORT = 3007;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
