require('dotenv').config({ path: __dirname+'\\.env'});
require('./models/Ad')
require('./models/User')
const express = require('express');
const cors = require('cors')
const fs = require('fs');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes');
const adRoutes = require('./routes/adRoutes');
const userRoutes = require('./routes/userRoutes');
const requireAuth = require('./middlewares/requireAuth')

const mongoUri = process.env.URI;
console.log(mongoUri)
const port = 5000;

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
mongoose.Promise = global.Promise;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())

mongoose.connection.on('error', (err) => {
    console.error('Couldn\'t connect to mongo server', err)
})
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance')
})

app.use(authRoutes)
app.use(adRoutes)
app.use(userRoutes)

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email is ${req.user.email}`)
});

app.get('/sustainabilityInfo/:keyword', requireAuth, (req, res) => {
    var newKeyword = req.params.keyword.replaceAll("-", " ")
    let rawdata = fs.readFileSync('Devices.json');
    let device = JSON.parse(rawdata);
    for (const a in device){
        if (a.model === newKeyword){
            res.send(a.materials);
            break;
        }
    }
})

app.listen(5000, () => {
    console.log(`listening on http://localhost:${port}`)
})