CREATE DATABASE project_time;

USE project_time;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)
);

CREATE TABLE personagem (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
descricao VARCHAR(300)
);

CREATE TABLE quiz (
id INT PRIMARY KEY AUTO_INCREMENT,
dtRealizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
fkUsuario INT,
CONSTRAINT fk_usuario FOREIGN KEY (fkUsuario)
								REFERENCES usuario(id),
fkPersonagem INT,
CONSTRAINT fk_personagem FOREIGN KEY (fkPersonagem)
									REFERENCES personagem(id)
);

CREATE TABLE mural (
id INT PRIMARY KEY AUTO_INCREMENT,
conteudo VARCHAR(500),
dtPublicacao DATETIME DEFAULT CURRENT_TIMESTAMP,
fkUsuario INT,
CONSTRAINT fk_user FOREIGN KEY (fkUsuario)
								REFERENCES usuario(id)
);

CREATE TABLE comentario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    conteudo VARCHAR(500),
    dtComentario DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkUsuario INT,
    fkMural INT,

    CONSTRAINT fk_comentario_usuario
        FOREIGN KEY (fkUsuario)
        REFERENCES usuario(id),

    CONSTRAINT fk_comentario_mural
        FOREIGN KEY (fkMural)
        REFERENCES mural(id)
);

CREATE TABLE curtida (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT,
    fkMural INT,

    CONSTRAINT fk_curtida_usuario
        FOREIGN KEY (fkUsuario)
        REFERENCES usuario(id),

    CONSTRAINT fk_curtida_mural
        FOREIGN KEY (fkMural)
        REFERENCES mural(id),

    CONSTRAINT uk_usuario_mural
        UNIQUE (fkUsuario, fkMural)
);

SELECT * FROM usuario;

INSERT INTO personagem (nome, descricao) VALUES
('Finn', 'Finn é um jovem herói corajoso e determinado, que está sempre disposto a enfrentar perigos e ajudar quem precisa. Possui um forte senso de justiça, um grande coração e uma paixão por aventuras.'),
('Jake', 'Jake é um cachorro mágico e descontraído, capaz de esticar e transformar seu corpo de diversas maneiras. Melhor amigo de Finn, é divertido, leal e costuma oferecer conselhos valiosos.'),
('BMO', 'BMO é um pequeno console de videogame com personalidade própria. Criativo, inocente e imaginativo, adora brincar, jogar e inventar histórias, demonstrando sentimentos e uma maneira única de enxergar o mundo.'),
('Princesa Jujuba', 'Princesa Jujuba é uma cientista brilhante e governante do Reino Doce. Inteligente, responsável e estratégica, dedica-se a proteger seus cidadãos por meio de suas invenções e conhecimentos científicos.'),
('Marceline', 'Marceline é uma vampira independente e apaixonada por música. Com uma personalidade rebelde e descontraída, esconde um lado sensível e sentimental, marcado por experiências do passado e relações importantes.'),
('Rei Gelado', 'Rei Gelado é um personagem excêntrico que utiliza uma coroa mágica para controlar o gelo. Apesar de seu comportamento atrapalhado, possui uma história triste, marcada pela solidão e pelo desejo de encontrar companhia.');

SELECT * FROM personagem;

SELECT * FROM usuario;

SELECT * FROM quiz;

INSERT INTO quiz (fkUsuario, fkPersonagem) VALUES
(1, 1);


SELECT
    p.nome
FROM quiz AS q
INNER JOIN personagem AS p
    ON q.fkPersonagem = p.id
WHERE q.fkUsuario = 2
ORDER BY q.dtRealizacao DESC, q.id DESC
LIMIT 1;

SELECT p.nome, 
	COUNT(*) AS total 
FROM quiz q 
JOIN personagem p ON q.fkPersonagem = p.id 
GROUP BY p.nome;

