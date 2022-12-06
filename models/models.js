const mongoose = require ('mongoose');
const Schema = mongoose.Schema ;
const blogSchema = new Schema ({
    nom :{
        type :String ,
        required:true 
    },
   prix :{ 
    type : Number ,
    required : true 
 },
 categorie:{
    type :String ,
    required :true
 }
},{timestamps :true});
const blogs = mongoose.model('blog',blogSchema);
module.exports = blogs ;