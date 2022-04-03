// Standalone file that is used to seed the database

const Product = require('./models/product');

const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongo Connection Open!');
  })
  .catch((err) => {
    console.log('Mongo Connection Error!!!');
    console.log(err);
  });
/* Use this to make sure the db is working */
/*
const p = new Product({
  name: 'Ruby Grapefruit',
  price: 1.99,
  category: 'fruit',
});
p.save()
  .then((p) => {
    console.log(p);
  })
  .catch((err) => {
    console.log(err);
  });
/* Use this to add a bunch of products */

const seedProducts = [
  {
    name: 'Fairy Eggplant',
    price: 1.0,
    category: 'vegetable',
  },
  {
    name: 'Chocolate Whole Milk',
    price: 2.69,
    category: 'dairy',
  },
  {
    name: 'Organic Goddess Melon',
    price: 4.99,
    category: 'fruit',
  },
  {
    name: 'Organic Mini Seedless Watermelon',
    price: 3.99,
    category: 'fruit',
  },
  {
    name: 'Organic Celery',
    price: 1.5,
    category: 'vegetable',
  },
];

Product.insertMany(seedProducts)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
