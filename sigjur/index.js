const express = require('express');
const bodyParser = require('body-parser');

//IMPORT_MODELS
require('./models/Lawsuits');

const app = express();

app.use(bodyParser.json());
app.use(express.static('client/src'));

//IMPORT ROUTES
require('./routes/lawsuitRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    

  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'src', 'index.html'))
  })

}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});
