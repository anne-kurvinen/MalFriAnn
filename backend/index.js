
const dotenv = require('dotenv');
const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Initialize the app first
const app = express();

// Set up database connection pool
const pool = new Pool({
  connectionString: process.env.PGURI,
});

app.use(cors());
app.use(express.json()); 
app.use(express.static(path.join(path.resolve(), 'dist')));

// Define routes
app.get('/api/membership-categories', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM memberShipCategories');
    console.log(result.rows); // Log the result to check data
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


app.use(express.static(path.join(path.resolve(), 'dist')));


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
