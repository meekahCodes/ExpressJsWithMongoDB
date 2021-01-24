require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");


mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('DB CONNECTED'));

//make our app use json format in get and post methods
app.use(express.json())

//create routes
const subscriberRouter = require('./routes/subscribers')
app.use('/subscribers', subscriberRouter);

app.listen(3000, () => console.log('server started'));

