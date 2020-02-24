const csv = require('csv');
const request = require('request-promise-native');


const csvFile = csv();

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

csvFile.from.path('../importa_dados_func.csv').to.array(function (data) {
   
    for (var index = 0; index < data.length; index++) {
        funcionario.push(new MyCSV(data[index][0], data[index][1], data[index][2], data[index][3], data[index][4], data[index][5], data[index][6], data[index][7], data[index][8], data[index][9], data[index][10]));
    }
    
});

const config = () => {
    return {
        url: 'https://www.ahgora.com.br/ws/pontoweb.php?wsdl',
        
        body: {
            soapKey: { empresa: 'b75cedcca855b58fc76ca7a5ee08e094'},
            funcionarios: {funcionario}
        },
        options: {
            method: 'POST',
            request: request.defaults({
                strictSSL: false,
                rejectUnauthorized: false,
                })
            
        }
    }
}

module.exports = config();

