// Import required packages
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Set up the PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// --- API Route for Contact Form ---
app.post('/api/contact', async (req, res) => {
  // Extract data from the request body
  const { name, email, location, budget, subject, message } = req.body;

  // Basic validation: Check for required fields
  if (!name || !email || !budget || !subject || !message) {
    return res.status(400).json({ error: 'Please fill out all required fields.' });
  }

  // SQL query to insert the data into the 'messages' table
  const insertQuery = `
  INSERT INTO messages(name, email, location, budget, subject, message)
  VALUES($1, $2, $3, $4, $5, $6)
  RETURNING id;
`;
  const values = [name, email, location, budget, subject, message];

  try {
    // Execute the query
    const result = await pool.query(insertQuery, values);
    console.log(`Message saved with ID: ${result.rows[0].id}`);
    // Send a success response
    res.status(201).json({ success: true, message: 'Message received successfully!' });
  } catch (err) {
    console.error('Error saving message to database:', err);
    // Send an error response
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});