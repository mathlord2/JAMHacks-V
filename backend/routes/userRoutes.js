const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
var fs = require('fs');
const User = mongoose.model('User')
const Ad = mongoose.model('Ad')

const router = express()
router.use(requireAuth)

//get a single user
router.get('/users/:userID', async (req, res) => {
    try{
        const user = await User.findById(req.params.userID)
        res.send(user)
    } catch (e) {
        res.send({error: e.message})
    }
})

//get a user's ads
router.get('/users/:userID/ads', async (req, res) => {
    try{
        const ads = await Ad.find({owner: req.params.userID})
        res.send(ads)
    } catch(e){
        res.send({error: e.message})
    }
})

module.exports = router