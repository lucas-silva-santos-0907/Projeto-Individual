var quizModel = require("../models/quizModel");

function listar(req, res) {
    quizModel.listar().then(function(resultado){
        // precisamos informar que o resultado voltará para o front-end como uma resposta em json
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}


function cadastrar(req, res) {
    console.log("Dados recebidos pelo Controller:", req.body);

    var fkUsuario = req.body.fkUsuario;
    var fkPersonagem = req.body.fkPersonagem;

    if (fkUsuario == undefined) {
       return res.status(400).send("Seu fkUsuario está undefined!");
        
    } else if (fkPersonagem == undefined) {
       return res.status(400).send("Seu fkPersonagem está undefined!");
        
    }

    quizModel.cadastrar(fkUsuario, fkPersonagem).then(function(resposta){
        // res.json(resposta);
        res.status(200).send("Quiz cadastrado com sucesso!");
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    listar,
    cadastrar
}