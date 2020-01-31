const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//IMPORT_MODELS
require('./models/Lawsuits');

const app = express();
app.use(express.static(__dirname + '/client/src/lawsuit-search'));
app.use(bodyParser.json());

//IMPORT ROUTES
require('./routes/lawsuitRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/client/src/lawsuit-search'));


  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'src','lawsuit-search', 'LawsuitSearch.js'))
  })

}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});
