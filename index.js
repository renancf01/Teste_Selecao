"use strict";
const express = require('express');
const router = express();
const soap = require('soap');
const fs = require('fs');
const {parse} = require('json2csv');
const csv = require('csv');
const request = require('request-promise-native');

const url = 'https://www.ahgora.com.br/ws/pontoweb.php?wsdl';

const importCsv = csv();

function MyCsv(matricula, nome, sexo,pis,email,cpf,rg,cargo,departamento,dataNascimento,dataAdmissao) {
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

importCsv.from.path('importa_dados_func.csv').to.array(function (data) {
   
    for (var index = 0; index < data.length; index++) {
        funcionario.push(new MyCSV(data[index][0], data[index][1], data[index][2], data[index][3], data[index][4], data[index][5], data[index][6], data[index][7], data[index][8], data[index][9], data[index][10]));
    }
    
});

const chaveSoap = 'b75cedcca855b58fc76ca7a5ee08e094';

const body = {
    empresa: cahveSoap,
    funcionarios: {funcionario}
}
const options = {
    
    method: 'POST',
    request: request.defaults({
        strictSSL: false,
        rejectUnauthorized: false,
        })
    
}

const args = chaveSoap;

router.post('/export', (req, res) => {
    
    soap.createClient(url, (err, client) => {
        if(err){
                res.send({message: err});
            }
            
        client.obterFuncionarios(args, (err, result) => {
            if(err){
                res.send({messange: err});
            }
        
            let listJson = result.funcionarios.funcionario
                         
            const csv = parse(listJson)

            res.send(fs.writeFileSync('./extracao_func.csv', csv));
            
        })
        res.send('Funcionários exportado com sucesso.');
    });
});

router.post('/import', (req, res) => {
    
    soap.createClient(url, options, (error, client) =>{
        if(error){
            res.send(error);
        }
        
        client.sincFuncionarios(body, (err, result, rawResponse, soapHeader, rawRequest) => {
            if(err){
                res.send({message: err});
            }
        
            res.send(result)

        })
     })
})

router.listen(3000);
