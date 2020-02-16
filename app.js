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

let xml =
`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://www.ahgora.com.br/ws">
    <soapenv:Header/>
        <soapenv:Body>
            <sincFuncionarios>
            <empresa>64605baf3985fb82c9c59b26148c685c</empresa>
                <funcionarios>
                    <funcionario>
                    </funcionario>
                </funcionarios>
            </sincFuncionarios>
        </soapenv:Body>
<soapenv:Envelope>`;

const options = {
    uri: 'http://www.ahgora.com.br/',
    method: 'POST',
    body: xml,
    headers: {
        'Content-Type':'application/xml;charset=utf-8',
        'Content-Length':xml,
        'SOAPAction':"https://www.ahgora.com.br/ws/pontoweb.php/sincFuncionarios"}
    };


    soap.createClient(url, options, (err, client) => {
    client.sincFuncionarios(requestArgs, (err, result, envelope, soapHeader) =>{
        
        const funcFile = fs.readFileSync('sincFuncionarios.csv')
        
        console.log('Response envelope: \n' + envelope );
        console.log('Result: \n' + JSON.stringify(result));
        console.log('Funcionarios: \n' + funcFile)
    })
    
    });


