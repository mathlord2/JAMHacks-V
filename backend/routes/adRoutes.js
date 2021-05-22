const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
var fs = require('fs');
const Ad = mongoose.model('Ad')

const router = express()
router.use(requireAuth)

router.get('/ads/:adType', async (req, res) => {
    try{
        const ads = Ad.find({ type: req.type_id })
        res.send(ads)
    } catch (e){
        res.send({error: e.message})
    }
})

router.post('/ads', upload.single('device_img'), async (req, res) => {
    const {title, price, city, date, description, type} = req.body;

    try{
        var img = null
        if (req.file){
            img = {file: {}}
            img.file.data = fs.readFileSync(req.file.destination + req.file.filename);
            img.file.contentType = 'image/jpeg'
        }
        const {_id} = req.user; 
        const ad = Ad({title, price, city, date, description, type, owner: _id, image: img})
        await ad.save()
        res.send(ad)
    } catch (e){
        res.send({error: e.message})
    }

})

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
        const ad = Ad.findByIdAndUpdate(req.params.adID, newbody)
        res.send(ad)
    } catch (e){
        res.send({error: e.message})
    }

})

module.exports = router