"use strict";
const express = require('express');
const soap = require('soap');
const config = require('../routes/acessRoutes');

const routes = express.Router();

routes.post('/', async (req, res) => {
    
    const client = await soap.createClientAsync(config.url, config.options);
    try {
    
    const importResult = await client.sincFuncionariosAsync(config.body.soapKey, config.body.funcionarios);
        
        res.send(importResult)

    }catch (error) {
            console.log(error)
    }    
        
});

module.exports = routes