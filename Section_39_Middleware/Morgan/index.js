const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('tiny'));

// really bad auth
const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === 'chicken') {
    next();
  }
  res.send('Invalid password');
};

app.use((req, res, next) => {
  console.log('This is some middleware');
  next();
  console.log('Done with the middlewares');
});

app.use((req, res, next) => {
  console.log('This is some more middleware');
  next();
});

// example of changing and adding to the req
app.use((req, res, next) => {
  console.log('Modifying the request...');
  req.method = 'GET';
  req.requestTime = Date.now();
  next();
});

app.use('/dogs', (req, res, next) => {
  console.log('Middleware for specific route');
  next();
});

app.get('/', (req, res) => {
  console.log('Got here');
  console.log(`Request Date: ${req.requestTime}`);
  res.send('Home Page!');
});

app.get('/dogs', (req, res) => {
  res.send('WOOF WOOF');
});

app.get('/secret', verifyPassword, (req, res, next) => {
  res.send('My secret is: Sometimes I wear headphones...');
});

// setting up a 404 route
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

app.listen(3000, () => {
  console.log('App is running on local host port 3000');
});
