const express = require("express");
const multer = require("multer");
const Music = require("../models/Music");
const auth = require("../middleware/auth");

const router = express.Router();

// Configuration de Multer pour stocker les fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// Route d'upload de musique (protégée)
router.post("/upload", auth, upload.single("musicFile"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "Aucun fichier fourni" });
  try {
    const newMusic = new Music({
      title: req.body.title,
      description: req.body.description,
      filePath: req.file.path
      // Par défaut, "approved" est false
    });
    await newMusic.save();
    res.status(201).json({ message: "Musique uploadée pour approbation", music: newMusic });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
