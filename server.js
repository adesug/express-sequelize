const express = require('express'),
        app = express(),
        cors = require('cors'),
        dotenv = require('dotenv'),
        route = require('./routes/route');

        app.use(express.urlencoded({ extended: false}));
        dotenv.config();
        app.use(cors());
        route(app);

module.exports = app ;
