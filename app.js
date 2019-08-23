// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const port = process.env.PORT || 4000;

//  // Import the appropriate class
// const {
//   WebhookClient,Payload
// } = require('dialogflow-fulfillment');
// app.use(morgan('dev'))
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// app.get('/', (req, res) => {
//   res.send({
//     success: true
//   });
// })
// app.use('/image', express.static('image/ICS-Logo.png'))
// app.post('/webhook',express.json(), (req, res) => {
//   console.log('POST: /');
//   console.log('Body: ',req.body);
//   console.log('headers: ',req.headers);
//       //Create an instance
//       const agent = new WebhookClient({
//         request: req,
//         response: res
//       });
//       const request = require('sync-request'),
//       user = "JIRASIT.GO",
//       password = "ICS@100";
//       const odata = request("GET", "http://vmfioriics.ics-th.com:8000/sap/opu/odata/sap/ZPROFILE_SRV/GetEmployeeListSet?$format=json", {
//         headers: {
//             "Authorization": "Basic " + new Buffer(user + ":" + password).toString('base64')
//         },
//       });
//       var sapRespond = JSON.parse(odata.getBody());

//       //connectLine
    
//       //Test get value of WebhookClient
//       console.log('agentVersion: ' + agent.agentVersion);
//       console.log('intent: ' + agent.intent);
//       console.log('locale: ' + agent.locale);
//       console.log('query: ', agent.query);
//       console.log('session: ', agent.session);
//       //Function Location
//       function BMI(agent) {
//         let weight = req.body.queryResult.parameters.weight;
//         let height = req.body.queryResult.parameters.height;
//         let BMI = weight/(height/100*height/100) ;  
//         agent.add("ํBMI:"+BMI);
//       }

//       function listEmployee(agent) {
//         for (let i = 0; i < sapRespond.d.results.length; i++) {
//               var name = sapRespond.d.results[i].Firstname;
//               var lastname = sapRespond.d.results[i].Lastname;
//               var Nickname = sapRespond.d.results[i].Nickname;

//               agent.add(name+" "+lastname+"("+Nickname+")");  
//         } 
//       }

//       function getHelp(agent){
//         const FirstMessage = {
//           "type": "flex",
//           "altText": "Flex Message",
//           "contents": {
//             "type": "bubble",
//             "direction": "ltr",
//             "header": {
//               "type": "box",
//               "layout": "vertical",
//               "contents": [
//                 {
//                   "type": "text",
//                   "text": "Help",
//                   "align": "center"
//                 }
//               ]
//             },
//             "body": {
//               "type": "box",
//               "layout": "vertical",
//               "contents": [
//                 {
//                   "type": "box",
//                   "layout": "vertical",
//                   "contents": [
//                     {
//                       "type": "text",
//                       "text": "View Employee List",
//                       "weight": "bold"
//                     },
//                     {
//                       "type": "text",
//                       "text": "[l>employees]"
//                     },
//                     {
//                       "type": "text",
//                       "text": "(e.g. l>employees)"
//                     }
//                   ]
//                 },
//                 {
//                   "type": "box",
//                   "layout": "vertical",
//                   "contents": [
//                     {
//                       "type": "spacer"
//                     },
//                     {
//                       "type": "text",
//                       "text": "View Employee by Name",
//                       "weight": "bold"
//                     },
//                     {
//                       "type": "text",
//                       "text": "[fn>'Firstname']"
//                     },
//                     {
//                       "type": "text",
//                       "text": "(e.g. fn>Sopon)"
//                     }
//                   ]
//                 },
//                 {
//                   "type": "box",
//                   "layout": "vertical",
//                   "contents": [
//                     {
//                       "type": "spacer"
//                     },
//                     {
//                       "type": "text",
//                       "text": "View Employee by Nickname",
//                       "weight": "bold"
//                     },
//                     {
//                       "type": "text",
//                       "text": "[nn>'Nickname']"
//                     },
//                     {
//                       "type": "text",
//                       "text": "(e.g. fn>Sudyod)"
//                     }
//                   ]
//                 }
//               ]
//             }
//           }
//         };
//         let payload = new Payload(`LINE`, FirstMessage, { sendAsMessage: true });

        
//         agent.add(payload); 

//       }

