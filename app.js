const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = process.env.PORT || 4000;
import { OData } from "c4codata"

// odata.org sample odata service
const TestServiceURL = "https://services.odata.org/V2/Northwind/Northwind.svc/$metadata"
const odata = new OData(TestServiceURL)
// Import the appropriate class
const {
  WebhookClient
} = require('dialogflow-fulfillment');
app.use(morgan('dev'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send({
    success: true
  });
})

app.post('/webhook',express.json(), (req, res) => {
  console.log('POST: /');
  console.log('Body: ',req.body);
  console.log('headers: ',req.headers);
      //Create an instance
      const agent = new WebhookClient({
        request: req,
        response: res
      });
      
    
      //Test get value of WebhookClient
      console.log('agentVersion: ' + agent.agentVersion);
      console.log('intent: ' + agent.intent);
      console.log('locale: ' + agent.locale);
      console.log('query: ', agent.query);
      console.log('session: ', agent.session);
    
      //Function Location
      function welcome(agent) {
        agent.add("Welcome to my agent!");
      }
     
      function fallback(agent) {
        agent.add("I didn't understand");
        agent.add("I'm sorry, can you try again?");
      }
      
      function BMI(agent) {
        // let weight = agent.parameters.weight;
        let weight = req.body.queryResult.parameters.weight;
        let height = req.body.queryResult.parameters.height;
        let BMI = weight/(height/100*height/100) ;

        // const weight = agent.parameters['weight'];
  
        agent.add("ํBMI:"+BMI);

      }

      function SAP(agent) {
        const filter = OData.newFilter().field("Phone").eqString("030-0074321");
      
        const result = await odata.newRequest({ // ODataRequest object
          collection: "Customers", // collection name
          params: OData.newParam().filter(filter) // odata param
        })
        console.log(result);
        // let weight = agent.parameters.weight;
      //   const request = require('sync-request'),
      //   user = "JIRASIT.GO",
      //   password = "ICS@100";
      //   const odata = request("GET", "http://vmfioriics.ics-th.com:8000/sap/opu/odata/sap/ZPROFILE_SRV/GetEmployeeListSet('00000001')?$format=json", {
      //     headers: {
      //         "Authorization": "Basic " + new Buffer(user + ":" + password).toString('base64')
      //     },
      // });
      //   var sapRespond = JSON.parse(odata.getBody());
      //   console.log('sap:'+sapRespond);
        agent.add("SAP");

      }
    
      // Run the proper function handler based on the matched Dialogflow intent name
      let intentMap = new Map();
      intentMap.set('Default Welcome Intent', welcome);
      intentMap.set('Default Fallback Intent', fallback);
      intentMap.set('BMI - custom - yes', BMI);
      intentMap.set('SAP', SAP);

      agent.handleRequest(intentMap);
   

});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
