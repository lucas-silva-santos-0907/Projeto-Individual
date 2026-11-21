var database = require("../database/config")

function listar() {
    var instrucao = `
        SELECT
    p.nome,
    p.descricao
FROM quiz AS q
INNER JOIN personagem AS p
    ON q.fkPersonagem = p.id
WHERE q.fkUsuario = 1
ORDER BY q.dtRealizacao DESC, q.id DESC
LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar(fkUsuario, fkPersonagem) {
    var instrucao = `
                INSERT INTO quiz (fkUsuario, fkPersonagem) VALUES ('${fkUsuario}', '${fkPersonagem}');

    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar,
    listar
};