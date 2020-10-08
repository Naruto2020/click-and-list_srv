// initialisation du routeur express
const express = require("express");
const router = express.Router();
const CORS = require("cors");
// import de l'objetId de mongoose
const ObjetId = require("mongoose").Types.ObjectId;
// import de l'objet modele liste
const { Liste } = require("../modele/liste.js");

// routage
//  => localhost:3000/listes/produits
// afichage de la liste
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.get("/produits", (req, res, next) => {
  Liste.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "erreur de transmission de listes:" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});
// recherche et affichage  avec id
router.get("/produits/:id", (req, res, next) => {
  if (!ObjetId.isValid(req.params.id))
    return res.status(400).send(`id incorrecte ${req.params.id}`);
  Liste.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "erreur de transmission de listes:" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});
// ajout et enregistrement des données
router.post("/produits", (req, res, next) => {
  var lis = new Liste({
    name: req.body.name,
    status: req.body.status,
  });
  lis.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "erreur lors de l'enregistrement du produit:" +
          JSON.stringify(err, undefined, 2)
      );
    }
  });
});
// maj des données
router.put("/produits/:id", (req, res, next) => {
  if (!ObjetId.isValid(req.params.id))
    return res.status(400).send(`id incorrecte ${req.params.id}`);

  var lis = {
    name: req.body.name,
    status: req.body.status,
  };
  Liste.findByIdAndUpdate(
    req.params.id,
    { $set: lis },
    { new: true }, // cette option permet de retourner toutes les mises a jours dans la reponse
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "erreur lors de la mise a jour du produit:" +
            JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});
// suppression des produits
router.delete("/produits/:id", (req, res, next) => {
  if (!ObjetId.isValid(req.params.id))
    return res.status(400).send(`id incorrecte ${req.params.id}`);
  Liste.findByIdAndDelete(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "erreur lors de la suppression du produit:" +
          JSON.stringify(err, undefined, 2)
      );
    }
  });
});
module.exports = router;
