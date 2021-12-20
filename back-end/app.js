

const express = require('express'); // on aura express avec une commande require

const mongoose = require('mongoose');// j'importe mongoose dans mon fichier 
//const bodyParser = require('body-parser');
//accés chemin images
const path = require('path');

// Importation des  routes
//const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

// Mise en place securité

const app = express(); //en appellant cette méthode express cela permets de créer une application express

//il intercepte tous les requetes qui ont un json et mets a disposition dans rec.body
app.use(express.json());


//logique de connexion a mongodb
mongoose
.connect('mongodb+srv://BertheCILLY:linuxmoi@cluster0.7wcn4.mongodb.net/Projet6?retryWrites=true&w=majority',
 //mongoose.connect('mongodb://localhost:27017/test',
  { useNewUrlParser: true,
    useUnifiedTopology: true })


  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  


// Headers CORS
//midelWear général pas de route il sera appliquer à toutes les requ^étes (tout le monde c'est *) 
app.use((req, res, next) => {//on rajoute de headers sur les responses on dit que l'origine c tous, et les methodes (get,post ect...)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});




//il intercepte tous les requetes qui ont un json et mets a disposition dans rec.body
//app.use(bodyParser.json());

// Gestion des images

/*app.use("/images", express.static(path.join(__dirname, "images")));

// Lancement helmet
app.use(helmet());
app.use(helmet.frameguard({ action: 'deny' })); //Pour interdire d'inclure cette page dans une iframe

app.use('/api/sauces' , sauceRoutes);//pour cette route la on utilise le router qui est exposé par saucesRoutes*/
app.use('/api/auth', userRoutes);

module.exports = app;