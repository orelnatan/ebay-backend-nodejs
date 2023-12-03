const mysql = require('mysql');
const express = require('express');
const connectionConfig = require('../consts/connection-config.json');

const sqlConnection = mysql.createConnection(connectionConfig);
const router = express.Router();

const getExeption = require('../functions/get-exeption');

var moment = require('moment'); 

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
      if(user) {
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

// POST register (with body).
router.post('/register', (request, response) => {
  sqlConnection.query('SELECT * FROM users', (error, rows, fields) => {
    const ids = rows.map(user => user.id);
    const indexes = rows.map(user => user.index);
    const emails = rows.map(user => user.email);
    
    setTimeout(() => {
      if(emails.indexOf(request.body.email) == -1) {
        const id = Math.max(...ids) + 1;
        const index = Math.max(...indexes) + 1;
        const joinedAt = moment().format('YYYY-MM-DD');

        sqlConnection.query(`INSERT INTO users (id, avatar, users.index, name, password, registered, description, email, phone, type, company, address)
         VALUES (
          ${id},
         '${request.body.avatar}',
          ${index}, 
         '${request.body.name}', 
         '${request.body.password}', 
         '${joinedAt}', 
         '${request.body.description}',
         '${request.body.email}',
          ${request.body.phone}, 
         '${request.body.type}', 
         '${request.body.company}', 
         '${request.body.address}')`, 
         (error, rows, fields) => { 
          response.status(200).send(request.body);
        })
      } else {
        return getExeption(response, 404, 'This email is already in use.');
      }
    }, 4500);    
	})
})

module.exports = router;
