const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

const users = require('./routes/api/users');
const productRouter = require('./routes/product-router');

const app = express();

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('You are watching the server page.');
});

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

//Routes
app.use('/api/', productRouter);
app.use('/api/users', users);

const apiPort = process.env.PORT || 3000;

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
