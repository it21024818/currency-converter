"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CurrencyConverter from "./CurrencyConverter";

const TransferHistory = () => {
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const fetchTransfers = async () => {
      const response = await axios.get(`${process.env.SERVER_URL}/transfers`);
      setTransfers(response.data);
    };
    fetchTransfers();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${process.env.SERVER_URL}/transfers/${id}`);
    setTransfers(transfers.filter(transfer => transfer._id !== id));
  };

  const addNewTransfer = (newTransfer) => {
    setTransfers(prevTransfers => [newTransfer, ...prevTransfers]);
  };

  return (
    <div>
    <CurrencyConverter onNewTransfer={addNewTransfer} />
      <h2>Transfer History</h2>
      <ul>
        {transfers.map(transfer => (
          <li key={transfer._id}>
            {transfer.fromCountry} to {transfer.toCountry}: {transfer.amount} ={'>'} {transfer.convertedAmount}
            <button onClick={() => handleDelete(transfer._id)}>Revoke</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransferHistory;
