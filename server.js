const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Initialize PostgreSQL client
const client = new Client({
  connectionString: 'postgresql://delmundo:l_Kvhl4YHqyH8v9FaE_mug@phased-moth-7387.g8z.gcp-us-east1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full',
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect()
  .then(() => console.log('PostgreSQL client connected successfully'))
  .catch(err => console.error('Connection error', err.stack));

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all origins

// Endpoint to get all books
app.get('/api/books', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM books');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
