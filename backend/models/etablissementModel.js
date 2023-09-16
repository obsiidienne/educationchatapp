const mongoose = require("mongoose");

const etablissementSchema = new mongoose.Schema({
  nometab: {
    type: String,
    required:true,
  },
  typetab: {
    type: String,
    required:true,
  },
  
}, 
);

const Etablissement = mongoose.model("Etablissement", etablissementSchema);

module.exports = Etablissement;
