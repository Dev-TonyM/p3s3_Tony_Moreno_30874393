const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/dashboard', function(req, res) {
    res.render('dashboard.view.ejs', { title: 'dashboard' });
});
module.exports = router