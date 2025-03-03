create database prueba_Tecnica;
use prueba_Tecnica;

CREATE TABLE USUARIOS (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    NOMBRE VARCHAR(100),
    CORREO VARCHAR(100),
    PAIS VARCHAR(50),
    FOTO VARCHAR(255)
);

CREATE TABLE DIRECCIONES (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    USUARIO_ID INT,
    CALLE VARCHAR(100),
    CIUDAD VARCHAR(100),
    ESTADO VARCHAR(50),
    CODIGO_POSTAL VARCHAR(20),
    FOREIGN KEY (USUARIO_ID) REFERENCES USUARIOS(ID)
);


CREATE VIEW VW_USUARIOS_CON_DIRECCIONES AS
SELECT u.nombre, u.correo, d.calle, d.ciudad, d.estado, d.codigo_postal
FROM usuarios u
JOIN direcciones d ON u.id = d.usuario_id;

-- Inserción de usuarios
INSERT INTO USUARIOS (ID, NOMBRE, CORREO, PAIS, FOTO) VALUES
(100, 'Fatma Erginsoy', 'fatma.erginsoy@example.com', 'Turkey', 'https://randomuser.me/api/portraits/med/women/24.jpg'),
(101, 'Lyna Dupont', 'lyna.dupont@example.com', 'France', 'https://randomuser.me/api/portraits/med/women/86.jpg'),
(102, 'Marvin Shelton', 'marvin.shelton@example.com', 'Australia', 'https://randomuser.me/api/portraits/med/men/82.jpg'),
(106, 'Samantha Howard', 'samantha.howard@example.com', 'Australia', 'https://randomuser.me/api/portraits/med/women/81.jpg'),
(107, 'Carlota Menchaca', 'carlota.menchaca@example.com', 'Mexico', 'https://randomuser.me/api/portraits/med/women/80.jpg');

-- Inserción de direcciones
INSERT INTO DIRECCIONES (USUARIO_ID, CALLE, CIUDAD, ESTADO, CODIGO_POSTAL) VALUES
(100, '123 Main Street', 'Istanbul', 'Istanbul', '34000'),
(101, '456 Rue de Paris', 'Paris', 'Île-de-France', '75001'),
(102, '789 Queen Street', 'Sydney', 'New South Wales', '2000'),
(106, '101 Beach Avenue', 'Sydney', 'New South Wales', '2000'),
(107, '202 Avenida Reforma', 'Mexico City', 'CDMX', '01000');

