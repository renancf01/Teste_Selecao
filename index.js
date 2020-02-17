"use strict";
const express = require('express');
const http = require('http');
const router = express();
const soap = require('soap');
const fs = require('fs');
const {parse} = require('json2csv')
const request = require('request');

const url = 'https://www.ahgora.com.br/ws/pontoweb.php?wsdl';
const funcFile = fs.readFileSync('importa_dados_funcionarios.xml')

let xml = '<?xml version="1.0" encoding="UTF-8"?>'+
'<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="https://www.ahgora.com.br/ws">'+
    '<SOAP-ENV:Body>'+
        '<ns1:sincFuncionariosResponse>'+
            '<totais>'+
            '</totais>'+
        '</ns1:sincFuncionariosResponse>'+
    '</SOAP-ENV:Body>'+
'</SOAP-ENV:Envelope>;';

const options = {
    url: 'https://www.ahgora.com.br/ws/pontoweb.php?wsdl',
    method: 'POST',
    body: xml,
    headers: {
        'Content-Type':'text/xml;charset=utf-8',
        'Accept-Encoding': 'gzip,deflate',
        'Content-Length':xml.length,
        'SOAPAction':"https://www.ahgora.com.br/ws/pontoweb.php/sincFuncionarios"
    }
}
const args = {
    empresa: '64605baf3985fb82c9c59b26148c685c'
       
};

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
    soap.createClient(url, options, (err, client) =>{
        
        client.sincFuncionarios(args, (err, result, envelope) => {
            if(err){
                res.send({message: err});
            }
            res.send(options.body)

        })
    })
})


router.listen(3000);