const mysql = require('mysql');
const express = require('express');
const connectionConfig = require('../consts/connection-config.json');

const sqlConnection = mysql.createConnection(connectionConfig);
const router = express.Router();

const getExeption = require('../functions/get-exeption');

// GET all users.
router.get('/get-all-users', (request, response) => {
	sqlConnection.query('SELECT * FROM users', (error, rows, fields) => {
        setTimeout(() => {
            if(!error){
                response.status(200).send(rows);
            } else {
                return getExeption(response, 404, 'An error has occurred :(');
            }	
        }, 4000);
	})
});

// POST login (with body).
router.post('/login', (request, response) => {
	sqlConnection.query(`SELECT * FROM users WHERE email = '${request.body.email}'`, (err, rows, fields) => {
        const user = rows[0];
    
        setTimeout(() => {
            if(user){
                if((user.password === request.body.password) && (user.name === request.body.username)) {
                    response.status(200).send(user);
                } else {
                    return getExeption(response, 404, 'Wrong username or password, Please try again.');
                }
            } else {
                return getExeption(response, 404, 'Wrong email, This user is not exist.');
            }	 
        }, 4000);
	});
});

module.exports = router;

