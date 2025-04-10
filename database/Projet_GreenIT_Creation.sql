CREATE DATABASE FlashGreen_BDD;
USE FlashGreen_BDD;

CREATE TABLE Question(
   ID_question INT,
   Intitule VARCHAR(100) NOT NULL,
   PRIMARY KEY(ID_question)
);

CREATE TABLE Reponse(
   ID_reponse INT,
   Texte VARCHAR(500) NOT NULL,
   Valeur BOOLEAN NOT NULL,
   ID_question INT NOT NULL,
   PRIMARY KEY(ID_reponse),
   FOREIGN KEY(ID_question) REFERENCES Question(ID_question)
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

CREATE TABLE Quiz(
   ID_Quiz INT,
   Nb_question INT NOT NULL,
   PRIMARY KEY(ID_Quiz)
);

CREATE TABLE Quiz_Questions(
   ID_question INT NOT NULL,
   ID_Quiz INT NOT NULL,
   PRIMARY KEY(ID_question, ID_Quiz),
   FOREIGN KEY(ID_question) REFERENCES Question(ID_question),
   FOREIGN KEY(ID_Quiz) REFERENCES Quiz(ID_Quiz)
);

CREATE TABLE Personne_Quiz(
   ID_personne INT NOT NULL,
   ID_Quiz INT NOT NULL,
   Note INT,
   PRIMARY KEY(ID_personne, ID_Quiz),
   FOREIGN KEY(ID_personne) REFERENCES Personne(ID_personne),
   FOREIGN KEY(ID_Quiz) REFERENCES Quiz(ID_Quiz)
);
