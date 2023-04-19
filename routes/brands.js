const mysql = require('mysql');
const express = require('express');
const connectionConfig = require('../consts/connection-config.json');

const sqlConnection = mysql.createConnection(connectionConfig);
const router = express.Router();

const getExeption = require('../functions/get-exeption');

// GET all brands.
router.get('/get-all-brands', (request, response) => {
	sqlConnection.query('SELECT * FROM brands', (error, rows, fields) => {
        setTimeout(() => {
            if(!error){
                response.status(200).send(rows);
            } else {
                return getExeption(response, 404, 'An error has occurred :(');
            }	
        }, 3000);
	})
});

module.exports = router;