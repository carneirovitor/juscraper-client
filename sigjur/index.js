const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//IMPORT_MODELS
require('./models/Lawsuits');

const app = express();
app.use(bodyParser.json());

//IMPORT ROUTES
require('./routes/lawsuitRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  console.log(path.join(__dirname, 'client/build'))
  app.use(express.static(path.join(__dirname, 'client/build')));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
    console.log(path.join(__dirname+'/client/build/index.html'));
  });

}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});
