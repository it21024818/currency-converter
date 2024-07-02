const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const transferSchema = new mongoose.Schema({
  fromCountry: String,
  toCountry: String,
  amount: Number,
  convertedAmount: Number,
  date: { type: Date, default: Date.now }
});

const Transfer = mongoose.model('Transfer', transferSchema);

app.post('/transfers', async (req, res) => {
  const { fromCountry, toCountry, amount, convertedAmount } = req.body;
  const newTransfer = new Transfer({ fromCountry, toCountry, amount, convertedAmount });
  await newTransfer.save();
  res.json(newTransfer);
});

app.get('/transfers', async (req, res) => {
  const transfers = await Transfer.find();
  res.json(transfers);
});

app.delete('/transfers/:id', async (req, res) => {
  await Transfer.findByIdAndDelete(req.params.id);
  res.json({ message: 'Transfer record deleted' });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
