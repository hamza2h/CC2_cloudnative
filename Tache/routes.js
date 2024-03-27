const express = require('express');
const router = express.Router();
const Tache = require('./module/Tache');

router.post('/tache', async (req, res) => {
    try {
      const existeTache = await Tache.findOne({ titre: req.body.titre });
      if (existeTache) {
        return res.status(400).json({ message: "Le titre doit être unique" });
      }
      const priority = parseInt(req.body.priorite);
      if (isNaN(priority)) {
        return res.status(400).json({ message: "La priorité doit être un nombre." });
      }
      const Tache = new Tache({
        titre: req.body.titre,
        description: req.body.description,
        date_echeance: req.body.date_echeance,
        priorite: priority
      });
  
      const savedTache = await Tache.save();
      res.status(201).json(savedTache);
    } catch (error) {
      res.status(500).json({ message: error.message});
    }
  });
  

router.get('/tache/:id', async (req, res) => {
  try {
    const tache = await Tache.findById(req.params.id);

    if (!tache) {
      return res.status(404).json({ message: "tache non trouve pas" });
    }

    res.status(200).json(tache);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


