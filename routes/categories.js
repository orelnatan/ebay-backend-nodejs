const mysql = require('mysql');
const express = require('express');
const connectionConfig = require('../consts/connection-config.json');

const sqlConnection = mysql.createConnection(connectionConfig);
const router = express.Router();

const getExeption = require('../functions/get-exeption');

// GET categories by brand ID (with params).
router.get('/get-categories-by-brand-id', (request, response) => {
	sqlConnection.query(`SELECT * FROM categories WHERE brandId = '${request.query.brandId}'`, (error, rows, fields) => {
        setTimeout(() => {
            if(!error){
                response.status(200).send(rows);
            } else {
                return getExeption(response, 404, 'An error has occurred :(');
            }	
        }, 2000);
	});
});

module.exports = router;
