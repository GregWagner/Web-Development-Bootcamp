const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

mongoose.connect('mongodb://127.0.0.1/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// express middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
  secret: 'thisshouldbeabettersecret',
  resave: false,
  saveUninitialize: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// set up locals middleware
app.use((req, res, next) => {
  if (!['/login', '/register', '/'].includes(req.originalUrl)) {
    console.log(req.originalUrl);
    req.session.returnTo = req.originalUrl;
    console.log('Setting return to: ', req.session.returnTo);
  }
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.get('/fakeUser', async (req, res) => {
  const user = new User({
    email: 'gregggg@gmail.com',
    username: 'greggg',
  });
  const newUser = await User.register(user, 'chicken');
  res.send(newUser);
});

app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);

app.get('/', (req, res) => {
  res.render('home');
});

// test code to make a new campground and add it to database
// app.get('/makecampground', async (req, res) => {
//   console.log('Makeing a new campground');
//   const camp = new Campground({
//     title: 'My Backyard',
//     description: 'Cheap camping',
//     db,
//   });
//   await camp.save();
//   res.send(camp);
// });

// 404 handler (must be last)
app.all('*', (req, res, next) => {
  //res.status(404).send('NOT FOUND');
  next(new ExpressError('Page Not Found'), 404);
});

// Error handler middlewware routine
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) {
    err.message = 'Oh no, Something went wrong';
  }
  res.status(statusCode).render('error', { err });
});

// 404 handler (must be last)
// app.use((req, res) => {
//   res.status(404).send('NOT FOUND');
// });

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
