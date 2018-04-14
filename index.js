const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3336;

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const search = require('./routes/search');

// Routes
app.use('/search', search);

// Start server
app.listen(port, () => {
  console.log('Listening on port: ', port);
});
