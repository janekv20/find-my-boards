const router = require('express').Router();

router.get('/profile/:id', (req, res) => {
    res.render('profile')
})

module.exports = router;