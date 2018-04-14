const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3336;

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log('Listening on port: ', port);
});
