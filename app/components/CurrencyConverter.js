"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem, InputAdornment, TextField, Button, Box } from '@mui/material';

const CurrencyConverter = ({ onNewTransfer }) => {
  // State variables for currency conversion
  const [fromCountry, setFromCountry] = useState('USD');
  const [toCountry, setToCountry] = useState('LKR');
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(null);

  // Function to convert currency
  const convertCurrency = async () => {
    try {
      // Fetch exchange rate from API
      const response = await axios.get(`${process.env.EXCHANGE_RATE_API}/pair/${fromCountry}/${toCountry}/${amount}`);
      const conversionResult = response.data.conversion_result;
      setConvertedAmount(conversionResult);

      // Save transfer to the database
      const newTransferResponse = await axios.post(`${process.env.SERVER_URL}/transfers`, {
        fromCountry,
        toCountry,
        amount,
        convertedAmount: conversionResult,
      });

      // Call the onNewTransfer function to update the transfer history
      if (onNewTransfer) {
        onNewTransfer(newTransferResponse.data);
      }
    } catch (error) {
      console.error('Error converting currency:', error);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    convertCurrency();
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2, border: '1px solid #ccc', borderRadius: 8, backgroundColor: 'white' }}>
      <form onSubmit={handleSubmit}>
        {/* Dropdown for selecting "From" country */}
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
          <InputLabel id="from-country-label">From Country</InputLabel>
          <Select
            labelId="from-country-label"
            value={fromCountry}
            onChange={(e) => setFromCountry(e.target.value)}
            label="From Country"
          >
            <MenuItem value="USD">USA</MenuItem>
            <MenuItem value="LKR">Sri Lanka</MenuItem>
            <MenuItem value="AUD">Australia</MenuItem>
            <MenuItem value="INR">India</MenuItem>
          </Select>
        </FormControl>
        {/* Dropdown for selecting "To" country */}
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
          <InputLabel id="to-country-label">To Country</InputLabel>
          <Select
            labelId="to-country-label"
            value={toCountry}
            onChange={(e) => setToCountry(e.target.value)}
            label="To Country"
          >
            <MenuItem value="USD">USA</MenuItem>
            <MenuItem value="LKR">Sri Lanka</MenuItem>
            <MenuItem value="AUD">Australia</MenuItem>
            <MenuItem value="INR">India</MenuItem>
          </Select>
        </FormControl>
        {/* Input field for entering amount */}
        <TextField
          fullWidth
          type="number"
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">{fromCountry}</InputAdornment>,
          }}
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        {/* Button to initiate currency conversion */}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginBottom: 2 }}>
          Convert
        </Button>
        {/* Display converted amount if conversion is successful */}
        {convertedAmount && <p style={{ color: '#000' }}>Converted Amount: {convertedAmount} {toCountry}</p>}
      </form>
    </Box>
  );
};

export default CurrencyConverter;
