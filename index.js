"use strict";
const express = require('express');
const http = require('http');
const router = express();
const soap = require('soap');
const fs = require('fs');
const {parse} = require('json2csv')
const request = require('request');





const url = 'https://www.ahgora.com.br/ws/pontoweb.php?wsdl';

let xml =
`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://www.ahgora.com.br/ws">
    <soapenv:Header/>
        <soapenv:Body>
            <sincFuncionarios>
            <empresa></empresa>
                <funcionarios>
                    <funcionario>
                    </funcionario>
                </funcionarios>
            </sincFuncionarios>
        </soapenv:Body>
<soapenv:Envelope>`;

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
    soap.createClient(url, (err, client) =>{
        client.sincFuncionarios(args, (err, result) => {
            if(err){
                res.send({message: err});
            }
            console.log(result)

        })
    })
})


router.listen(3000);