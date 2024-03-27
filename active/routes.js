require('dotenv').config();
const express = require('express');
const router = express.Router();



const Activite = require('../active/module/Activite');
const Tache = require('../Tache/module/Tache');
const Utilisateur = require('../Auth-service/module/Utilisateur');

router.post('/activite', async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.body.utilisateur_id);
    if (!utilisateur) {
      return res.status(404).json({ message: "n'existe pas" });
    }

    const tache = await Tache.findById(req.body.tache_id);
    if (!tache) {
      return res.status(404).json({ message: "n'existe pas" });
    }

    const activite = new Activite(req.body);
    await activite.save();

    res.status(201).json(activite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
