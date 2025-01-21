// Server file for your app

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg'); // Import Pool correctly

// Call the channel for your server
const app = express();
const port = 5021;

app.use(cors({
    origin: 'http://localhost:3000' // React frontend URL
}));


// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Create the bridge to your database
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Root route to check server status
app.get('/', (req, res) => {
    res.send('Welcome to the Product Manager API!');
});


// GET all products
// "GET" means we are gathering all our products from the database
app.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows); // Corrected `results.row` to `result.rows`
    } catch (error) {
        // This is what you will see if there is an error with 
        // grabbing products - check the code
        res.status(500).send('Error fetching products');
    }
});

// ADD a new product
app.post('/api/products', async (req, res) => {
    const { name, price } = req.body;
    try {
        // This is what happens in our database to add a new item/product
        const result = await pool.query(
            'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
            [name, price]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send('Error adding product');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
