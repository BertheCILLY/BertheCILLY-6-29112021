const express = require ('express');
const router = express.Router();//méthode de router d'express

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

/********************ROUTE***************************** */

// route  GET, POST ,PUT, update, delete....Création, lecture, modification et suppression
router.post('/', auth, multer ,sauceCtrl.createSauce);// quand on créer un nouvel objet on aura un fichier image grace à l'élément multer rajouté après l'authentification 'auth'

    //route pour la modification
router.put('/:id', auth,  multer ,sauceCtrl.modifysauce);// on applique la fonction a la route 

//route DELETE pour la suppression 
router.delete('/:id',auth,sauceCtrl.deletesauce);


router.get('/:id',auth, sauceCtrl.getOneSauce);// findOne() dans notre modèle "Thing"pour trouver le thing ayant le m _id que le paramètre de la requète.


//on ajoute un première argument un premier argument qui sera l'url visé par lAplication , dans ce midelWare  on cré deux objets dans un tableau appelé sauces

router.get('/', auth,sauceCtrl.getAllSauce);

module.exports = router;