//Setting Up the node index file with appropriate Directory Structure

const express = require('express');
const app = express();
const port = 8000;
// const cors = require('cors');
const expressLayout = require('express-ejs-layouts');

// const db = require('./config/mongoose.js');
// app.use(cors())
app.use(express.urlencoded());      //Using the middleware parser 
app.use(express.static('./assets')); //To access the css and js files used in views placed in assets
app.use(expressLayout);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// app.options('*', cors())
app.use('/', require('./routes')); 
app.set('view engine', 'ejs');  //Setting the view template engine to ejss
app.set('views', './views');

// Firing up the server and checking for any error
app.listen(port, function(err){
    if(err)
    {
        console.log(`Error encountered: ${err}`);
    }
    console.log(`Server is up and running at port: ${port}`);
});