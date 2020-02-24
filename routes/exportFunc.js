"use strict";
const express = require('express');
const soap = require('soap');
const fs = require('fs');
const {parse} = require('json2csv');
const config = require('../routes/acessRoutes');

const routes = express.Router();

routes.post('/', async (req, res) =>{
    
    // const { fields } = req.body || [];
    try{
    const client = await soap.createClientAsync(config.url);
    const resultEmployee = await client.obterFuncionariosAsync(config.body.soapKey);
    
    let listEmployee = resultEmployee[0].funcionarios.funcionario;
    
    // const newListEmployee = listEmployee.map ( funcionario => {
    //     let newEmployee = {};

    //     fields.forEach(key => {
    //         if (funcionario[key]) {
    //             newListEmployee[key] = funcionario[key];
    //         }
    //     });
    //     return newEmployee;
    // });
    const csv = parse(listEmployee);
    
    res.send(fs.writeFileSync('./extracao_func.csv', csv))
    } catch (error) {
        return console.log(error);
    } 
});

module.exports = routes