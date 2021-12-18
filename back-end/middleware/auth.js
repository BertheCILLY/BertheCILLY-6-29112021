const jsonwebtoken = require('jsonwebtoken');// besoin de notre package Json.token permet de vérifier la validité d'un token 

module.exports = (req, res, next) => {
  try {//il y a plusieurs éléments qui peuvent poser problème
    const token = req.headers.authorization.split(' ')[1];//on va utiliser le headers autorisation qu'on va split autour de l'espace on récupère le deuxième élément de ce tableau
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');// décoder le token avec la clé secret(il nous donne un objet JS)
    const userId = decodedToken.userId;//récupérer le userId dans cet objet JS

    req.auth = { userId:userId }; //rajouter le userId a l'objet requète
    if (req.body.userId && req.body.userId !== userId) {// s'il y a un userId on veux vérifier quil est bien celle du token si c'est différent
      throw 'Utilisateur non valide';//throw pour renvoyer à catch 
    } else {
      next();
    }
  } catch {
    res.status(401).json({// pour un problème d'authentification
      error: new Error('requête non identifiée!')
    });
  }
};