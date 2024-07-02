const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define mongoose schema for transfers
const transferSchema = new mongoose.Schema({
  fromCountry: String,
  toCountry: String,
  amount: Number,
  convertedAmount: Number,
  date: { type: Date, default: Date.now } // Default date to current date/time
});

// Create mongoose model based on schema
const Transfer = mongoose.model('Transfer', transferSchema);

// POST endpoint to add a new transfer record
app.post('/transfers', async (req, res) => {
  const { fromCountry, toCountry, amount, convertedAmount } = req.body;
  const newTransfer = new Transfer({ fromCountry, toCountry, amount, convertedAmount });
  await newTransfer.save(); // Save the new transfer record to MongoDB
  res.json(newTransfer); // Respond with the saved transfer object in JSON format
});

// GET endpoint to fetch all transfer records
app.get('/transfers', async (req, res) => {
  const transfers = await Transfer.find(); // Retrieve all transfers from MongoDB
  res.json(transfers); // Respond with the array of transfer objects in JSON format
});

// DELETE endpoint to delete a transfer record by ID
app.delete('/transfers/:id', async (req, res) => {
  await Transfer.findByIdAndDelete(req.params.id); // Find and delete transfer by ID
  res.json({ message: 'Transfer record deleted' }); // Respond with a success message
});

// Start the server and listen on port 5000
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
