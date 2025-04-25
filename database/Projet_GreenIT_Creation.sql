CREATE DATABASE FlashGreen_BDD;
USE FlashGreen_BDD;

CREATE TABLE Question(
   ID_question INT,
   Intitule VARCHAR(250) NOT NULL,
   Reponse CHAR(250) NOT NULL,
   PRIMARY KEY(ID_question)
);

CREATE TABLE Personne(
   ID_personne INT,
   Nom VARCHAR(50) NOT NULL,
   Prenom VARCHAR(50) NOT NULL,
   Email VARCHAR(100) NOT NULL,
   Mot_de_passe VARCHAR(100) NOT NULL,
   Role_User INT NOT NULL,
   PRIMARY KEY(ID_personne),
   UNIQUE(Email)
);
ALTER TABLE Personne ADD CONSTRAINT CHK_Role_User CHECK (Role_User IN (0, 1, 2));

CREATE TABLE Personne_Questions(
   ID_personne INT NOT NULL,
   ID_question INT NOT NULL,
   Connue BOOLEAN NOT NULL DEFAULT 0,
   PRIMARY KEY(ID_personne, ID_question),
   FOREIGN KEY(ID_personne) REFERENCES Personne(ID_personne),
   FOREIGN KEY(ID_question) REFERENCES Question(ID_question)
);
