const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3028;

// config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// routing
const operator = require('./routes/operator');
const typepart = require('./routes/typepart');
app.use('/operator', operator);
app.use('/typepart', typepart);

// run server
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});
