// var express = require("express") et var mysql = require("mysql") Permettent de stocker les dependances d'express et de mysql
// var app = express() permet de stocker express dans notre application
var express = require("express");
var mysql = require("mysql");
var app = express();

// App fonction que je declere pour utiliser express.Json
app.use(express.json());

// connexion a ma base de donnee
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Citysport",
});

// console log pour verifier la connexion
con.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connexion établie");
  }
});

// creation des routes

// la route get permet de recuperer les donnees

app.get("/", (req, res) => {
  res.send("Je suis Mr Gervais je suis sur le chemin courant");
});

// Permet d'acceder et recuperer toutes les donnees de la table chaussures

app.get("/api/chaussures", (req, res) => {
  con.query("SELECT * FROM chaussures", (err, result) => {
    if (err) res.status(500).send(err);

    res.status(200).json(result);
  });
});

// Permet de recuperer une chaussures sur la base de son id
app.get("/api/chaussures/:id", (req, res) => {
  con.query(
    "SELECT * FROM chaussures WHERE idxChaussure=?",
    [req.params.idxChaussure],
    (err, result) => {
      if (err) res.status(500).send(err);

      res.status(200).json(result);
    }
  );
});

// ajouter et envoyer des informations dans la base de donnee

app.post("/api/chaussures/add", (req, res) => {
  const idxMarque = req.body.idxMarque;
  const taille = req.body.taille;
  const couleur = req.body.couleur;
  const prix = req.body.prix;
  const nomChaussure = req.body.nomChaussure;

  con.query(
    "INSERT INTO chaussures VALUES(NULL,?,?,?,?,?)",
    [idxMarque, taille, couleur, prix, nomChaussure],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("J'ai ajouter une chaussure");
      }
    }
  );
});

// ajouter d'une marque
app.post("/api/marques/add", (req, res) => {
  const marque = req.body.marque;
  const logo = req.body.logo;

  con.query(
    "INSERT INTO marques VALUES(NULL,?,?)",
    [marque, logo],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("J'ai ajouter d'une marque");
      }
    }
  );
});

// configuration du serveur
app.listen(7000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("on port 7000");
  }
});
