const router = require('express').Router();

// When the user navigates to the home page they are sent to the index.js file which routes them to this file
// Then this file renders the homepage.handlebars template
router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;