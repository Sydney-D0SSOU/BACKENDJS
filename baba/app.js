const express = require('express');
const morgan  =require('morgan')
const app = express();
const port = 3000;
const mongoose = require ('mongoose') 
const blogs = require('../models/models');

//app.use(express.urlencoded{extended :true});

const db_url= 'mongodb+srv://new123:new123@cluster0.ixgvyv9.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db_url)
.then((result)=>{
  console.log('connexion avec succes a la BDD');

})
.catch((err)=>{
  console.log(err);
})
app.use(express.urlencoded({extended :true}));

app.set('view engine','ejs') ;
app.set('views','../baba' ) ;
app.listen(port, () => {
    console.log(`SERVEUR EN ECOUTE SUR LE PORT : ${port}`)
  })
app.use(morgan ('tiny')) ; 
app.get('/', (req, res) => {
  let titre = 'HOME';
    blogs.find()
    .then((result)=>{
      
  res.render('home' ,{titre:titre,blogs:result}) ;

    })
  .catch(err=>{
    console.log(err);
  })
  
}) ;
app.post('/register',(req,res)=>{
  console.log(req.body);
  const produits = new blogs({...req.body}) 
  produits.save() 
  .then ((result) => 
  {
    res.redirect('/');
    })
  .catch(error => ({ error }));

});
app.get ('/docs',(req,res) => {
  let titre = 'DOCS';
  res.render('docs',{titre}) ;
});
app.get ('/apropos',(req,res)=>{
  let titre = 'APROPOS';
  res.render ('apropos',{titre}) ;

} );
app.get('/creer',(req,res)=>{
  res.render ('creer') ;
});

app.use (express.static('public'));
app.get ('/ajouter',(req,res)=>{
  const neuf = new blogs({
    nom :'RANGE ROVER',
    prix :4347754705,
    categorie : 'voiture'
    
  })

    neuf.save()
.then((result)=>{
  res.send(result);
})
.catch((err)=>{
  console.log(err);
})
});
app.get('/blogss',(req,res)=>{
  blogs.find()
  .then((result)=>{
    res.send(result);
  })

.catch((err)=>{
  console.log(err);
})
})
app.get('/url/:id',(req,res)=>{
  blogs.findById
})
app.use('', (req,res)=>{
  let titre = 'error';
  res.render('404',{titre});
})
