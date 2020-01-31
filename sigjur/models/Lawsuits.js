const mongoose = require('mongoose');
const {Schema} = mongoose;

const lawsuitSchema = new Schema({
    lsHeader: [
        {
            lsNumber: String,
            lsResume: String,
        }
    ],

    lsActivity: [
        { 
            body: String,
            date: Date 
        }
    ],
    lsDetails: [
        {
            lsOrigin: String,
            lsTramdate: String, 
            lsNature: String,
            lsArea: String,
            lsSsubject: String,
            lsJudge:String,
        },
        {
            lsPolename: String,
            lsInvolvedpart: String,
            lsInvolvedpartrole: String,
        }
    ],
})

mongoose.model('lawsuits', lawsuitSchema);