const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" } // Vous pouvez ajouter d'autres rôles si besoin
});

module.exports = mongoose.model("User", UserSchema);
