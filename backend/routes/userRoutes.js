const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
var fs = require('fs');
const User = mongoose.model('User')

const router = express()
router.use(requireAuth)

router.get('/users/:userID', async (req, res) => {
    try{
        const user = User.findById(req.params.userID)
        res.send(user)
    } catch (e) {
        res.send({error: e.message})
    }
})