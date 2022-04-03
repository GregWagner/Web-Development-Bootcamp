const express = require('express');
const app = express();
const path = require('path');

// fake database
const redditData = require('./data.json');

// tell express where static assets are located
app.use(express.static(path.join(__dirname, 'public')));

// tell express to use ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
  res.render('home.ejs');
});

app.get('/cats', (req, res) => {
  const cats = ['Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'];
  res.render('cats.ejs', { cats });
});

app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params;
  // get fake data from fact database
  const data = redditData[subreddit];
  if (data) {
    res.render('subreddit.ejs', { ...data });
  } else {
    res.render('notfound.ejs', {subreddit});
  }
})

app.get('/rand', (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  // note the object can also be just {num} and num
  // will be available
  res.render('random.ejs', { randomNumber: num });
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
