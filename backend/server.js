require('dotenv').config({ path: __dirname+'/../.env'});
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');

const mongoUri = process.env.URI;
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

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email is ${req.user.email}`)
});

app.listen(5000, () => {
    console.log(`listening on http://localhost:${port}`)
})