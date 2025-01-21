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
//
