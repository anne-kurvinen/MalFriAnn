const dotenv = require('dotenv');
const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const compression = require('compression'); // Import compression

dotenv.config();

const app = express();

const pool = new Pool({
  connectionString: process.env.PGURI,
});

// Middleware
app.use(compression()); // Enable gzip compression
app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); 
app.use(express.static(path.join(path.resolve(), 'dist')));

// Definiera en rutt för rot-URL:en
app.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'dist', 'index.html'));
});

// Definiera en rutt för rot-URL:en
app.get('/api', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'dist', 'index.html'));
});

// Inloggningsruta
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM members WHERE email = $1 AND password = $2', [email, password]);
    const user = result.rows[0];

    if (user) {
      // Generate a unique token
      const token = uuidv4();

      // Insert the token into the 'tokens' table, linking it to the member_id
      await pool.query(
        'INSERT INTO tokens (member_id, token) VALUES ($1, $2)',  
        [user.id, token]
      );

      // Send the token back to the client
      res.status(200).json({ message: 'Login successful', token: token });
    } else {
      res.status(401).json({ message: 'Felaktig e-postadress eller lösenord. Är du registrerad medlem, försök igen!' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Server error');
  }
});

// Resten av dina rutter...

app.use(express.static(path.join(path.resolve(), 'dist')));

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});