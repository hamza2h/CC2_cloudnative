const mongoose = require('mongoose');

const UtilisateurSchema = new mongoose.Schema({
  nom: String,
  email: { type: String, unique: true },
  login: { type: String, unique: true },
  mdp: String
});

const Utilisateur = mongoose.model('Utilisateur', UtilisateurSchema);

module.exports = Utilisateur;