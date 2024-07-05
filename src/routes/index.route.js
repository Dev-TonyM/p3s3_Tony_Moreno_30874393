const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
    res.render('index.view.ejs')
})

module.exports = router