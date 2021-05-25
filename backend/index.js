require('dotenv').config({ path: __dirname+'\\.env'});
require('./models/Ad')
require('./models/User')
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
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

app.post('/sustainabilityInfo', requireAuth, (req, res) => {
    
})

app.listen(5000, () => {
    console.log(`listening on http://localhost:${port}`)
})