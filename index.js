const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./config/db');
const profile = require('./routes/profile');

const app = express();

const port = process.env.PORT || 8080;

//Authorization
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//add cors
app.use(cors());

//add body-parser
app.use(bodyParser.json());

//create static directory
app.use(express.static(path.join(__dirname, 'public')));

//connect to db
mongoose.connect(
  config.db,
  { useNewUrlParser: true,  useUnifiedTopology: true } ,
);

mongoose.connection.on('connected', () => {
  console.log("Success connection to db")
});

mongoose.connection.on('error', (err) => {
  console.log("Error to connection to db: " + err);
});

//route
app.get('/', (req, res) => {
  res.send('Main page');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.use('/profile', profile);

// start server
app.listen(port, () => {
  console.log("Server run on port: " + port);
});