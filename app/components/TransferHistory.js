"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CurrencyConverter from './CurrencyConverter';

const TransferHistory = () => {
  // State to hold the list of transfers
  const [transfers, setTransfers] = useState([]);

  // Fetch transfers from the server on component mount
  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const response = await axios.get(`${process.env.SERVER_URL}/transfers`);
        setTransfers(response.data); // Update state with fetched transfers
      } catch (error) {
        console.error('Error fetching transfers:', error);
      }
    };
    fetchTransfers();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Delete a transfer by its ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.SERVER_URL}/transfers/${id}`);
      // Update state to remove the deleted transfer
      setTransfers(transfers.filter(transfer => transfer._id !== id));
    } catch (error) {
      console.error('Error deleting transfer:', error);
    }
  };

  // Function to add a new transfer to the list
  const addNewTransfer = (newTransfer) => {
    setTransfers(prevTransfers => [newTransfer, ...prevTransfers]); // Add new transfer to the beginning of the list
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <CurrencyConverter onNewTransfer={addNewTransfer} /><br></br> {/* CurrencyConverter component for adding new transfers */}
      <Typography variant="h4" gutterBottom>Transfer History</Typography>
      <List>
        {transfers.map(transfer => (
          <ListItem key={transfer._id} disablePadding>
            {/* Display transfer details */}
            <ListItemText
              primary={`${transfer.fromCountry} to ${transfer.toCountry}: ${transfer.amount} ${transfer.fromCountry} => ${transfer.convertedAmount} ${transfer.toCountry}`}
            />
            <ListItemSecondaryAction>
              {/* Delete button for each transfer */}
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
