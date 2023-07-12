'use strict'

const cors = require("cors");

const express = require('express');
const app = express();

const {connection} = require("./src/database/connection");
const { adminDefault } = require("./src/controller/user.controller");
const userRoutes = require('./src/routes/user.routes')
const transferRoutes = require('./src/routes/transfer.routes')

require('dotenv').config();
const port = process.env.PORT;

connection();

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use(cors());

app.use('/api', userRoutes);
app.use('/api', transferRoutes);

app.listen(port, ()=> {
    console.log(`Servidor corriendo en el puerto ${port}`);
})

adminDefault();

