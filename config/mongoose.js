// Setting Up and Establishing Connection with Databse

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/web_scrapper_db')

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to the database'));

db.once('open', function(){
    console.log('Successfully connected to the database');
})
