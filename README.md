# 🍃 FlashGreen - Backend

## 📃 Description du projet
**FlashGreen** est un projet étudiant en 3e année d'ingénierie informatique dans le cadre du module "Green IT".

Ce repository s'inscrit dans une liste de trois repositories : 
 - https://github.com/AdamChb/flash-green-front
 - https://github.com/AdamChb/flash-green-front-v2
 - https://github.com/AdamChb/flash-green-back

L'objectif de ce projet est de concevoir une application web la moins énergétique possible tout en ayant un frontend, un backend et une base de données.

Ce repository ```https://github.com/AdamChb/flash-green-back``` est celui du backend. Hébergé sur *vercel.com* il a été adapté dès le début de la conception à tourner sur cet hébergeur.
Il ne peut être lancé tel quel en local étant donné qu'il n'est pas prévu pour cela.

**flash-green-back** est l'API du projet. Il sert de liaison ainsi que de couche de sécurité entre le frontend et la base de données.

## 🧑‍💻 Auteurs
Les personnes ayant travaillé sur cette partie du projet sont : 
 - Adam : [adam.chaba@efrei.net](mailto:adam.chaba@efrei.net)

**Contribution :**
La contribution au projet se fait dans des branches distinctes. Chaque branche a sont utilité.
Les commits/pushs ne sont pas limités dans les branches mais un pull request doit être fait pour demander à ce que la branche soit merge dans le projet.

## 📎Installation et déploiement
**Clonage du repo :** 
```bash
git clone https://github.com/AdamChb/flash-green-back.git
```
**Configuration :**
Le projet nécessite des variable d'environnement qui sont :
 - DB_HOST : correspondant à l'url de la base de donnée ;
 - DB_USER : correspondant à l'identifiant utilisateur sur la base de données ;
 - DB_PASSWORD : correspondant au mot de passe de l'utilisateur sur la base de données ;
 - DB_NAME : correspondant au nom de la base de données sur l'host ;
 - JWT_SECRET : correspondant au token secret de JWT sur le projet, nécessaire pour générer les token utilisateur à la connexion.

**Exécution du projet :**
Le projet étant configuré pour tourner sur Vercel, il n'est pas possible de le déployer en local.
