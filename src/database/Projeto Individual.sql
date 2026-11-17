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
descricao VARCHAR(300)
);

CREATE TABLE quiz (
id INT PRIMARY KEY AUTO_INCREMENT,
dtRealizacao DATETIME,
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