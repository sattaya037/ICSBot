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

app.post('/webhook',express.json(), (req, res) => {
  console.log('POST: /');
  console.log('Body: ',req.body);
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
      let weight = agent.parameters.weight;

      // const weight = agent.parameters['weight'];
      console.log(weight);
  
      // let height = request.body.queryResult.parameters.height / 100;
      // let bmi = (weight / (height * height)).toFixed(2);
      agent.add(weight);
  
    }
  
    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('BMI - custom - yes', BMI);
    agent.handleRequest(intentMap);
 
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});