"use strict";

const soap = require('strong-soap').soap;
const request = require('request');
const express = require('express');
const app = express()
const fs = require('fs');

const url = 'https://www.ahgora.com.br/ws/pontoweb.php?wsdl';

const requestArgs = {
    empresa: "64605baf3985fb82c9c59b26148c685c",
    
};

const funcFile = fs.readFileSync('importa_dados_funcionarios.xml')

let xml =
'<?xml version="1.0" encoding="UTF-8"?>'+
'<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="https://www.ahgora.com.br/ws">'+
    '<SOAP-ENV:Body>'+
        '<ns1:sincFuncionariosResponse>'+
            '<totais>'+ funcFile +'</totais>'+
        '</ns1:sincFuncionariosResponse>'+
    '</SOAP-ENV:Body>'+
'</SOAP-ENV:Envelope>;'

const options = {
    uri: 'http://www.ahgora.com.br/',
    method: 'POST',
    body: xml,
    headers: {
        'Content-Type':'application/xml;charset=utf-8',
        'Content-Length':xml,
        'SOAPAction':"https://www.ahgora.com.br/ws/pontoweb.php/sincFuncionarios"}
    };

    

    soap.createClient(url, options,(err, client) => {
        
    client.sincFuncionarios(requestArgs, (err, result, envelope, body) =>{
        
        // const funcFile = fs.readFileSync('sincFuncionarios.csv')
        
        console.log('Response envelope: \n' + envelope );
        console.log('Result: \n' + JSON.stringify(result));
        console.log('Result: \n' + JSON.stringify(options.body));
        
        // console.log('Funcionarios: \n' + funcFile)
    })
    
    });


