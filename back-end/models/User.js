const mongoose = require('mongoose');//mongoose qui va nous faciliter les taches d'écriture , de lecture ect...avec Mongo DB
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
email:{ type: String, required: true, unique: true},//pour ne pas avoir plusieurs inscriptions avec la m adresse mail(unique, true)
password:{ type: String, required: true}


});
userSchema.plugin(uniqueValidator);//Ce validateur on l'applique au schema comme argument 

module.exports = mongoose.model('User', userSchema);
