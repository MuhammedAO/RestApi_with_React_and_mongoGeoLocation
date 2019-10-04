const express = require ('express');
// const bodyParser = require('body-parser');

const mongoose = require('mongoose');

// const keys = require ('./config/keys');
const config = require('config');
mongoose.set('useFindAndModify', false);

mongoose.set('useCreateIndex', true);

//import your route for useage
const routes = require ('./routes/api');

//setup express app
const app = express();

const db = config.get('mongoURI');

mongoose
	.connect(db, {
		useNewUrlParser: true,
		autoReconnect: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("MongoDB connected"))
	.catch(err => console.log(err));


app.use(express.static('public'));

//the order is important. it must always come before your routes
// app.use(bodyParser.json());
//call your routes for useage
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',routes);

//error handling middleware
app.use((err, req, res, next) =>{
    res.status(404).send({error:err.message});
})



//listen for request
//if you're deploying your app to a hosting service e.g heroku, there might be a enviroment variable which provides which port to listen to. hence, process.env.port

app.listen(process.env.port ||4000, () =>{
console.log('now listening for requests');
});