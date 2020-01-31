// /routes/productRoutes.js
const mongoose = require('mongoose');
const LawsuitScraper = require('../lawsuits/jbscraper')
const path = require('path');

module.exports = async (app) => {
  
  app.get(`/api/lawsuit`, async (req, res) => {
    //let lawsuits = await Lawsuit.find();
    //return res.status(200).send(lawsuits);
    const lawsuit = await LawsuitScraper.callScraper(req.query.lawsuitNumber)
    return res.send(lawsuit);
  });

}
