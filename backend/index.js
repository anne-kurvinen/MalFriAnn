const dotenv = require('dotenv');
const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

const pool = new Pool({
  connectionString: process.env.PGURI,
});

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); 
app.use(express.static(path.join(path.resolve(), 'dist')));

// Simulerad användardatabas
const users = [
  {
    email: 'user@example.com',
    password: 'password'
  }
];

// Inloggningsruta
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.status(200).json({ message: 'Inloggning lyckades' });
  } else {
    res.status(401).json({ message: 'Felaktig e-postadress eller lösenord' });
  }
});

// Get membership categories
app.get('/api/membership-categories', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM memberShipCategories');
    res.json(result.rows);  
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Post member
app.post('/api/members', async (req, res) => {
  const {
    firstName,
    lastName,
    personalId,
    email,
    password,
    address,
    postcode,
    city,
    phoneNumber,
    memberShipCategories_id
  } = req.body;

  const query = `
    INSERT INTO members 
      (firstName, lastName, personalId, email, password, address, postcode, city, phoneNumber, memberShipCategories_id)
    VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;
  `;

  const values = [
    firstName, lastName, personalId, email, password, address, postcode, city, phoneNumber, memberShipCategories_id
  ];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting member:', error);
    res.status(500).send('Server error');
  }
});

app.use(express.static(path.join(path.resolve(), 'dist')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});