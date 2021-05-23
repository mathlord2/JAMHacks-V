const request = require('request-promise');
const cheerio = require('cheerio');

const devices = [   'https://www.devicespecifications.com/en/model/d98c5655'   ,
'https://www.devicespecifications.com/en/model/d98c5655'   ,
'https://www.devicespecifications.com/en/model/8adc5654'   ,
'https://www.devicespecifications.com/en/model/8adc5654'   ,
'https://www.devicespecifications.com/en/model/db7e5653'   ,
'https://www.devicespecifications.com/en/model/db7e5653'   ,
'https://www.devicespecifications.com/en/model/f27e5652'   ,
'https://www.devicespecifications.com/en/model/f27e5652'   ,
'https://www.devicespecifications.com/en/model/b516547e'   ,
'https://www.devicespecifications.com/en/model/b516547e'   ,
'https://www.devicespecifications.com/en/model/fb0c547d'   ,
'https://www.devicespecifications.com/en/model/fb0c547d'   ,
'https://www.devicespecifications.com/en/model/b554547c'   ,
'https://www.devicespecifications.com/en/model/b554547c'   ,
'https://www.devicespecifications.com/en/model/2ecb547b'   ,
'https://www.devicespecifications.com/en/model/2ecb547b'   ,
'https://www.devicespecifications.com/en/model/926a538b'   ,
'https://www.devicespecifications.com/en/model/926a538b'   ,
'https://www.devicespecifications.com/en/model/fedc538a'   ,
'https://www.devicespecifications.com/en/model/fedc538a'   ,
'https://www.devicespecifications.com/en/model/b055536e'   ,
'https://www.devicespecifications.com/en/model/b055536e'   ,
'https://www.devicespecifications.com/en/model/39115355'   ,
'https://www.devicespecifications.com/en/model/39115355'   ,
'https://www.devicespecifications.com/en/model/de555354'   ,
'https://www.devicespecifications.com/en/model/de555354'   ,
'https://www.devicespecifications.com/en/model/637c532e'   ,
'https://www.devicespecifications.com/en/model/637c532e'   ,
'https://www.devicespecifications.com/en/model/3a6c532d'   ,
'https://www.devicespecifications.com/en/model/3a6c532d'   ,
'https://www.devicespecifications.com/en/model/3244532c'   ,
'https://www.devicespecifications.com/en/model/3244532c'   ,
'https://www.devicespecifications.com/en/model/6108532b'   ,
'https://www.devicespecifications.com/en/model/6108532b'   ,
'https://www.devicespecifications.com/en/model/47695219'   ,
'https://www.devicespecifications.com/en/model/47695219'   ,
'https://www.devicespecifications.com/en/model/60b85218'   ,
'https://www.devicespecifications.com/en/model/60b85218'   ,
'https://www.devicespecifications.com/en/model/c3625217'   ,
'https://www.devicespecifications.com/en/model/c3625217'   ,
'https://www.devicespecifications.com/en/model/04674ff7'   ,
'https://www.devicespecifications.com/en/model/04674ff7'   ,
'https://www.devicespecifications.com/en/model/ea5e4ff6'   ,
'https://www.devicespecifications.com/en/model/ea5e4ff6'   ,
'https://www.devicespecifications.com/en/model/03734ff5'   ,
'https://www.devicespecifications.com/en/model/03734ff5'   ,
'https://www.devicespecifications.com/en/model/17c74ff4'   ,
'https://www.devicespecifications.com/en/model/17c74ff4'   ,
'https://www.devicespecifications.com/en/model/4f734d93'   ,
'https://www.devicespecifications.com/en/model/4f734d93'   ,
'https://www.devicespecifications.com/en/model/69184d92'   ,
'https://www.devicespecifications.com/en/model/69184d92'   ,
'https://www.devicespecifications.com/en/model/7b114d91'   ,
'https://www.devicespecifications.com/en/model/7b114d91'   ,
'https://www.devicespecifications.com/en/model/d9894d90'   ,
'https://www.devicespecifications.com/en/model/d9894d90'   ,
'https://www.devicespecifications.com/en/model/85d84ca3'   ,
'https://www.devicespecifications.com/en/model/85d84ca3'   ,
'https://www.devicespecifications.com/en/model/82c04ca2'   ,
'https://www.devicespecifications.com/en/model/82c04ca2'   ,
'https://www.devicespecifications.com/en/model/55814ca1'   ,
'https://www.devicespecifications.com/en/model/55814ca1'   ,
'https://www.devicespecifications.com/en/model/2f2b4978'   ,
'https://www.devicespecifications.com/en/model/2f2b4978'   ,
'https://www.devicespecifications.com/en/model/ba604977'   ,
'https://www.devicespecifications.com/en/model/ba604977'   ,
'https://www.devicespecifications.com/en/model/36ea45ae'   ,
'https://www.devicespecifications.com/en/model/36ea45ae'   ,
'https://www.devicespecifications.com/en/model/0bee45ad'   ,
'https://www.devicespecifications.com/en/model/0bee45ad'   ,
'https://www.devicespecifications.com/en/model/d85c45ac'   ,
'https://www.devicespecifications.com/en/model/d85c45ac'   ,
'https://www.devicespecifications.com/en/model/20c943b4'   ,
'https://www.devicespecifications.com/en/model/20c943b4'   ,
'https://www.devicespecifications.com/en/model/073b43b3'   ,
'https://www.devicespecifications.com/en/model/073b43b3'   ,
'https://www.devicespecifications.com/en/model/b18443b2'   ,
'https://www.devicespecifications.com/en/model/b18443b2'   ,
'https://www.devicespecifications.com/en/model/921b43b1'   ,
'https://www.devicespecifications.com/en/model/921b43b1'   ,
'https://www.devicespecifications.com/en/model/6dcc422b'   ,
'https://www.devicespecifications.com/en/model/6dcc422b'   ,
'https://www.devicespecifications.com/en/model/2ce6422a'   ,
'https://www.devicespecifications.com/en/model/2ce6422a'   ,
'https://www.devicespecifications.com/en/model/35703e53'   ,
'https://www.devicespecifications.com/en/model/35703e53'   ,
'https://www.devicespecifications.com/en/model/dc363e52'   ,

];
async function main() {
    for(let device of devices) {
        const result = await request.get(device);
    const $ = cheerio.load(result);
    $("#main > div:nth-child(6) > table:nth-child(4) > tbody > tr:nth-child(7) > td:nth-child(2)").each((index, element) => {
        console.log($(element).text());
        });
        
    $("#main > div:nth-child(6) > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(2)").each((index, element) => {
        console.log($(element).text());
        });
            
    $("#main > div:nth-child(6) > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2)").each((index, element) => {
        console.log($(element).text());
        });
    }
    
    
   }
    
   main();