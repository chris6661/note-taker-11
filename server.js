const express = require('express');
const path = require('path'); 
const apiRoutes = require('./routes/apiRoutes'); 
const htmlRoutes = require('./routes/htmlRoutes'); 

//initalize app and ceate port
const app = express();
const PORT = process.env.PORT || 3000; 

app.use(express.json()); 
app.use(express.urlencoded({ extended:true })); 
app.use(express.static(path.join(__dirname, '/public'))); 

//use api routes
app.use(apiRoutes); 
app.use(htmlRoutes); 

//start server on port
app.listen(PORT, () => {
    console.log('API server now on PORT: ${PORT}'); 
});