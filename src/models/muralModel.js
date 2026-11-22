var database = require("../database/config");

function listarPosts() {
    console.log("Listando publicações do mural");
    var instrucaoSql = `
        SELECT
            m.id AS idMural,
            m.conteudo,
            m.dtPublicacao,
            u.id AS idUsuario,
            u.nome,
            COALESCE(ct.totalCurtidas, 0) AS totalCurtidas
        FROM mural m
            INNER JOIN usuario u
                ON m.fkUsuario = u.id
            LEFT JOIN (
                SELECT fkMural, COUNT(*) AS totalCurtidas
                FROM curtida
                GROUP BY fkMural
            ) ct
                ON m.id = ct.fkMural
        ORDER BY m.dtPublicacao DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarCurtidasUsuario(idUsuario) {
    console.log("Listando curtidas do usuário no mural: ", idUsuario);
    var instrucaoSql = `
        SELECT fkMural
        FROM curtida
        WHERE fkUsuario = ${idUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarComentarios() {
    console.log("Listando comentários do mural");
    var instrucaoSql = `
        SELECT
            c.id AS idComentario,
            c.conteudo,
            c.dtComentario,
            c.fkMural,
            c.fkUsuario,
            u.nome AS nomeUsuario
        FROM comentario c
            INNER JOIN usuario u
                ON c.fkUsuario = u.id
        ORDER BY c.dtComentario ASC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function publicar(conteudo, fkUsuario) {
    console.log("Inserindo publicação no mural: ", conteudo, fkUsuario);
    var instrucaoSql = `
        INSERT INTO mural (conteudo, fkUsuario)
        VALUES ('${conteudo}', ${fkUsuario});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function curtir(fkMural, fkUsuario) {
    console.log("Adicionando curtida no mural", fkMural, fkUsuario);
    var instrucaoSql = `
        INSERT INTO curtida (fkUsuario, fkMural)
        VALUES (${fkUsuario}, ${fkMural});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function descurtir(fkMural, fkUsuario) {
    console.log("Removendo curtida do mural", fkMural, fkUsuario);
    var instrucaoSql = `
        DELETE FROM curtida
        WHERE fkUsuario = ${fkUsuario}
            AND fkMural = ${fkMural};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function comentar(conteudo, fkMural, fkUsuario) {
    console.log("Inserindo comentário no mural", fkMural, fkUsuario);
    var instrucaoSql = `
        INSERT INTO comentario (conteudo, fkMural, fkUsuario)
        VALUES ('${conteudo}', ${fkMural}, ${fkUsuario});
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(idMural) {
    console.log("Excluindo publicação e dependências do mural", idMural);

    var instrucoes = [
        `DELETE FROM comentario WHERE fkMural = ${idMural};`,
        `DELETE FROM curtida WHERE fkMural = ${idMural};`,
        `DELETE FROM mural WHERE id = ${idMural};`
    ];

    return instrucoes.reduce(function (promise, instrucaoSql) {
        return promise.then(function () {
            console.log("Executando a instrução SQL: \n" + instrucaoSql);
            return database.executar(instrucaoSql);
        });
    }, Promise.resolve());
}

module.exports = {
    listarPosts,
    listarCurtidasUsuario,
    listarComentarios,
    publicar,
    curtir,
    descurtir,
    comentar,
    deletar
};
