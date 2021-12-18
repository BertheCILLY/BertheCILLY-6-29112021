
const sauce = require('../models/Sauce');
const fs = require ('fs');//importation de file system
//Pour crer une route: CRUD (Creat, Read, Update, Delete)

//POST:CreateSauce

exports.createSauce = (req, res, next) => {

  //extraire l'objet json de sauce
    const sauceObject = JSON.parse(req.body.sauce);

    delete sauceObject._id;//Avant on va enlever le champ id du coprs de le requète avant de copier l'objet
    const sauce = new sauce({

      ...sauceObject,//on utilise l'opérateur Spred et on passe req , il va aller copier title body etc..
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //genérer l'url de l'image
    });
    sauce.save()// appeller sa méthode save qui enregistre et retourne un promis
      .then(() => res.status(201).json({ message: 'sauce enregistré !'}))// code pour une bonne création de ressouce
      .catch(error => res.status(400).json({ error }));// recupérer un code 400 
    }
   // PUT: ModifySauce

//route put pour une modification de l'objet


  exports.modifysauce = (req, res, next) => {
    const sauceObject = req.file ?
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
 
      sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })//méthode pour modiffier et mettre à jour
        .then(() => res.status(200).json({ message: 'sauce modifié !'}))//retourner une promiss
        .catch(error => res.status(400).json({ error })
        );
    
      };
    

    //DELETE: DeleteSauce
    exports.deletesauce = (req, res, next) => {//avant de supprimer l'objet de la base on va aller le chercher
      sauce.findOne({ _id: req.params.id })//pour le trouver,celui qui a l'id avec ces pâramètres
        .then(sauce => {
          const filename = sauce.imageUrl.split('/images/')[1];//récupérer image url 
          fs.unlink(`images/${filename}`, () => {// on veux le nom du fichier précisément
            sauce.deleteOne({ _id: req.params.id })//on extrait le nom du fichier, puis on supprime avec fs.unlink 
              .then(() => res.status(200).json({ message: 'sauce supprimé !'}))
              .catch(error => res.status(400).json({ error }));
          });
        })
        .catch(error => res.status(500).json({ error }));//500 erreur cerveur
    };
    //GET: GetOneSauce

exports.getOneSauce = (req, res, next) => {// méthode get pour répondre aux demandes GET à cet endpoint
      sauce.findOne({ _id: req.params.id })//on utilise ':' pour rendre la route plus accessible en tant que paramètre
        .then(sauce => res.status(200).json(sauce))//thing retourné 
        .catch(error => res.status(404).json({ error }));
    };


    //GET: GetAllSauce (afficher toutes les sauces)

exports.getAllSauce = (req, res, next) => {
 
    sauce.find()
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) =>
      res.status(400).json({ message: " Objet non enregistré !" })
    );
};


exports.likeSauces = (req, res) => {
  /* Si le client Like cette sauce */
  if (req.body.like === 1) {
    sauce.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } }
    )
      .then(() => res.status(200).json({ message: "Like ajouté !" }))
      .catch((error) => res.status(400).json({ error }));
    /* Si le client disike cette sauce */
  } else if (req.body.like === -1) {
    sauce.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } }
    )
      .then(() => res.status(200).json({ message: "Dislike ajouté !" }))
      .catch((error) => res.status(400).json({ error }));
    /* Si le client annule son choix */
  } else {
    sauce.findOne({ _id: req.params.id }).then((resultat) => {
      if (resultat.usersLiked.includes(req.body.userId)) {
       sauce.findOneAndUpdate(
          { _id: req.params.id },
          { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
        )
          .then(() => res.status(200).json({ message: "like retiré !" }))
          .catch((error) => res.status(400).json({ error }));
      } else if (resultat.usersDisliked.includes(req.body.userId)) {
        Product.findOneAndUpdate(
          { _id: req.params.id },
          { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } }
        )
          .then(() => res.status(200).json({ message: "dislike retiré !" }))
          .catch((error) => res.status(400).json({ error }));
      }
    });
  }
};
