const express = require('express');
const soap = require('soap');

const router = express.Router();

const url = 'https://www.ahgora.com.br/ws/pontoweb.php?wsdl';
const soapKey = {empresa: 'b75cedcca855b58fc76ca7a5ee08e094'};

router.post('/export', async (req, res) =>{
    const { fields } = req.body || [];

    const client = await soap.createClientAsync('url');
    const exportEmp = await soap.obterFuncionariosAsync(soapKey);

    let listEmp = result[0].funcionarios.funcionario;
    const newListEmp = listEmp.map ( funcionario => {
        let newEmployee = {};

        fields.forEach(key => {
            if (funcionario[key]) {
                newEmployee[key] = funcionario[key];
            }
        })
    }) 
})
