const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/";
  
var urlencodedParser = bodyParser.urlencoded({ extended: false })
    
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
    
app.post('/createdatabase', urlencodedParser, (req, res) => {
    MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    let dbo = db.db(req.body.create_database_name);

      dbo.createCollection(req.body.create_collection_name, (err, res) => {
          if (err) throw err;
          console.log("Colección creada");
          db.close();
      });
    });
});

app.post('/createcollection', urlencodedParser, (req, res) => {
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db('Prueba');

        dbo.createCollection(req.body.collection_name, (err, res) => {
            if (err) throw err;
            console.log("Colección creada");
            db.close();
        });
    });
});

app.post('/addclient', urlencodedParser, (req, res) => {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      let dbo = db.db('Empresa');
      const myobj = {
        nombre: req.body.client_name,
        direccion: req.body.client_direction
      }

      dbo.collection('Clientes').insertOne(myobj, (err, res) => {
          if (err) throw err;
          console.log("Documento insertado");
          db.close();
      });
    });
});
    
app.listen(3000);