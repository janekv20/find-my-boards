const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload')
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const app = express();
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers })

const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'controllers')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());
app.use(routes);

app.use(function(req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // // respond with json
  // if (req.accepts('json')) {
  //   res.json({ error: 'Not found' });
  //   return;
  // }

  // // default to plain-text. send()
  // res.type('txt').send('Not found');
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
