
const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const connectionConfig = require('./consts/connection-config.json');

const users = require("./routes/users");
const brands = require("./routes/brands");
const categories = require("./routes/categories");
const families = require("./routes/families");
const products = require("./routes/products");

const sqlConnection = mysql.createConnection(connectionConfig);
const app = express();

const allowCrossDomain = require('./functions/allow-cross-domain');

app.use(bodyparser.json());
app.use(allowCrossDomain);

app.use(users);
app.use(brands);
app.use(categories);
app.use(families);
app.use(products);

app.listen(3001, () => {
	console.log('Express server is running at port number 3001');
});

sqlConnection.connect((error) => {
	if(!error){
		console.log('Database connection succeded!');
	} else {
		console.log('Database connection failed! \n Error: ' + JSON.stringify(error, undefined, 2));
	}
});
