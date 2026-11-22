
var database = require("../database/config");

function listar() {
    console.log("ACESSEI O MURAL MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    var instrucaoSql = `
        SELECT
            m.id AS idMural,
            m.conteudo,
            m.dtPublicacao,
            u.id AS idUsuario,
            u.nome
        FROM mural m
            INNER JOIN usuario u
                ON m.fkUsuario = u.id
        ORDER BY m.dtPublicacao DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pesquisarDescricao(texto) {
    console.log("ACESSEI O MURAL MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()");

    var instrucaoSql = `
        SELECT
            m.id AS idMural,
            m.conteudo,
            m.dtPublicacao,
            m.fkUsuario,
            u.id AS idUsuario,
            u.nome
        FROM mural m
            INNER JOIN usuario u
                ON m.fkUsuario = u.id
        WHERE m.conteudo LIKE '%${conteudo}%';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorUsuario(fkUsuario) {
    console.log("ACESSEI O MURAL MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");

    var instrucaoSql = `
        SELECT
            m.id AS idMural,
            m.conteudo,
            m.dtPublicacao,
            m.fkUsuario,
            u.id AS idUsuario,
            u.nome
        FROM mural m
            INNER JOIN usuario u
                ON m.fkUsuario = u.id
        WHERE u.id = ${fkUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function publicar(conteudo, fkUsuario) {
    console.log("function publicar():", conteudo, fkUsuario);

    var instrucaoSql = `
        INSERT INTO mural (conteudo, fkUsuario)
        VALUES ('${conteudo}', ${fkUsuario});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(conteudo, id) {
    console.log("ACESSEI O MURAL MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", conteudo, id);

    var instrucaoSql = `
        UPDATE mural
        SET conteudo = '${conteudo}'
        WHERE id = ${id};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(idAviso) {
    console.log("ACESSEI O MURAL MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idAviso);

    var instrucaoSql = `
        DELETE FROM mural
        WHERE id = ${idAviso};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    listarPorUsuario,
    pesquisarDescricao,
    publicar,
    editar,
    deletar
}
