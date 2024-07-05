CREATE DATABASE tienda
CREATE TABLE productos (
	id int PRIMARY KEY AUTO_INCREMENT not null,
	codigo varchar(510),
	producto varchar(510),
	categoria_id int,
	existencia_actual int,
	precio decimal(11,2)
);

CREATE TABLE categorias (
	id int PRIMARY KEY AUTO_INCREMENT,
    categoria varchar(510) not null
);