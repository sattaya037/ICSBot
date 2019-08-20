const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const port = process.env.PORT || 4000;

 // Import the appropriate class
const {
  WebhookClient,Payload
} = require('dialogflow-fulfillment');
app.use(morgan('dev'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send({
    success: true
  });
})
app.use('/image', express.static('image/ICS-Logo.png'))
app.post('/webhook',express.json(), (req, res) => {
  // console.log('POST: /');
  // console.log('Body: ',req.body);
  // console.log('headers: ',req.headers);
      //Create an instance
      const agent = new WebhookClient({
        request: req,
        response: res
      });
      const request = require('sync-request'),
      user = "JIRASIT.GO",
      password = "ICS@100";
      const odata = request("GET", "http://vmfioriics.ics-th.com:8000/sap/opu/odata/sap/ZPROFILE_SRV/GetEmployeeListSet?$format=json", {
        headers: {
            "Authorization": "Basic " + new Buffer(user + ":" + password).toString('base64')
        },
      });
      var sapRespond = JSON.parse(odata.getBody());

      
    
      //Test get value of WebhookClient
      // console.log('agentVersion: ' + agent.agentVersion);
      // console.log('intent: ' + agent.intent);
      // console.log('locale: ' + agent.locale);
      // console.log('query: ', agent.query);
      // console.log('session: ', agent.session);
    
      //Function Location
      function BMI(agent) {
        let weight = req.body.queryResult.parameters.weight;
        let height = req.body.queryResult.parameters.height;
        let BMI = weight/(height/100*height/100) ;  
        agent.add("ํBMI:"+BMI);

      }

      function SAP(agent) {
        for (let i = 0; i < sapRespond.d.results.length; i++) {
              var name = sapRespond.d.results[i].Firstname;
              var lastname = sapRespond.d.results[i].Lastname;
              const payloadJson = {
                "type": "flex",
                "altText": "Flex Message",
                "contents": {
                  "type": "bubble",
                  "direction": "ltr",
                  "header": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "button",
                        "action": {
                          "type": "message",
                          "label": name+" "+lastname,
                          "text": name+".i"

                        }
                      }
                    ]
                  }
                }
              };
              let payload = new Payload(`LINE`, payloadJson, { sendAsMessage: true });
              agent.add(payload);         
        } 
      }

      function SAPInfo(agent) {
        let fName =  req.body.queryResult.parameters.person.name;
        console.log(fName);
          for (let i = 0; i < sapRespond.d.results.length; i++) {
               if(sapRespond.d.results[i].Firstname == fName){
                const payloadJson = {
                  "type": "flex",
                  "altText": "Flex Message",
                  "contents": {
                    "type": "bubble",
                    "direction": "ltr",
                    "header": {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "text",
                          "text": "SAP",
                          "align": "center"
                        }
                      ]
                    },
                    "hero": {
                      "type": "image",
                      "url": "https://ics-bot-bot.herokuapp.com/image",
                      "size": "5xl",
                      "aspectRatio": "1.91:1",
                      "aspectMode": "fit"
                    },
                    "body": {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "text",
                          "text": sapRespond.d.results[i].Firstname+"  "+sapRespond.d.results[i].Lastname+"("+sapRespond.d.results[i].Nickname+")",
                          "align": "center",
                          "weight": "bold",
                          "size": "lg"
                        },
                        {
                          "type": "separator",
                          "margin": "lg"
                        },
                        {
                          "type": "box",
                          "layout": "vertical",
                          "contents": [
                            {
                              "type": "spacer"
                            },
                            {
                              "type": "text",
                              "text": "Tel:"+" "+sapRespond.d.results[i].Tel
                            },
                            {
                              "type": "text",
                              "text": "Email:"+" "+sapRespond.d.results[i].Email
                            },
                            {
                              "type": "text",
                              "text": "Birthdate:"+" "+sapRespond.d.results[i].Birthdate
                            },
                            {
                              "type": "text",
                              "text": "Position:"+" "+sapRespond.d.results[i].Position
                            },
                            {
                              "type": "text",
                              "text": "Line:"+" "+sapRespond.d.results[i].Line
                            }
                          ]
                        },
                      ]
                    }
                  }
                };
                let payload = new Payload(`LINE`, payloadJson, { sendAsMessage: true });

                  agent.add(payload);         
                   break; 
               }   
        } 

      }
    
      // Run the proper function handler based on the matched Dialogflow intent name
      let intentMap = new Map();
      intentMap.set('BMI - custom - yes', BMI);
      intentMap.set('SAP - employees', SAP);
      intentMap.set('SAP - info', SAPInfo);

      agent.handleRequest(intentMap);
   

});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
