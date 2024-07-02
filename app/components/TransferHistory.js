"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CurrencyConverter from './CurrencyConverter';

const TransferHistory = () => {
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const response = await axios.get(`${process.env.SERVER_URL}/transfers`);
        setTransfers(response.data);
      } catch (error) {
        console.error('Error fetching transfers:', error);
      }
    };
    fetchTransfers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.SERVER_URL}/transfers/${id}`);
      setTransfers(transfers.filter(transfer => transfer._id !== id));
    } catch (error) {
      console.error('Error deleting transfer:', error);
    }
  };

  const addNewTransfer = (newTransfer) => {
    setTransfers(prevTransfers => [newTransfer, ...prevTransfers]);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <CurrencyConverter onNewTransfer={addNewTransfer} /><br></br>
      <Typography variant="h4" gutterBottom>Transfer History</Typography>
      <List>
        {transfers.map(transfer => (
          <ListItem key={transfer._id} disablePadding>
            <ListItemText
              primary={`${transfer.fromCountry} to ${transfer.toCountry}: ${transfer.amount} ${transfer.fromCountry} => ${transfer.convertedAmount} ${transfer.toCountry}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(transfer._id)}>
                <DeleteIcon sx={{ color: 'red'}}/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TransferHistory;
