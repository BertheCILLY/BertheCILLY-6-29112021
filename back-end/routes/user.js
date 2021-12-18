const express = require('express');// on a besoin d'express
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);//route POST car le front renvie l'adress mail et mot de passe 
router.post('/login', userCtrl.login);

module.exports = router;