const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const { WebhookClient } = require('dialogflow-fulfillment')
app.get('/', express.json(),  (req, res) => res.send('online'))

app.post('/webhook', (req, res) => {
  //Create an instance
  const agent = new WebhookClient({ request: req, response: res })
  //Function Location
  function BMI(agent) {
    let weight = request.body.queryResult.parameters.weight;
    let height = request.body.queryResult.parameters.height / 100;
    let bmi = (weight / (height * height)).toFixed(2);
    agent.add(bmi);

  }
  let intentMap = new Map();
  intentMap.set('BMI - custom - yes', BMI);
  agent.handleRequest(intentMap);
});

app.listen(port)
