const express =  require('express');
const request =  require('request');
const cronJob = require('cron');
const path = require('path');
const app = express();

app.set("views",path.join(__dirname,"views"));

const indexPage = (req,res) => {
  res.render("index");
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const enableCronJob = async () => {
  try {    
    await timeout(3000); 
    let i = 0;   
    const job = new cronJob.CronJob({
      cronTime: '* * * * * *',

      onTick: async () => {
        if (request && i < 1) {
          request.get(`https://jsonplaceholder.typicode.com/todos/1`, async (error, response, body) => {
            
            console.log(`First API called`);
            if (!error && response.statusCode === 200) {
              request.get(`https://jsonplaceholder.typicode.com/todos/2`, async (error, response, body) => {
                if(!error) {
                  console.log('Second API Called');                
                } else {
                  throw new Error('Error while calling API')
                }
              });
            }
            else {
              throw new Error('Error while calling API');
            }
          });
          i += 1;
        }
      },
      start: false,
      timeZone: 'America/Los_Angeles',
    });
    (job.start());
  } catch (error) {
    console.log('TCL: cronJOBD -> error', error);
  }
};


module.exports = {enableCronJob,indexPage}