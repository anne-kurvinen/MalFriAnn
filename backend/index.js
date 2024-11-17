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

// Get all notes for the logged-in member
app.get('/api/notes', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Token saknas. Vänligen logga in.' });
  }

  try {
    // Query to check if token is valid
    const result = await pool.query('SELECT member_id FROM tokens WHERE token = $1', [token]);
    const tokenData = result.rows[0];

    if (!tokenData) {
      return res.status(401).json({ message: 'Ogiltig token. Vänligen logga in igen.' });
    }

    const member_id = tokenData.member_id;

    // Query to get the notes for the member
    const noteResult = await pool.query(
      `
      SELECT 
        notes.*, 
        CONCAT(members.firstName, ' ', members.lastName) AS member_name
      FROM 
        notes
      LEFT JOIN 
        members ON notes.member_id = members.id
      WHERE 
        notes.member_id = $1
      `,
      [member_id]
    );

    // Respond with the notes
    res.json(noteResult.rows);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).send('Server Error');
  }
});

// Add a new note
app.post('/api/notes', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token saknas. Vänligen logga in.' });
  }

  try {
    const result = await pool.query('SELECT member_id FROM tokens WHERE token = $1', [token]);
    const tokenData = result.rows[0];

    if (!tokenData) {
      return res.status(401).json({ message: 'Ogiltig token. Vänligen logga in igen.' });
    }

    const member_id = tokenData.member_id;
    const { title, description } = req.body;

    const noteResult = await pool.query(
      `
      INSERT INTO notes (title, description, member_id)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [title, description, member_id]
    );

    res.status(201).json(noteResult.rows[0]);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).send('Server Error');
  }
});


// Delete a note for the logged-in user
app.delete('/api/notes/:id', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token saknas. Vänligen logga in.' });
  }

  try {
    const result = await pool.query('SELECT member_id FROM tokens WHERE token = $1', [token]);
    const tokenData = result.rows[0];

    if (!tokenData) {
      return res.status(401).json({ message: 'Ogiltig token. Vänligen logga in igen.' });
    }

    const member_id = tokenData.member_id;
    const { id } = req.params;

    const noteResult = await pool.query(
      `
      DELETE FROM notes 
      WHERE id = $1 AND member_id = $2
      RETURNING *
      `,
      [id, member_id]
    );

    if (noteResult.rows.length === 0) {
      return res.status(404).json({ message: 'Note not found or not authorized' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).send('Server Error');
  }
});


// Add a new route to handle fetching user data
app.get('/api/myaccount', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Token saknas. Vänligen logga in.' });
  }

  try {
    // Find the member linked to the token
    const result = await pool.query('SELECT member_id FROM tokens WHERE token = $1', [token]);
    const tokenData = result.rows[0];

    if (!tokenData) {
      return res.status(401).json({ message: 'Ogiltig token. Vänligen logga in igen.' });
    }

    // Fetch the member data based on the member_id
    const memberResult = await pool.query('SELECT * FROM members WHERE id = $1', [tokenData.member_id]);
    const member = memberResult.rows[0];

    if (member) {
      res.status(200).json(member); // Send member data
    } else {
      res.status(404).json({ message: 'Användare inte hittad' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT endpoint for updating the profile
app.put('/api/myaccount', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token saknas. Vänligen logga in.' });
  }

  try {
    // Find the member linked to the token
    const result = await pool.query('SELECT member_id FROM tokens WHERE token = $1', [token]);
    const tokenData = result.rows[0];

    if (!tokenData) {
      return res.status(401).json({ message: 'Ogiltig token. Vänligen logga in igen.' });
    }

    // Fetch the member data based on the member_id
    const memberResult = await pool.query('SELECT * FROM members WHERE id = $1', [tokenData.member_id]);
    const member = memberResult.rows[0];

    if (!member) {
      return res.status(404).json({ message: 'Användare inte hittad' });
    }

    // Get the updated data from the request body
    const { firstName, lastName, email, address, postcode, city, phoneNumber, password } = req.body;

    // Update the user's data in the members table
    const updateResult = await pool.query(
      'UPDATE members SET firstName = $1, lastName = $2, email = $3, address = $4, postcode = $5, city = $6, phoneNumber = $7, password = $8 WHERE id = $9 RETURNING *',
      [firstName, lastName, email, address, postcode, city, phoneNumber, password, tokenData.member_id]
    );

    const updatedMember = updateResult.rows[0];

    if (updatedMember) {
      res.status(200).json(updatedMember); // Send the updated member data
    } else {
      res.status(400).json({ message: 'Det gick inte att uppdatera profilen' });
    }
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE Endpoint to delete user account
app.delete('/api/myaccount', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Token saknas. Vänligen logga in.' });
  }

  try {
    // Find the member linked to the token
    const result = await pool.query('SELECT member_id FROM tokens WHERE token = $1', [token]);
    const tokenData = result.rows[0];

    if (!tokenData) {
      return res.status(401).json({ message: 'Ogiltig token. Vänligen logga in igen.' });
    }

    // Fetch the member data based on the member_id
    const memberResult = await pool.query('SELECT * FROM members WHERE id = $1', [tokenData.member_id]);
    const member = memberResult.rows[0];

    if (!member) {
      return res.status(404).json({ message: 'Användare inte hittad' });
    }

    // Delete the user's account from the members table
    await pool.query('DELETE FROM members WHERE id = $1', [tokenData.member_id]);

    await pool.query('DELETE FROM tokens WHERE token = $1', [token]);

    res.status(200).json({ message: 'Profilen raderades framgångsrikt.' });
  } catch (error) {
    console.error('Error deleting user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.use(express.static(path.join(path.resolve(), 'dist')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});