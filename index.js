"use strict";
const express = require('express');

const router = express();
const soap = require('soap');
const fs = require('fs');
const readFile = require('fs').readFile;
const {parse} = require('json2csv')
const csv = require('csv-parser');
const request = require('request')



const url = 'https://www.ahgora.com.br/ws/pontoweb.php?wsdl';


let funcionario = [];
fs.createReadStream('importa_dados_func.csv')
    .pipe(csv({separator: '\;'}))
    .on('headers', (headers)=> {
        funcionario.push(`
        matricula: ${headers[0]}
        nome: ${headers[1]}
        sexo: ${headers[2]}
        pis: ${headers[3]}
        email: ${headers[4]}
        cpf: ${headers[5]}
        rg: ${headers[6]}
        cargo: ${headers[7]}
        departamento: ${headers[8]}
        dataNascimento: ${headers[9]}
        dataAdmissao: ${headers[10]}
        `)
        
    })
    .on('close', function(){
        callback(funcionario)
    })


// let funcionario = {
//     nome: 'Renan Carvalho',
//     pis: '73971332865',
//     dataAdmissao: '15022020',
//     matricula: '1234',
//     cpf: '082.846.439-10'
// }
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


router.post('/export', (req, res) => {
    
    soap.createClient(url, (err, client) => {
        if(err){
                res.send({message: err});
            }
        client.obterFuncionarios(args, (err, result) => {
            if(err){
                res.send({messange: err});
            }

            const jsonResult =  result.funcionarios.funcionario
            const csv = parse(jsonResult)
            
            res.send(fs.writeFileSync('./extracao_func.csv', csv));
        
        })
    });
});

router.post('/import', (req, res) => {
    
    soap.createClient(url, options, (error, client) =>{
        if(error){
            console.log(error);
        }
        
        client.sincFuncionarios(body, (err, result, rawResponse, soapHeader, rawRequest) => {
            console.log(rawRequest)
            if(err){
                res.send({message: err});
            }
        
            res.send(result)

        })
     })
})


router.listen(3000);