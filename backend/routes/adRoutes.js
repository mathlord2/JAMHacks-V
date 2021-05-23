const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
var fs = require('fs');
const Ad = mongoose.model('Ad')
const User = mongoose.model('User')

const router = express()
router.use(requireAuth)

//get ads by type (ie phone, computer, etc)
router.get('/ads/:adType', async (req, res) => {
    try{
        const ads = await Ad.find({ type: req.params.adType, hidden: false })
        res.send(ads)
    } catch (e){
        res.send({error: e.message})
    }
})

//look at the additional info for a specific ad
router.get('/ads/specific/:adID', async (req, res) => {
    try{
        const ad = await Ad.find({ _id: req.params.adID })
        res.send(ad)
    } catch (e){
        res.send({error: e.message})
    }
})

//look at the users who want to get the device
router.get('/ads/:adID/buyers', async (req, res) => {
    try{
        console.log(req.params.adID)
        const ad = await Ad.findById(req.params.adID)
       
        res.send(ad.users)
    } catch (e){
        res.send({error: e.message})
    }
})

//look at all of your personal ads
router.get('/ads/', async (req, res) => {
    try{
        const personal_ads = await Ad.find({owner: req.user._id})
        console.log(personal_ads)
        res.send(personal_ads)
    } catch (e){
        res.send({error: e.message})
    }
})

//choose a user, hide the ad after the user is chosen
router.patch('/ads/:adID/buyers/:buyerID', async (req, res) => {
    try{
        const newbuyer = await User.findById(req.params.buyerID)
        const ad = await Ad.findByIdAndUpdate(req.params.adID, {finalBuyer: {name: newbuyer.name, id: newbuyer._id}, hidden: true})
        res.send(ad)
    } catch (e){
        console.log({error: e.message})
    }
})

//buyer gives a message to a seller expressing interest in device
router.patch('/ads/:adID/buyers', async (req, res) => {
    try{
        const {message} = req.body;
        const {_id, name} = req.user;
        const ad = await Ad.findByIdAndUpdate(req.params.adID, {$push: {users: {name: name, message: message, id: _id}}})
        res.send(ad)
    } catch (e) {
        res.send({error: e.message})
    }
})

//post an ad
router.post('/ads', upload.single('device_img'), async (req, res) => {
    const {name, price, location, date, description, category} = req.body;
    var title = name;
    var city = location;
    var type = category;
    try{
        var img = null
        if (req.file){
            img = {file: {}}
            img.file.data = fs.readFileSync(req.file.destination + req.file.filename);
            img.file.contentType = 'image/jpeg'
        }
        const {_id, name} = req.user; 
        const ad = Ad({title, price, city, date, description, type, owner: _id, image: img})
        await ad.save()
        res.send(ad)
    } catch (e){
        res.send({error: e.message})
    }

})


//edit the post about the ad
router.put('/ads/:adID', upload.single('device_img'), async (req, res) => {
    try{
        var img = null
        if (req.file){
            img = {file: {}}
            img.file.data = fs.readFileSync(req.file.destination + req.file.filename);
            img.file.contentType = 'image/jpeg'
        }
        var newbody = {...req.body, owner: req.user._id}
        if (img){
            newbody = {...newbody, image: img}
        }
        const ad = await Ad.findByIdAndUpdate(req.params.adID, newbody)
        res.send(ad)
    } catch (e){
        res.send({error: e.message})
    }

})

module.exports = router