const express = require('express');
const app = express();

// matches every request
// appp.use((req, res) => {
//   console.log('We just got a request');
//   res.send('<h1>Hello, we got your request</h1>');
// })

app.get('/', (req, res) => {
  res.send('Home page');
})

app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params;
  res.send(`This is the ${subreddit} subreddit`);
})

app.get('/r/:subreddit/:postid', (req, res) => {
  const { subreddit, postid } = req.params;
  res.send(`<h1>Viewing post ${postid} in the ${subreddit} subreddit</h1>`);
})

app.get('/search', (req, res) => {
  const { q } = req.query;
  if (q) {
    res.send(`<h1>Search results for ${q}</h1>`);
  }
  res.send('Nothing found for nothing searched for');
})

app.get('/cats', (req, res) => {
  res.send('MEOW');
})

app.get('/dogs', (req, res) => {
  res.send('WOOF');
})

// Must be last get
app.get('*', (req, res) => {
  res.send("I don't know that path");
})

app.post('/cats', (req, res) => {
  res.send('Post request received');
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
})
