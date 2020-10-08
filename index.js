// initialisation du server express
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const bodyParser = require("body-parser");
const cors = require("cors");

// connexion au serveur de bdd via mongoose
const { mongoose } = require("./db.js");

// creation des routes
// on recupère le routage dans la variable controleProduit via la modularisation
var controleProduit = require("./controle/controle-produit");
// gestion des dossiers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

app.listen(PORT, () => {
  console.log(` app ecoute sur le port ${PORT}`);
});
// on definit la connexion avec le server Bdd
app.use("/listes", controleProduit);
