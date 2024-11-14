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

// Inloggningsruta
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM members WHERE email = $1 AND password = $2', [email, password]);
    const user = result.rows[0];

    if (user) {
      res.status(200).json({ message: 'Inloggning lyckades' });
    } else {
      res.status(401).json({ message: 'Felaktig e-postadress eller lösenord. Är du registrerad medlem, försök igen!' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Server error');
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

// Get member by email
app.get('/api/members/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const result = await pool.query('SELECT email, password FROM members WHERE email = $1', [email]);
    const user = result.rows[0];

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Användare inte hittad' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Server error');
  }
});

// Hämta medlemsinformation för MyAccount.jsx
app.get('/api/myaccount', async (req, res) => {
  const userId = req.user.id;  // Kontrollera att användaren har ett id
  try {
    const result = await pool.query(
      'SELECT id, firstName, lastName, email, personalId, address, postcode, city, phoneNumber, memberShipCategories_id FROM members WHERE id = $1',
      [userId]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Användare inte hittad' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Fel vid hämtning av användardata' });
  }
});

// Uppdatering av medlemsprofil
app.put('/api/myaccount', async (req, res) => {
  const userId = req.user.id; 
  const { firstName, lastName, email, personalId, address, postcode, city, phoneNumber, password } = req.body;

  const query = `
    UPDATE members 
    SET firstName = $1, lastName = $2, email = $3, personalId = $4, address = $5, postcode = $6, city = $7, phoneNumber = $8, password = $9
    WHERE id = $10
    RETURNING *;
  `;

  const values = [firstName, lastName, email, personalId, address, postcode, city, phoneNumber, password, userId];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length > 0) {
      res.json({ message: 'Profilen uppdaterades', user: result.rows[0] });
    } else {
      res.status(404).json({ message: 'Användare inte hittad' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Fel vid uppdatering av användardata' });
  }
});

// Radera användarprofil
app.delete('/api/myaccount', async (req, res) => {
  const userId = req.user.id; 
  try {
    await pool.query('DELETE FROM members WHERE id = $1', [userId]);
    res.json({ message: 'Profilen raderades' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Fel vid radering av profil' });
  }
});

app.use(express.static(path.join(path.resolve(), 'dist')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});