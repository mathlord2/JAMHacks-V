require('dotenv').config()
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = mongoose.model('User');


module.exports = (req, res, next) => {

    const { authorization } = req.headers;

    console.log(req.headers)
    
    if (!authorization){
        return res.status(401).send('You must be logged in.')
    }

    const token = authorization.replace('Bearer ', '');

    jwt.verify(token, process.env.SECRET, async (err, payload) => {
        if (err){
            res.status(401).send({error: 'You must be logged in.'})
        }

        const { userID } = payload;

        const user = await User.findById(userID);

        req.user = user;

        next();
    })
}