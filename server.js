//server file for which ur app wil  live on 

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {pool} = require('pg');

//call the channel for your server
const app = express();
const port = 5000;

//create the bridge to your db
const pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

//GET all products 
//get means we are gathering all our products from the db 
app.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(results.row);
    } catch (error) {
        //this is what you will see if there is an error with 
        // grabbing products - check code
        res.status(500).send('Error fetching products');
    } 
});

//ADD a new product
app.post('api/products', async (req, res) => {
    const {name, price} = req.body;
    try{
        //this is what happens in our db to add new item/product
        const result = await pool.query(
           'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *' ,
           [name, price]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send("error adding product");
    }
});

app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
});
