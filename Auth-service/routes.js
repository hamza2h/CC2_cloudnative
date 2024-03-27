const express = require('express');
const router = express.Router();
const Utilisateur = require('./module/Utilisateur');
const jwt = require('jsonwebtoken');


router.post('/Ajouter', async (req, res) => {
  try {
    const existingLogin = await Utilisateur.findOne({ login: req.body.login });
    if (existingLogin) {
      return res.status(400).json({ message: "Le login existe déjà" });
    }

    const existingEmail = await Utilisateur.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(400).json({ message: "L'email existe déjà" });
    }

    const utilisateur = new Utilisateur(req.body);
    await utilisateur.save();
    res.status(201).json(utilisateur);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.post('/login', async (req, res) => {
    try {
      const utilisateur = await Utilisateur.findOne({
        login: req.body.login,
        mdp: req.body.mdp
      });
  
      if (!utilisateur) {
        return res.status(401).json({ message: 'incorrect' });
      }
  
      const token = jwt.sign({ userId: utilisateur._id }, process.env.SECRET_KEY);
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  
  router.get('/utilisateurs/:id', async (req, res) => {
    try {
      const utilisateur = await Utilisateur.findById(req.params.id);
  
      if (!utilisateur) {
        return res.status(404).json({ message: "non trouve pas" });
      }
  
      res.status(200).json(utilisateur);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;
  