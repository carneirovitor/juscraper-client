/* var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jbscraper');

var lawsuitSchema = new mongoose.Schema({
    lsnumber: String,
    lsresume: String
}, { collection: 'lawsuits' }
);

router.get('/lawsuits', function (req, res, next) {
    var db = require('../lawsuits/db');
    var Lawsuit = db.Mongoose.model('lawsuits', db.LawsuitSchema, 'lawsuits');
    Lawsuit.find({}).lean().exec(function(e,docs){
       res.json(docs);
       res.end();
    });
});

module.exports = { Mongoose: mongoose, LawsuitSchema: lawsuitSchema } */

const express = require('express');
const bodyParser = require('body-parser');

//IMPORT_MODELS
require('./models/Lawsuits');

const app = express();

app.use(bodyParser.json());

//IMPORT ROUTES
require('./routes/lawsuitRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/src'));

  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'src', 'index.html'))
  })

}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});
