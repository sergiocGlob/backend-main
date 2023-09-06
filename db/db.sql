DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	image VARCHAR(255) NULL,
	route VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

INSERT INTO roles(

	name,
	route,
	created_at,
	updated_at

)
VALUES(
	'CLIENTE',
	'client',
	'2021-11-08',
	'2021-11-08'
);

INSERT INTO roles(

	name,
	route,
	created_at,
	updated_at

)
VALUES(
	'ADMINISTRADOR',
	'administrator',
	'2021-11-08',
	'2021-11-08'
);


DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR(50) NOT NULL UNIQUE,
	name VARCHAR(100) NOT NULL,
	lastname VARCHAR(100) NOT NULL,
	image VARCHAR (255) NULL,
	password VARCHAR(255) NOT NULL,
	is_available BOOLEAN NULL,
	session_token VARCHAR(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);


DROP TABLE IF EXISTS user_has_roles CASCADE;
CREATE TABLE user_has_roles(
	id_user BIGSERIAL NOT NULL,
	id_rol BIGSERIAL NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY(id_user, id_rol)
);

INSERT INTO users(
	email,
	name,
	lastname,
	password,
	created_at,
	updated_at
)
VALUES(
	'jorge_2692™hotmail.com',
	'Jorge',
	'Arrieta',
	'jmaa2692',
	'2021-11-04',
	'2021-11-04'
);

DROP TABLE IF EXISTS categories CASCADE;
CREATE TABLE categories(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL UNIQUE,
	description VARCHAR(255) NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);

DROP TABLE IF EXISTS machines CASCADE;
CREATE TABLE machines(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL,
	description VARCHAR(255) NOT NULL,
	serial VARCHAR (30) NOT NULL,
	model VARCHAR (30) NOT NULL,
	id_lavanti DECIMAL DEFAULT 1 NULL, 
	voltaje DECIMAL DEFAULT 0,
	corriente DECIMAL DEFAULT 0,
	potencia  DECIMAL DEFAULT 0,
	image1 VARCHAR (255) NULL,
	image2 VARCHAR (255) NULL,
	id_category BIGINT NOT NULL,
	id_address BIGINT NOT NULL,
	created_at TIMESTAMP (0) NOT NULL,
	updated_at TIMESTAMP (0) NOT NULL,
	FOREIGN KEY (id_category) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (id_address) REFERENCES address(id) ON UPDATE CASCADE ON DELETE CASCADE

);

DROP TABLE IF EXISTS address CASCADE;
CREATE TABLE address(
	id BIGSERIAL PRIMARY KEY,
	id_city BIGINT NOT NULL,
	name VARCHAR(180) NOT NULL UNIQUE,
	address VARCHAR(255) NOT NULL,
	neighborhood VARCHAR(255) NOT NULL,
	lat DECIMAL DEFAULT 0,
	lng DECIMAL DEFAULT 0,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY (id_city) REFERENCES cities(id) ON UPDATE CASCADE ON DELETE CASCADE
);


DROP TABLE IF EXISTS cities CASCADE;
CREATE TABLE cities(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL,
	department VARCHAR(180) NOT NULL UNIQUE, 
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL

);

DROP TABLE IF EXISTS esp8266 CASCADE;
CREATE TABLE esp8266(
	id VARCHAR PRIMARY KEY NOT NULL UNIQUE,
	ssid VARCHAR(180) NOT NULL,
	password VARCHAR(180) NOT NULL,
	gpio0 BOOLEAN NOT NULL DEFAULT FALSE,
	gpio1 BOOLEAN NOT NULL DEFAULT FALSE,
	id_machine BIGINT NOT NULL,

	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY (id_machine) REFERENCES machines(id) ON UPDATE CASCADE ON DELETE CASCADE

);

DROP TABLE IF EXISTS data_reading CASCADE;
CREATE TABLE data_reading(
	id VARCHAR NOT NULL,
	voltage DECIMAL DEFAULT 0,
	ampers DECIMAL DEFAULT 0,
	potency DECIMAL DEFAULT 0,

	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL

);

DROP TABLE IF EXISTS error CASCADE;
CREATE TABLE error(
	id BIGSERIAL PRIMARY KEY NOT NULL,
	voltage DECIMAL DEFAULT 0,
	ampers DECIMAL DEFAULT 0,
	potency DECIMAL DEFAULT 0,
	id_esp VARCHAR NOT NULL,
	alert VARCHAR NOT NULL,

	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY (id_esp) REFERENCES esp8266(id) ON UPDATE CASCADE ON DELETE CASCADE

);