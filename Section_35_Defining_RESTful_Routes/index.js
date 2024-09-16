const express = require('express');
const app = express();
const path = require('path');

const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

// decode post data in body
app.use(
  express.urlencoded({
    extended: true,
  })
);
// decode json post data in body
app.use(express.json());
// use method override to allow use of PATCH and DELETE
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// fake database
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
  // remove all matching commet ids
  comments = comments.filter((c) => c.id !== id);
  // go display all comments
  res.redirect('/comments');
});

// Update a specific comment
app.patch('/comments/:id', (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  comment.comment = req.body.comment;
  // go display all comments
  res.redirect('/comments');
});

// create a new comment (CREATE)
app.post('/comments', (req, res) => {
  const { username, comment } = req.body;
  // update the database
  comments.push({ username, comment, id: uuid() });
  // go display all comments
  res.redirect('/comments');
});

// create a new comment form (CREATE)
app.get('/comments/new', (req, res) => {
  res.render('comments/new');
});

// list all comments (READ)
app.get('/comments', (req, res) => {
  res.render('comments/index', {
    comments,
  });
});

// get a specific comment (using id)
app.get('/comments/:id', (req, res) => {
  const { id } = req.params;
  //console.log(`Looking for id ${id}`);
  const comment = comments.find((c) => c.id === id);
  if (comment) {
    res.render('comments/show', { comment });
  }
});

app.get('/comments/new', (req, res) => {
  res.render('comments/new');
});

// Serve a form to modify a comment using method override
app.get('/comments/:id/edit', (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render('comments/edit', { comment });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
