const express = require('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose');
const methodOverride = require('method-override');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const Product = require('./models/product');

const categories = ['fruit', 'vegetables', 'dairy', 'bread'];

mongoose
  .connect('mongodb://127.0.0.1/farmStand', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongo Connection Open!');
  })
  .catch((err) => {
    console.log('Mongo Connection Error!!!');
    console.log(err);
  });

// display all products
app.get('/products', async (req, res) => {
  const { category } = req.query;
  console.log(category);
  // check if filtering by category
  if (category) {
    const products = await Product.find({ category });
    res.render('products/index', { products, category });
  } else {
    // display all products
    const products = await Product.find({});
    res.render('products/index', { products, category: 'All' });
  }
});

// serve up the new product form
app.get('/products/new', (req, res) => {
  res.render('products/new', { categories });
});

// create a new product
app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
});

// details for a single product
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/show', { product });
});

// update a product
app.get('/products/:id/edit', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/edit', { product, categories });
});

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});

// delete a product
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect('/products');
});

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
