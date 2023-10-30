const mysql = require('mysql');
const express = require('express');
const connectionConfig = require('../consts/connection-config.json');

const sqlConnection = mysql.createConnection(connectionConfig);
const router = express.Router();

const getExeption = require('../functions/get-exeption');

// GET products by family ID (with params).
router.get('/get-products-by-family-id', (request, response) => {
	sqlConnection.query(`SELECT * FROM products WHERE familyId = '${request.query.familyId}'`, (error, rows, fields) => {
    setTimeout(() => {
      if(!error){
        response.status(200).send(rows);
      } else {
        return getExeption(response, 404, 'An error has occurred :(');
      }	
    }, 1800);
	});
});

// GET products by name (with params).
router.get('/get-products-by-name', (request, response) => {
	sqlConnection.query(`SELECT * FROM products WHERE name LIKE '%${request.query.name}%'`, (error, rows, fields) => {
    setTimeout(() => {
      if(!error){
        response.status(200).send(rows);
      } else {
        return getExeption(response, 404, 'An error has occurred :(');
      }	
    }, 1500);
	});
});

module.exports = router;

