const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = process.env.PORT || 4000;

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

const request = require('sync-request'),
user = "JIRASIT.GO",
password = "ICS@100";
const odata = request("GET", "http://vmfioriics.ics-th.com:8000/sap/opu/odata/sap/ZPROFILE_SRV/GetEmployeeListSet?$format=json", {
  headers: {
      "Authorization": "Basic " + new Buffer(user + ":" + password).toString('base64')
  },
});
const sapRespond = JSON.parse(odata.getBody());


app.post('/webhook',express.json(), (req, res) => {
  // console.log('POST: /');
  // console.log('Body: ',req.body);
  // console.log('headers: ',req.headers);
      //Create an instance
      const agent = new WebhookClient({
        request: req,
        response: res
      });
      
    
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
        var sapRespond = this.sapRespond;
        for (let i = 0; i < sapRespond.d.results.length; i++) {
              var name = sapRespond.d.results[i].Firstname;
              var lastname = sapRespond.d.results[i].Lastname;
              agent.add(name+" "+lastname);         
        } 
      }
      function SAPInfo(agent) {
        let fName =  req.body.queryResult.parameters.person.name;
        console.log(fName);
        agent.add("Name:"+fName);         

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
