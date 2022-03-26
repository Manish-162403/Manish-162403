const express = require('express');
var bodyParser = require('body-parser');


const route = require('./routes/route.js');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var multer = require('multer');  
var upload = multer();

app.use(upload.array()); 
app.use(express.static('public'));

const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://Parth1111:a5xZnL6DVS-c-!7@cluster0.9doof.mongodb.net/group44Database?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true})
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))

app.use('/functionup', route);

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});


