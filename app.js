const express = require('express');
const mongoose = require('mongoose'); //library
const bodyParser = require('body-parser'); //parses incoming request which contains data
const cors = require('cors'); //interact with server
const path = require('path'); // for serving static files

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); //used to allow cors requests
app.use(express.static('public'));

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

// Handle form submission
app.post('/submit', async (req, res) => {
    try {
        const formData = req.body;

        // Validate account number for returns
        if (formData.actionType === 'Return' && !formData.accountNumber) {
            return res.status(400).json({ message: 'Account number is required for returns' });
        }

        // Save the form data to MongoDB
        const newForm = new Form(formData);
        await newForm.save();
        res.status(201).json({ message: 'Form submitted successfully', formData: newForm });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'success.html'));
});


app.get('/succesmessage', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'succesmessage.html'));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