//       function Info(agent) {
//         var UserSay =agent.query;
//         var wording =UserSay.slice(0, 2);
//         var name = UserSay.substr(3);
//         var nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1)
//         if(wording == "fn"){
//           for (let i = 0; i < sapRespond.d.results.length; i++) {
//             if(sapRespond.d.results[i].Firstname == nameCapitalized){
//               const payloadJson = {
//                 "type": "flex",
//                 "altText": "Flex Message",
//                 "contents": {
//                   "type": "bubble",
//                   "direction": "ltr",
//                   "header": {
//                     "type": "box",
//                     "layout": "vertical",
//                     "contents": [
//                       {
//                         "type": "text",
//                         "text": "SAP",
//                         "align": "center"
//                       }
//                     ]
//                   },
//                   "hero": {
//                     "type": "image",
//                     "url": "https://ics-bot-bot.herokuapp.com/image",
//                     "size": "5xl",
//                     "aspectRatio": "1.91:1",
//                     "aspectMode": "fit"
//                   },
//                   "body": {
//                     "type": "box",
//                     "layout": "vertical",
//                     "contents": [
//                       {
//                         "type": "text",
//                         "text": sapRespond.d.results[i].Firstname+"  "+sapRespond.d.results[i].Lastname+"("+sapRespond.d.results[i].Nickname+")",
//                         "align": "center",
//                         "weight": "bold",
//                         "size": "lg"
//                       },
//                       {
//                         "type": "separator",
//                         "margin": "lg"
//                       },
//                       {
//                         "type": "box",
//                         "layout": "vertical",
//                         "contents": [
//                           {
//                             "type": "spacer"
//                           },
//                           {
//                             "type": "text",
//                             "text": "Tel:"+" "+sapRespond.d.results[i].Tel
//                           },
//                           {
//                             "type": "text",
//                             "text": "Email:"+" "+sapRespond.d.results[i].Email
//                           },
//                           {
//                             "type": "text",
//                             "text": "Birthdate:"+" "+sapRespond.d.results[i].Birthdate
//                           },
//                           {
//                             "type": "text",
//                             "text": "Position:"+" "+sapRespond.d.results[i].Position
//                           },
//                           {
//                             "type": "text",
//                             "text": "Line:"+" "+sapRespond.d.results[i].Line
//                           }
//                         ]
//                       },
//                     ]
//                   }
//                 }
//               };
//               let payload = new Payload(`LINE`, payloadJson, { sendAsMessage: true });
//               agent.add(payload);  
//             }
//           }       
//         }else if(wording == "nn"){
//           for (let i = 0; i < sapRespond.d.results.length; i++) {
//             if(sapRespond.d.results[i].Nickname == nameCapitalized){
//               const payloadJson = {
//                 "type": "flex",
//                 "altText": "Flex Message",
//                 "contents": {
//                   "type": "bubble",
//                   "direction": "ltr",
//                   "header": {
//                     "type": "box",
//                     "layout": "vertical",
//                     "contents": [
//                       {
//                         "type": "text",
//                         "text": "SAP",
//                         "align": "center"
//                       }
//                     ]
//                   },
//                   "hero": {
//                     "type": "image",
//                     "url": "https://ics-bot-bot.herokuapp.com/image",
//                     "size": "5xl",
//                     "aspectRatio": "1.91:1",
//                     "aspectMode": "fit"
//                   },
//                   "body": {
//                     "type": "box",
//                     "layout": "vertical",
//                     "contents": [
//                       {
//                         "type": "text",
//                         "text": sapRespond.d.results[i].Firstname+"  "+sapRespond.d.results[i].Lastname+"("+sapRespond.d.results[i].Nickname+")",
//                         "align": "center",
//                         "weight": "bold",
//                         "size": "lg"
//                       },
//                       {
//                         "type": "separator",
//                         "margin": "lg"
//                       },
//                       {
//                         "type": "box",
//                         "layout": "vertical",
//                         "contents": [
//                           {
//                             "type": "spacer"
//                           },
//                           {
//                             "type": "text",
//                             "text": "Tel:"+" "+sapRespond.d.results[i].Tel
//                           },
//                           {
//                             "type": "text",
//                             "text": "Email:"+" "+sapRespond.d.results[i].Email
//                           },
//                           {
//                             "type": "text",
//                             "text": "Birthdate:"+" "+sapRespond.d.results[i].Birthdate
//                           },
//                           {
//                             "type": "text",
//                             "text": "Position:"+" "+sapRespond.d.results[i].Position
//                           },
//                           {
//                             "type": "text",
//                             "text": "Line:"+" "+sapRespond.d.results[i].Line
//                           }
//                         ]
//                       },
//                     ]
//                   }
//                 }
//               };
//               let payload = new Payload(`LINE`, payloadJson, { sendAsMessage: true });
//               agent.add(payload);  
//             }
//           }  

//         }
//       }
    
//       // Run the proper function handler based on the matched Dialogflow intent name
//       let intentMap = new Map();
//       intentMap.set('BMI - custom - yes', BMI);
//       intentMap.set('Employees', listEmployee);
//       intentMap.set('EmployeeInfo', Info);
//       intentMap.set('Help', getHelp);

      
//       agent.handleRequest(intentMap);
   

// });

// app.listen(port, () => {
//   console.log(`Server is running at port: ${port}`);
// });

'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

const defaultAccessToken = 'IPe5326GX4u+1U29zileNaepH5c1CUdrEZtr208elRCM/zeTnDe99oWGYzMns1j5v8YQBU/kCCzxOtS0aSMmGZCgnPPPOr9kkmZVc7iuBH90QqCv1c/sb0zBlqbCFq5iXIKATYysELWxlxep7/9CJAdB04t89/1O/w1cDnyilFU=';
const defaultSecret = '0bd0296926896fb8863a6c8fb75721f9';

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || defaultAccessToken,
  channelSecret: process.env.CHANNEL_SECRET || defaultSecret,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
    console.log(result);
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
}); 