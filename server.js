const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');

const app = express();

//DB config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello'));

//Use routes
//Use routes
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App listening on port ${port}`));
