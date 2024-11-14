const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.PGURI,
});

const validateToken = async (req, res, next) => {
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

    req.memberId = tokenData.member_id;

    next();
  } catch (error) {
    console.error('Error validating token:', error);
    res.status(500).json({ message: 'Server error during token validation' });
  }
};

module.exports = validateToken;
