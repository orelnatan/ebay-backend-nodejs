const mysql = require('mysql');
const express = require('express');
const connectionConfig = require('../consts/connection-config.json');

const sqlConnection = mysql.createConnection(connectionConfig);
const router = express.Router();

const getExeption = require('../functions/get-exeption');

// GET families by category ID (with params).
router.get('/get-families-by-category-id', (request, response) => {
	sqlConnection.query(`SELECT * FROM families WHERE categoryId = '${request.query.categoryId}'`, (error, rows, fields) => {
        setTimeout(() => {
            if(!error){
                response.status(200).send(rows);
            } else {
                return getExeption(response, 404, 'An error has occurred :(');
            }	
        }, 2500);
	});
});

module.exports = router;
