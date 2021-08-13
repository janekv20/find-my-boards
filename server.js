const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload')
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());
app.use(require('./controllers/'));

// create a route to upload a photo
app.post('', (req, res) => {

  let profilePic; 	// we will call a variable with the same name of the input we used on line 19 of this document					
  let uploadPath;

  // If no files were uploaded send message to user saying so						
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.')
  }

  // if user uploads a file						
  // get file object and get move function from object						
  profilePic = req.files.profilePic;
  console.log(profilePic)
  // create an upload path that we will pass into the move funciton or mv()	
  uploadPath = __dirname + '/upload/' + profilePic.name;

  // use mv() to place file on the server. Will move it to the directory we created on line 39 of this doc which moves it to the upload folder						
  profilePic.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    

    // if file gets uploaded send back to profile page					
    res.redirect('/profile');
  });
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
