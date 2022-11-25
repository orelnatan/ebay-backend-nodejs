
const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var sqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'ebay',
    multipleStatements: true
});

sqlConnection.connect((error) => {
	if(!error){
		console.log('DB connection succeded!');
	} else {
		console.log('DB connection failed! \n Error : ' + JSON.stringify(error, undefined, 2));
	}
});

// Fix the "Access to XMLHttpRequest at 'http://localhost:3001/getProductById?imdbID=tt1123436' from origin 'http://localhost:4200' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource." problem...
const allowCrossDomain = function(request, response, next) { 
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
  
    next();
}
app.use(allowCrossDomain);

app.listen(3001, () => {
	console.log('express server is running at port number 3001');
});

//////////////////////////////////////////////////////////////// API ///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// Brands ////////////////////////////////////////////////////////////

// GET all brands.
app.get('/get-all-brands', (request, response) => {
	sqlConnection.query('SELECT * FROM brands', (error, rows, fields) => {
        handleResults(rows, response, 3000, error);
	})
});

/////////////////////////////////////////////////////////////// Categories ////////////////////////////////////////////////////////////

// GET categories by brand ID (with params).
app.get('/get-categories-by-brand-id', (request, response) => {
	sqlConnection.query(`SELECT * FROM categories WHERE brandId = '${request.query.brandId}'`, (error, rows, fields) => {
        handleResults(rows, response, 2000, error);
	});
});

/////////////////////////////////////////////////////////////// Families ////////////////////////////////////////////////////////////

// GET families by category ID (with params).
app.get('/get-families-by-category-id', (request, response) => {
	sqlConnection.query(`SELECT * FROM families WHERE categoryId = '${request.query.categoryId}'`, (error, rows, fields) => {
        handleResults(rows, response, 2000, error);
	});
});

/////////////////////////////////////////////////////////////// Products ////////////////////////////////////////////////////////////

// GET products by family ID (with params).
app.get('/get-products-by-family-id', (request, response) => {
	sqlConnection.query(`SELECT * FROM products WHERE familyId = '${request.query.familyId}'`, (error, rows, fields) => {
        handleResults(rows, response, 2000, error);
	});
});

// GET products by name (with params).
app.get('/get-products-by-name', (request, response) => {
	sqlConnection.query(`SELECT * FROM products WHERE name LIKE '%${request.query.name}%'`, (error, rows, fields) => {
        handleResults(rows, response, 2000, error);
	});
});

/////////////////////////////////////////////////////////////// Users ///////////////////////////////////////////////////////////////

// GET all users.
app.get('/get-all-users', (request, response) => {
	sqlConnection.query('SELECT * FROM users', (error, rows, fields) => {
        handleResults(rows, response, 4000, error);
	})
});

// POST login (with body).
app.post('/login', (request, response) => {
	sqlConnection.query(`SELECT * FROM users WHERE email = '${request.body.email}'`, (err, rows, fields) => {
        const user = rows[0];

        setTimeout(() => {
            if(user){
                if(user.password === request.body.password) {
                    response.status(200).send(user);
                } else {
                    response.status(404).send({
                        status: 404,
                        message: 'Wrong password, Please try again.'
                    });
                }
            } else {
                response.status(404).send({
                    status: 404,
                    message: 'Wrong email, This user is not exist.'
                });
            }	 
        }, 3000);
	});
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function handleResults(data, response, wait, error) {
    setTimeout(() => {
        if(!error){
            response.status(200).send(data);
        } else {
            response.status(404).send({
                status: 404,
                message: 'An error has occurred :('
            });
        }	
    }, wait);
}