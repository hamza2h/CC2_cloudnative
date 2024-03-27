const mongoose = require('mongoose');

const tacheSchema = new mongoose.Schema({
  titre: { type: String, unique: true },
  description: String,
  date_echeance: Date,
  priorite: Number
});

const Tache = mongoose.model('Tache', tacheSchema);

module.exports = Tache;
