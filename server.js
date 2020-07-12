const express = require('express');
const { connectDB } = require('./config/db');

const app = express();

//to connect to the mongodb database
connectDB();

//Initialize middleware for post json requests
app.use(express.json());

// The routes for the API of auth
app.use('/api/user', require('./routes/userRoute'));
app.use('/api/auth', require('./routes/authRoute'));

// for ports
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
