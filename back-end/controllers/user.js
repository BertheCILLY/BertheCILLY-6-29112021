const bcrypt = require('bcrypt');//installation bcrypt //npm install --save bcript
const jsonwebtoken= require('jsonwebtoken');//npm install --save jsonwebtoken
const User = require('../models/User');

//on va hasher le mot de passe et avec hash crer par bcrypt on va enregistrer le user de la base de donnée, fonction asynchrone qui prend du temps 
exports.signup = (req, res, next) => {

bcrypt.hash(req.body.password, 10)//dix tour

.then(hash => {
  

    const user = new User({//nouvel utilisateur
      email: req.body.email,//adress fourni dans le corps de la requète
      password: hash//mot de passe cripté
    });
    user.save()//enregistrment dans base de données
      .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))//201 pour une création de ressouce
      .catch(error => res.status(400).json({ error }));//400 pour le différencier
  })
  .catch(error => res.status(500).json({ error }));//erreur cerver qu'on envoie dans un objet
};


//permet aux utilisateurs existants de se connecter
exports.login = (req, res, next) => {
  
    User.findOne({ email: req.body.email })//findOne pour trouver un seul utilisateur pour qui l'adress mail correspond
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)//si utilisateur trouvé on compare
          .then(valid => {//booléane si compraraison bon ou pas 
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });//si utilisateur non trouvé
            }
            res.status(200).json({//connection validé, on renvoie token(chaine de caractère aléatoire)et user ID
                userId: user._id,
                token: jsonwebtoken.sign(//fonction 'sign'de jsonwebtoken qui comprends les données qu'on veux ancoder
                  { userId: user._id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h' }//configuration, expiration de 24h, plus valable après
                )
            });
          })
          .catch(error => res.status(500).json({ error }));//si problème MongoDB
      })
      .catch(error => res.status(500).json({ error }));
  };
