
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


const dotenv = require('dotenv'),
  { Client } = require('pg')
const { title } = require('process')

  dotenv.config()

const client = new Client({
  connectionString: process.env.PGURI
})

client.connect()

const port = process.env.PORT || 3000;

app.get('/api', async (_request, response) => {
  const { rows } = await client.query(
    'SELECT * FROM memberShips WHERE title = $1',
    ['VIP']
  )

  response.send(rows)
})

app.use(express.static(path.join(path.resolve(), 'dist')))

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
