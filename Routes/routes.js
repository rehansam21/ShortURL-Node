const express = require('express')
const router = express.Router()
const ShortURL = require('../models/ShortURL')

router.get('/', async (req,res) => {
    const shortUrls = await ShortURL.find()
    res.render('index', {shortUrls : shortUrls});
})


// router.get('/',  (req,res) => {
//     // const shortUrls = await ShortURL.find()
//     res.render('index');
// })

router.post('/shortUrls', async (req, res) => {
    console.log("I am here",req.body.fullUrl)
    await ShortURL.create({ full: req.body.fullUrl }, async (err,doc)=>{
        if(doc) {
            res.redirect('/')
        }
        else{
            console.log(err)
        }
    })
  
    // res.redirect('/')

})

//{ short: req.params.shortUrl }
router.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortURL.findOne({ short: req.params.shortUrl })
//   console.log('PARAM ',req.params['shortUrl']);
  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.full)
})


module.exports = router