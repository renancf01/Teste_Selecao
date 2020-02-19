

<---------- Bibliotecas utilizadas ---------->

express = require('express');
router = express();
soap = require('soap');
fs = require('fs');
{parse} = require('json2csv');
csv = require('csv');
request = require('request-promise-native');

> npm install

<---------- Como iniciar ---------->

> npm start 

(Será executado o index.js)

<---------- Como executar ---------->

Para importar cadastros de novos funcionários (de "importa_dados_func.csv" para PontoWEB) no POSTMAN selecionar método "POST", inserir endereço "localhost:3000/import".

Para exportar funcionários (de PontoWEB para .csv) no POSTMAN selecionar método "POST", inserir endereço "localhost:3000/export"
será gerado "extracao_func.csv".  


