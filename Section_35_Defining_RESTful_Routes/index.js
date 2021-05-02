const express = require('express');
const app = express();
const path = require('path');

const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
  {
    username: 'Todd',
    comment: 'Here is my comment',
    id: uuid(),
  },
  {
    username: 'Skyler',
    comment: 'I like to go birdwatching with my dog',
    id: uuid(),
  },
  {
    username: 'Sk8erBoi',
    comment: 'Plz delete your account, Todd',
    id: uuid(),
  },
  {
    username: 'onlysayswoff',
    comment: 'woof woof woof',
    id: uuid(),
  },
];

// Delete a specific comment
app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect('/comments');
});

// Update a specific comment
app.patch('/comments/:id', (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  comment.comment = req.body.comment;
  res.redirect('/comments');
});

// create a new comment
app.post('/comments', (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  // go display all comments
  res.redirect('/comments');
});

// create a comment form
app.get('/comments/new', (req, res) => {
  res.render('comments/new');
});

// read comments
app.get('/comments', (req, res) => {
  res.render('comments/index', {
    comments,
  });
});

// get a specific comment
app.get('/comments/:id', (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render('comments/show', { comment });
});

app.get('/comments/new', (req, res) => {
  res.render('comments/new');
});

// Serve a form to modify a comment
app.get('/comments/:id/edit', (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render('comments/edit', { comment });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
