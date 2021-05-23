require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')

const router = express.Router()

//have a user sign up for their account
router.post('/signup', async (req, res) => {
    const { email, name, password } = req.body;
    const user = new User({ email, name, password });

    try{
        await user.save()

        const token = jwt.sign({ userID: user._id }, process.env.SECRET);

        res.send({ token })
    } catch (err){
        console.log(err)
        res.status(404).send({error: err.message})
    }

});

//have a user sign in to their account
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password){
        return res.status(422).send({error: 'must enter both email and password'})
    }

    const user = await User.findOne({ email })

    if (!user){
        return res.status(422).send({error: 'must provide correct email and password'})
    }

    try{
        await user.comparePasswords(password);
        const token = jwt.sign({ userID: user._id }, process.env.SECRET)
        res.send({ token })
    } catch (err){
        res.status(422).send({ error: 'must provide correct email and password' })
    }

})

module.exports = router;