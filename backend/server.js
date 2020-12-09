const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');

const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });

mongoose.connection.on("connected", () => console.log(`Connected to database`));

mongoose.connection.on("error", (err) => console.log(`Database error: ${err}`));

const app = express();

const port = process.env.PORT || 8080;

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'production')
    app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'build')));

app.use(passport.initialize({}));
app.use(passport.session({}));
require("./api/middlewares/authentication")(passport);

app.use('/api', require('./api/routes'));

app.get('*', (_, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));

app.listen(port, () => console.log(`App running on port ${port}`));