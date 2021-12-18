const multer = require('multer');// multer pour accepter les fichiers entrants(gerer les fichiers, les enregistrer et quelle nom leur donner )

const MIME_TYPES = {//dictionnaire
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({// enregistrer sur le disque
  destination: (req, file, callback) => {// besoin de deux éléments la destination et filename
    callback(null, 'images');// si il n'y a pas eu d'erreur
  },
  filename: (req, file, callback) => {// qui explique qu'elle nom aura le fichier
    const name = file.originalname.split(' ').join('_');// éliminer les espaces, creer un tableau 
    const extension = MIME_TYPES[file.mimetype];//pour générer les extensions du fichier
    callback(null, name + Date.now() + '.' + extension);// appeler le callback avec un timestamp 
  }
});

module.exports = multer({storage: storage}).single('image');// fichier unique