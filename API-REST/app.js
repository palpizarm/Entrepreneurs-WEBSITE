// imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/',router);

// Middleware
app.use((req,res, next) => {
    next();
})

/* import routes*/
const loginRoute  = require('./routes/login');

const signupRoute  = require('./routes/signup');

// set routes
app.use('/login', loginRoute);
app.use('/signup', signupRoute);



app.listen(3000);
console.log('Server is running in port: 3000');
