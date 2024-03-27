const mongoose = require('mongoose');

const ActiviteSchema = new mongoose.Schema({
  utilisateur_id: Number,
  tache_id: Number
});

const Activite = mongoose.model('Activite', ActiviteSchema);

module.exports = Activite;
