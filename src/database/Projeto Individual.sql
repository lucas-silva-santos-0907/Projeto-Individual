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
dtPublicacao DATETIME,
fkUsuario INT,
CONSTRAINT fk_user FOREIGN KEY (fkUsuario)
								REFERENCES usuario(id)
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

INSERT INTO quiz (fkUsuario, fkPersonagem) VALUES
(1, 1);

SELECT * FROM quiz;



SELECT
    p.nome,
    p.descricao
FROM quiz AS q
INNER JOIN personagem AS p
    ON q.fkPersonagem = p.id
WHERE q.fkUsuario = 1
ORDER BY q.dtRealizacao DESC, q.id DESC
LIMIT 1;
