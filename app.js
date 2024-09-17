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
mongoose.connect('mongodb://127.0.0.1:27017/returnExchangeDB', {
   
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

        if (formData.actionType === 'Return' && !formData.accountNumber) {
            return res.status(400).json({ message: 'Account number is required for returns' });
        }

        const newForm = new Form(formData);
        await newForm.save();
        res.status(201).json({ message: 'Form submitted successfully', formData: newForm });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// // Serve static HTML files
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'login.html'));
// });

// app.get('/login.html', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'login.html'));
// });

// app.get('/signup.html', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'signup.html'));
// });

// app.get('/return_exchange_form.html', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'return_exchange_form.html'));
// });

// app.get('/submission_received.html', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'submission_received.html'));
// });

// app.get('/submission_success.html', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'submission_success.html'));
// });

// app.get('/feedback.html', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'feedback.html'));
// });

// app.get('/feedback_success.html', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'feedback_success.html'));
// });

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
const PORT = 3006;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
