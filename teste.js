"use strict";
const express = require('express');
const router = express();
const soap = require('soap');
const fs = require('fs');
const {parse} = require('json2csv')
const csv = require('csv');
const request = require('request-promise-native')
const bodyParser = require('body-parser');

router.use(bodyParser.json());

const url = 'https://www.ahgora.com.br/ws/pontoweb.php?wsdl';

const clientCSV = csv();

function MyCSV(matricula, nome, sexo,pis,email,cpf,rg,cargo,departamento,dataNascimento,dataAdmissao) {
    this.matricula = matricula;
    this.nome = nome;
    this.sexo = sexo;
    this.pis = pis;
    this.email = email;
    this.cpf = cpf;
    this.rg = rg;
    this.cargo = cargo;
    this.departamento = departamento;
    this.dataNascimento = dataNascimento;
    this.dataAdmissao = dataAdmissao;
   
}; 

let funcionario = [];

clientCSV.from.path('importa_dados_func.csv').to.array(function (data) {
   
    for (var index = 0; index < data.length; index++) {
        funcionario.push(new MyCSV(data[index][0], data[index][1], data[index][2], data[index][3], data[index][4], data[index][5], data[index][6], data[index][7], data[index][8], data[index][9], data[index][10]));
    }
    
});

const body = {
    empresa: 'b75cedcca855b58fc76ca7a5ee08e094',
    funcionarios: {funcionario}
}
const options = {
    
    method: 'POST',
    request: request.defaults({
        strictSSL: false,
        rejectUnauthorized: false,
        })
    
}

const args = {empresa: 'b75cedcca855b58fc76ca7a5ee08e094'}

router.post('/export', async (req, res) => {
    const { fields } =  req.body || []
    
    const client = await soap.createClientAsync(url)
    const result = await client.obterFuncionariosAsync(args);
    let listJson = result[0].funcionarios.funcionario
    // const newList = listJson.map( funcionario => {
    //     let newFuncionario = {};

    //     fields.forEach(element => {
            
    //     });(key => {
    //         if (funcionario[key]) {
    //             newFuncionario[key] = funcionario[key]
    //         }

    //     })
    //     return newFuncionario;
    // })
    const csv = parse(listJson);

    res.send(fs.writeFileSync('./extracao_func.csv', csv));
    res.send('Funcionários exportado com sucesso.');
});

router.post('/import', async (req, res) => {
    
    const client = await soap.createClientAsync(url, options);
    try {
        const result = await client.sincFuncionariosAsync(body)
        res.send(result)
    } catch (error) {
         res.send({message: error});
    }
})

router.listen(3000, ()=> console.log('subiu na porta 3000'));