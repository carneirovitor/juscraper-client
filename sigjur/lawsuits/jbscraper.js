    //Vitor Carneiro
    //Scrapper jusbrasil
   const puppeteer = require('puppeteer');

    var url;

    function extractHeader(){
      var headerData = []; //create a empty array that will store our data
      var elements = document.querySelectorAll('#app-root > div > div > div > div.LawsuitRoot-main.col-xs-12.col-md-8 > div > div.WithMetricsDispatcher > div');
      for (var element of elements){
        var lsnumber = element.children[0].innerText; // Select the number of lawsuit.
        var lsresume = element.children[2].innerText; // Select the resume of lawsuit(by Jusbrasil).
        headerData.push({lsnumber,lsresume});
      }
      return headerData;
    }

    function extractSidebar(){
      var sbDetails = []; //create a empty array that will store our data
      var sbElems =[];
      var sideBarData = [];
      var elements = document.querySelectorAll('#app-root > div > div > div > div.LawsuitRoot-aside.col-md-4 > div > div > div');
      for (var element of elements){
        var lsOrigin = element.children[1].children[0].children[1].innerText; // Select the number of lawsuit.
        var lsTramdate = element.children[1].children[1].children[1].innerText; // Select the number of lawsuit.
        var lsNature = element.children[1].children[2].children[1].innerText; // Select the number of lawsuit.
        var lsArea = element.children[1].children[3].children[1].innerText; // Select the number of lawsuit.
        var lsSubject = element.children[1].children[4].children[1].innerText; // Select the number of lawsuit.
        var lsJudge = element.children[1].children[5].children[1].innerText; // Select the number of lawsuit.
        sbDetails.push({lsOrigin,lsTramdate, lsNature, lsArea, lsSubject, lsJudge});
      }

      for(var parts of elements){
        var lsPolename = parts.children[2].innerText; // Select the number of lawsuit.
        //var lsInvolvedpart = parts.children[2].children[2].children[0].children[1].innerText.split('/\n'); // Select the number of lawsuit.
        sbElems.push({lsPolename});
      }
      sideBarData.push({sbDetails,sbElems});
      return sbElems;
    }

    function extractTimeline () {
      var tlData = []; // Create an empty array that will store our data
      var elements = document.querySelectorAll('div.LawsuitTimeline-group'); // Select all Products

      for (var element of elements){ // Loop through each product
        var lsdate = element.children[0].children[1].innerText; // Select the title
        var _lsact = element.children[1].innerText; // Select the title
        //var lsact = _lsact.split('\n').map(x=>x.trim()).toString();

        var str = _lsact;
        var lsact = [];
        var lines = str.split("\n");
        for (var i = 0; i < lines.length; i++) {
          lsact.push(lines[i]);
        }

        tlData.push({lsdate,lsact}); // Push an object with the data onto our array
      }
  
      return tlData; // Return our data array
  }
  
   
    async function scrapeLawsuitTimeline(
        page, //receive the page loaded previously
        extractTimeline, //receive extractTimeline function
        scrollDelay = 100, //set the delay of scrolling
      ) {
        var lsTimeline = [];
        var lsHeader = [];
        var lsDetails = [];
        var itemTargetCount=100;
        try {
          let previousHeight=1;
          while (itemTargetCount == null || lsTimeline.length < itemTargetCount) {
            lsTimeline = await page.evaluate(extractTimeline); ///wait the extraction of data
            previousHeight = await page.evaluate('document.body.scrollHeight'); //update the height of scroll
            await page.evaluate('window.scrollTo(0, document.body.scrollHeight)'); //set the target to scroll
            await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`, {timeout:5000}); //waiting the height of actual scroll become higher of the previous
            await page.waitFor(scrollDelay); //wait for delay of scroll - for page update reason
          }
        } catch(e) {console.log(e)}

        try{
          lsHeader = await page.evaluate(extractHeader);
        }catch(e){console.log(e + "Erro no ExtractHeader")};
        
        try{
          console.log(page.url());
          url = page.url();
          lsDetails = await page.evaluate(extractSidebar);
        }catch(e){console.log(e + "Erro no extractSidebar");}


        var lawsuit = [{lsHeader,lsTimeline,lsDetails}];
        console.log(lawsuit);
        return lawsuit;
      }

  
      function lawsuit(num){ //return the lawsuit number that was inputed by user
        return num;
      }

      //(async () => {
   module.exports.callScraper = async (lsnum) =>{
      try{   
      //set up the automated browser and page
        const browser = await puppeteer.launch({
          headless: false,
          args: ['--no-sandbox', '--disable-setuid-sandbox'], 
        });
         //const lsnum=lawsuit(process.argv[2]); ///receive the init parameter
        const page = await browser.newPage(); //
        page.setViewport({ width: 1280, height: 926 });
        
          await page.goto('https://www.jusbrasil.com.br/consulta-processual/'); //
          await page.waitFor('input[class="form-control form-control--lg"]');
          await page.setDefaultNavigationTimeout(0); 
      
          // await page.type('input[class="form-control form-control--lg', 'lsnumber');
      
          await page.focus('input[class="form-control form-control--lg"]')
          await page.keyboard.type(lsnum);
          await page.waitFor('input[value="'+lsnum+'"]');
          await page.keyboard.press('Enter');
          await page.waitForSelector('div.LawsuitTimeline-group');
          try{await page.click('button.LawsuitDetails-showAllItems');}catch(e){console.log(e);}
          
         var items = await scrapeLawsuitTimeline(page, extractTimeline);
         //axios.post(`api/lawsuits/?format=json&${items}`);

          // Close the automated browser.*//
          await browser.close();
        }catch (e) {}
        
        return items;
      }