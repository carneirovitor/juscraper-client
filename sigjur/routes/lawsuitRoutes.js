// /routes/productRoutes.js
const mongoose = require('mongoose');
const Lawsuit = mongoose.model('lawsuits');
const LawsuitScraper = require('../lawsuits/jbscraper')
const path = require('path');

module.exports = async (app) => {
  
  app.get('/*', function(req, res) {
    res.sendFile(path.resolve(app.get('appPath') + '/client/src/index.js');
})

  app.get(`/api/lawsuit`, async (req, res) => {
    //let lawsuits = await Lawsuit.find();
    //return res.status(200).send(lawsuits);
    const lawsuit = await LawsuitScraper.callScraper(req.query.lawsuitNumber)
    return res.send(lawsuit);
  });

  app.post(`/api/lawsuits`, async (req, res) => {
    let lawsuit = await Lawsuit.create(req.body);
    return res.status(201).send({
      error: false,
      lawsuit
    })
  })


  app.put(`/api/lawsuits/:id`, async (req, res) => {
    const {id} = req.params;

    let lawsuit = await Lawsuit.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
      error: false,
      lawsuit
    })

  });

  app.delete(`/api/lawsuit/:id`, async (req, res) => {
    const {id} = req.params;

    let lawsuit = await Lawsuit.findByIdAndDelete(id);

    return res.status(202).send({
      error: false,
      lawsuit
    })

  })

}
