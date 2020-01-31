const request = require('request');
const cheerio = require('cheerio');

var sideBar = [];
var lsParts = [];
var lsDetails = [];

module.exports.extractSidebar = function recebeUrl(page) {
    const url = page;

       request(url, function(err, res, body) {
            if(err){
                console.log('Erro: ' + err);
            } else {

                var $ = cheerio.load(body);
                $('.LawsuitDetails div').each(function(i, elem){
                // var lsNumber = $(this).find('div.LawsuitHeader > h1').text().trim().replace(/\D+/g, '');
                    var lsOrigin = $(this).find('div:nth-child(1) > div.LawsuitDetails-info-value').text().trim();
                    var lsTramdate = $(this).find('div:nth-child(2) > div.LawsuitDetails-info-value').text().trim();
                    var lsNature = $(this).find(' div:nth-child(3) > div.LawsuitDetails-info-value').text().trim();
                    var lsArea = $(this).find('div:nth-child(4) > div.LawsuitDetails-info-value').text().trim();
                    var lsSubject = $(this).find('div:nth-child(5) > div.LawsuitDetails-info-value').text().trim();
                    var lsJudge = $(this).find('div:nth-child(6) > div.LawsuitDetails-info-value').text().trim();
                /*     fs.appendFile('ola.txt',' \n' + timelinedate + '\n' + timelinedesc + ' \n', function (err) {
                        if (err) throw err;
                        console.log('Arquivo salvo com sucesso!');
                    });
                */
                lsDetails.push({lsOrigin,lsTramdate,lsNature, lsArea,lsSubject,lsJudge});
                 
                var lsElems = $(".LawsuitDetails div");
                for (let i=0; i < lsElems.lenght;i++){
                    var lsPolename = lsElems[i].find(".lawsuitDetails-poleName div").text().trim();
                    var lsInvolvedpart = lsElems[i].children[0].find(".lawsuitDetails-involvedPart div").text().trim();
                    var lsInvolvedpartrole = lsElems[i].children[0].find(".LawsuitDetails-involvedPart-role div").text().trim();
                    lsParts.push({lsPolename,lsInvolvedpart,lsInvolvedpartrole});
                }

            });           
                sideBar.push({lsDetails, lsParts});
                console.log(sideBar);
        }


        return sideBar;

    });
}