// const express = require('express');

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';


const app = express();

// middlewere

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-power-by'); //less hackers know about our stack

const port = 8080;


// http get request;
app.get('/', (req, res)=>{
    res.status(201).json("Home Get Requet");
});



// api routes
app.use('/api', router);

// start server only when we have valid connection
connect().then(()=>{
    try{
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        });
    } catch(error) {
        console.log("Connot connecct to the server");
    }
}).catch(error =>{
    connect.log("Invalid database connection....");
})

