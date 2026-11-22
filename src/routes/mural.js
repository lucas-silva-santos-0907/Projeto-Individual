var express = require("express");
var router = express.Router();

var muralController = require("../controllers/muralController");

router.get("/listar/:idUsuario?", function (req, res) {
    muralController.listar(req, res);
});

router.get("/total-curtidas/:idUsuario", function (req, res) {
    muralController.totalCurtidasUsuario(req, res)
});

router.get("/total-publicacoes/:idUsuario", function (req, res) {
    muralController.totalPublicacoes(req, res)
});

router.get("/atividades/:idUsuario", function (req, res) {
    muralController.atividades(req, res);
});

router.post("/publicar/:idUsuario", function (req, res) {
    muralController.publicar(req, res);
});

router.post("/curtir/:idMural/:idUsuario", function (req, res) {
    muralController.curtir(req, res);
});

router.post("/descurtir/:idMural/:idUsuario", function (req, res) {
    muralController.descurtir(req, res);
});

router.post("/comentar/:idMural/:idUsuario", function (req, res) {
    muralController.comentar(req, res);
});

router.delete("/deletar/:idMural/:idUsuario", function (req, res) {
    muralController.deletar(req, res);
});

module.exports = router;
