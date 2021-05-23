const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const json2csv = require("json2csv").Parser;


const devices = ['https://www.devicespecifications.com/en/model/d98c5655'					
, 'https://www.devicespecifications.com/en/model/8adc5654'					
, 'https://www.devicespecifications.com/en/model/db7e5653'					
, 'https://www.devicespecifications.com/en/model/f27e5652'					
, 'https://www.devicespecifications.com/en/model/b516547e'					
, 'https://www.devicespecifications.com/en/model/fb0c547d'					
, 'https://www.devicespecifications.com/en/model/b554547c'					
, 'https://www.devicespecifications.com/en/model/2ecb547b'					
, 'https://www.devicespecifications.com/en/model/926a538b'					
, 'https://www.devicespecifications.com/en/model/fedc538a'					
, 'https://www.devicespecifications.com/en/model/b055536e'					
, 'https://www.devicespecifications.com/en/model/39115355'					
, 'https://www.devicespecifications.com/en/model/de555354'					
, 'https://www.devicespecifications.com/en/model/637c532e'					
, 'https://www.devicespecifications.com/en/model/3a6c532d'					
, 'https://www.devicespecifications.com/en/model/3244532c'					
, 'https://www.devicespecifications.com/en/model/6108532b'					
, 'https://www.devicespecifications.com/en/model/47695219'					
, 'https://www.devicespecifications.com/en/model/60b85218'					
, 'https://www.devicespecifications.com/en/model/c3625217'					
, 'https://www.devicespecifications.com/en/model/04674ff7'					
, 'https://www.devicespecifications.com/en/model/ea5e4ff6'					
, 'https://www.devicespecifications.com/en/model/03734ff5'					
, 'https://www.devicespecifications.com/en/model/17c74ff4'					
, 'https://www.devicespecifications.com/en/model/4f734d93'					
, 'https://www.devicespecifications.com/en/model/69184d92'					
, 'https://www.devicespecifications.com/en/model/7b114d91'					
, 'https://www.devicespecifications.com/en/model/d9894d90'					
, 'https://www.devicespecifications.com/en/model/85d84ca3'					
, 'https://www.devicespecifications.com/en/model/82c04ca2'					
, 'https://www.devicespecifications.com/en/model/55814ca1'					
, 'https://www.devicespecifications.com/en/model/2f2b4978'					
, 'https://www.devicespecifications.com/en/model/ba604977'					
, 'https://www.devicespecifications.com/en/model/36ea45ae'					
, 'https://www.devicespecifications.com/en/model/0bee45ad'					
, 'https://www.devicespecifications.com/en/model/d85c45ac'					
, 'https://www.devicespecifications.com/en/model/20c943b4'					
, 'https://www.devicespecifications.com/en/model/073b43b3'					
, 'https://www.devicespecifications.com/en/model/b18443b2'					
, 'https://www.devicespecifications.com/en/model/921b43b1'					
, 'https://www.devicespecifications.com/en/model/6dcc422b'					
, 'https://www.devicespecifications.com/en/model/2ce6422a'					
, 'https://www.devicespecifications.com/en/model/35703e53'					
, 'https://www.devicespecifications.com/en/model/dc363e52'					
, 'https://www.devicespecifications.com/en/model/0bbe3ada'					
, 'https://www.devicespecifications.com/en/model/06fc3ad8'					
, 'https://www.devicespecifications.com/en/model/7a423ad7'					
, 'https://www.devicespecifications.com/en/model/a17e3679'					
, 'https://www.devicespecifications.com/en/model/13ea3678'					
, 'https://www.devicespecifications.com/en/model/e3533ad9'					
, 'https://www.devicespecifications.com/en/model/4daa3677'					
, 'https://www.devicespecifications.com/en/model/df6f3676'					
, 'https://www.devicespecifications.com/en/model/ad8a3023'					
, 'https://www.devicespecifications.com/en/model/404d3022'					
, 'https://www.devicespecifications.com/en/model/6efb2f5e'					
, 'https://www.devicespecifications.com/en/model/5d342ce2'					
, 'https://www.devicespecifications.com/en/model/ec552922'					
, 'https://www.devicespecifications.com/en/model/147c2921'					
, 'https://www.devicespecifications.com/en/model/ec4628ab'					
, 'https://www.devicespecifications.com/en/model/70af28ac'					
, 'https://www.devicespecifications.com/en/model/b6572726'					
, 'https://www.devicespecifications.com/en/model/3e302725'					
, 'https://www.devicespecifications.com/en/model/7d532724'					
, 'https://www.devicespecifications.com/en/model/35c82723'					
, 'https://www.devicespecifications.com/en/model/d15c2727'					
, 'https://www.devicespecifications.com/en/model/cea02728'					
, 'https://www.devicespecifications.com/en/model/c3842729'					
, 'https://www.devicespecifications.com/en/model/95ba272a'					
, 'https://www.devicespecifications.com/en/model/3c82272c'					
, 'https://www.devicespecifications.com/en/model/dd48272b'					
, 'https://www.devicespecifications.com/en/model/d103272d'					
, 'https://www.devicespecifications.com/en/model/0d0b272f'					
, 'https://www.devicespecifications.com/en/model/710a272e'					
, 'https://www.devicespecifications.com/en/model/44c42730'					
, 'https://www.devicespecifications.com/en/model/36ae2731'					
, 'https://www.devicespecifications.com/en/model/39d02732'					
, 'https://www.devicespecifications.com/en/model/36092733'					
, 'https://www.devicespecifications.com/en/model/48792734',];

( async () => { 
   let deviceData = [];
   
   for(let device of devices) {
       const response = await request({
           uri: device,
           headers:{       
                accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                 "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "en-US,en;q=0.9",
           },
           gzip: true,
       });
   
        let $ = cheerio.load(response)
        
        //Loads the "Materials" data into a string, which is, in turn, split into an array. This allows a comma to be inserted between consecutive materials
        //i.e. 'GlassAluminum' alloy becomes 'Glass, Aluminum alloy'. This insertion is done in the following section of code.
        var inputString = $("#main > div:nth-child(6) > table:nth-child(4) > tbody > tr:nth-child(7) > td:nth-child(2)").text().split("")
        var positions = []; //Indices of every capital letter. Since uses capital letters to distinguish between one material and the next, we can leverage the positions of the capitals for our insertion.
        for(var i=0; i<inputString.length; i++){
            if(inputString[i].match(/[A-Z]/) != null){
            positions.push(i);
            }
        }

        //The insertion step
        var numCaps = positions.length;
        if (numCaps>1) {
            for(i=1; i<numCaps; i++) {
                inputString.splice(positions[i], 0, ", "); 
            }
        }

        let materials = inputString.join(""); //Joins the array inputString
        let brand = $("#main > div:nth-child(6) > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(2)").text()
        let model = $("#main > div:nth-child(6) > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2)").text()
      
       deviceData.push( {
           materials, brand, model
       })
   
   }

   const j2cp = new json2csv()
   const csv = j2cp.parse(deviceData)

   fs.writeFileSync("./deviceData.csv", csv, "utf-8")

}
   
)();






