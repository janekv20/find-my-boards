const router = require('express').Router();
const { User } = require('../models');

router.get('/', (req, res) => {
    res.render('profile', {
      title: 'Profile',
    })
})

// create a route to download a photo to the upload folder
router.post('', (req, res) => {

    const id = req.headers.referer.toString().split('/')[req.headers.referer.toString().split('/').length - 1]
   
    // we will call a variable with the same name of the input field on the form in profile handlebars file
    let profilePic;
    let uploadPath;
  
    // If no files were uploaded send message to user saying so						
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.')
    }
  
    // if user uploads a file						
    // get file object and get move function from object						
    profilePic = req.files.profilePic;
  
    // create an upload path that we will pass into the move funciton or mv()	
    uploadPath = __dirname + '/profile-pics/' + profilePic.name;
    // use mv() to place file on the server. Will move it to the directory we created on line 39 of this doc which moves it to the upload folder						
    profilePic.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);
      
      //updates the user's image key to the value of the name of the file
      User.update(
          {image: profilePic.name},
          {where: {
              id: id
          }}
      )
      res.redirect('back');
    });
  });

module.exports = router;