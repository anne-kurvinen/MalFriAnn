const express = require('express'),
  path = require('path')

const app = express()

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