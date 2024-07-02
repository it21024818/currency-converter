"use client";

import React, { useState } from 'react';
import axios from 'axios';

const CurrencyConverter = ({ onNewTransfer }) => {
  const [fromCountry, setFromCountry] = useState('USD');
  const [toCountry, setToCountry] = useState('LKR');
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const convertCurrency = async () => {
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    convertCurrency();
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={fromCountry} onChange={(e) => setFromCountry(e.target.value)}>
        <option value="USD">USA</option>
        <option value="LKR">Sri Lanka</option>
        <option value="AUD">Australia</option>
        <option value="INR">India</option>
      </select>
      <select value={toCountry} onChange={(e) => setToCountry(e.target.value)}>
        <option value="USD">USA</option>
        <option value="LKR">Sri Lanka</option>
        <option value="AUD">Australia</option>
        <option value="INR">India</option>
      </select>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button type="submit">Convert</button>
      {convertedAmount && <p>Converted Amount: {convertedAmount}</p>}
    </form>
  );
};

export default CurrencyConverter;
