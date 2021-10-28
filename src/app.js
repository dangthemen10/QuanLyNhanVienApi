'use-strict';

const express = require('express');
const route =  require('./routes/web');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//Routes
route(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('Server is running at the port : ' + port);
})