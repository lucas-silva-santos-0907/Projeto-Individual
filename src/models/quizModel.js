var database = require("../database/config")

function listar(fkUsuario) {
    var instrucao = `
    SELECT
    p.nome
    FROM quiz AS q
    INNER JOIN personagem AS p
    ON q.fkPersonagem = p.id
    WHERE q.fkUsuario = ${fkUsuario}
    ORDER BY q.dtRealizacao DESC, q.id DESC
    LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar(fkUsuario, fkPersonagem) {
    var instrucao = `
    INSERT INTO quiz (fkUsuario, fkPersonagem) VALUES 
    ('${fkUsuario}', '${fkPersonagem}');

    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function contagens() {
    var instrucao = `
    SELECT p.nome, 
	COUNT(*) AS total 
    FROM quiz q 
    JOIN personagem p ON q.fkPersonagem = p.id 
    GROUP BY p.nome;`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

module.exports = {
    cadastrar,
    listar,
    contagens
};