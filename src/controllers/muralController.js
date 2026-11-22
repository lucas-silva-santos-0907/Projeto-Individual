var muralModel = require("../models/muralModel");

function listar(req, res) {
    var idUsuario = req.params.idUsuario;

    var curtidasDoUsuario = idUsuario ? muralModel.listarCurtidasUsuario(idUsuario) : Promise.resolve([]);

    Promise.all([
        muralModel.listarPosts(),
        muralModel.listarComentarios(),
        curtidasDoUsuario
    ]).then(function (resultado) {
        var posts = resultado[0];
        var comentarios = resultado[1];
        var curtidasUsuario = resultado[2] || [];

        var curtidasMap = new Set(curtidasUsuario.map(function (item) {
            return item.fkMural;
        }));

        var comentariosPorMural = {};
        comentarios.forEach(function (comentario) {
            if (!comentariosPorMural[comentario.fkMural]) {
                comentariosPorMural[comentario.fkMural] = [];
            }
            comentariosPorMural[comentario.fkMural].push(comentario);
        });

        var payload = posts.map(function (post) {
            return {
                idMural: post.idMural,
                conteudo: post.conteudo,
                dtPublicacao: post.dtPublicacao,
                idUsuario: post.idUsuario,
                nome: post.nome,
                totalCurtidas: post.totalCurtidas,
                curtidoPorMim: curtidasMap.has(post.idMural),
                comentarios: comentariosPorMural[post.idMural] || []
            };
        });

        res.status(200).json(payload);
    }).catch(function (erro) {
        console.log("Houve um erro ao listar o mural: ", erro);
        res.status(500).json(erro.sqlMessage || erro);
    });
}

function publicar(req, res) {
    var conteudo = req.body.conteudo;
    var idUsuario = req.params.idUsuario;

    if (conteudo == undefined || conteudo.trim().length == 0) {
        res.status(400).send("O conteúdo da publicação está vazio");
    } else if (idUsuario == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else {
        muralModel.publicar(conteudo, idUsuario)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log("Houve um erro ao publicar no mural: ", erro.sqlMessage || erro);
                res.status(500).json(erro.sqlMessage || erro);
            });
    }
}

function curtir(req, res) {
    var idMural = req.params.idMural;
    var idUsuario = req.params.idUsuario;

    if (!idMural || !idUsuario) {
        res.status(400).send("Id do mural ou do usuário está indefinido");
        return;
    }

    muralModel.curtir(idMural, idUsuario)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao curtir no mural: ", erro.sqlMessage || erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

function descurtir(req, res) {
    var idMural = req.params.idMural;
    var idUsuario = req.params.idUsuario;

    if (!idMural || !idUsuario) {
        res.status(400).send("Id do mural ou do usuário está indefinido");
        return;
    }

    muralModel.descurtir(idMural, idUsuario)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao remover curtida do mural: ", erro.sqlMessage || erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

function comentar(req, res) {
    var idMural = req.params.idMural;
    var idUsuario = req.params.idUsuario;
    var conteudo = req.body.conteudo;

    if (conteudo == undefined || conteudo.trim().length == 0) {
        res.status(400).send("Comentário vazio");
    } else if (!idMural || !idUsuario) {
        res.status(400).send("Id do mural ou do usuário está indefinido");
    } else {
        muralModel.comentar(conteudo, idMural, idUsuario)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log("Erro ao inserir comentário: ", erro.sqlMessage || erro);
                res.status(500).json(erro.sqlMessage || erro);
            });
    }
}

function deletar(req, res) {
    var idMural = req.params.idMural;
    var idUsuario = req.params.idUsuario;

    if (!idMural || !idUsuario) {
        res.status(400).send("Id do mural ou do usuário está indefinido");
        return;
    }

    muralModel.deletar(idMural)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao deletar publicação: ", erro.sqlMessage || erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

function totalCurtidasUsuario(req, res) {
    const idUsuario = req.params.idUsuario;
    if (!idUsuario) {
        res.status(400).send("Id do usuário está indefinido");
        return;
    }

    muralModel.totalCurtidasUsuario(idUsuario)
        .then(resultado => {
            res.status(200).json({ total: resultado[0]?.totalCurtidas || 0 });
        })
        .catch(erro => {
            console.log("Erro ao buscar total de curtidas:", erro.sqlMessage || erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

function totalPublicacoes(req, res) {
    const idUsuario = req.params.idUsuario;
    if (!idUsuario) {
        res.status(400).send("Id do usuário está indefinido");
        return;
    }
    
    muralModel.totalPublicacoes(idUsuario)
        .then(resultado => {
            res.status(200).json({ total: resultado[0]?.totalPublicacoes || 0 });
        })
        .catch(erro => {
            console.log("Erro ao buscar total de publicacoes:", erro.sqlMessage || erro);
            res.status(500).json(erro.sqlMessage || erro);
        });



}

function atividades(req, res) {
    const idUsuario = req.params.idUsuario;
    if (!idUsuario) {
        res.status(400).send("Id do usuário está indefinido");
        return;
    }

    muralModel.atividadesUsuario(idUsuario)
        .then(resultado => {
            res.status(200).json(resultado);
        })
        .catch(erro => {
            console.log("Erro ao buscar atividades do mural:", erro.sqlMessage || erro);
            res.status(500).json(erro.sqlMessage || erro);
        });
}

module.exports = {
    listar,
    publicar,
    curtir,
    descurtir,
    comentar,
    deletar,
    totalCurtidasUsuario,
    totalPublicacoes,
    atividades
};
