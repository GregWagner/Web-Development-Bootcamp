const mongoose = require('mongoose');
mongoose
  .connect('mongodb://127.0.0.1/movieApp')
  .then(() => {
    console.log('CONNECTION OPEN!!!');
  })
  .catch((err) => {
    console.log('OH NO ERROR!!!!');
    console.log(err);
  });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 10
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be positive']
  },
  onSale: {
    type: Boolean,
    default: false
  },
  categories: {
    type: [String],
    default: ['Cycling']
  },
  qty: {
    online: {
      type: Number,
      default: 0
    },
    inStore: {
      type: Number,
      default: 0
    }
  },
  size: {
    type: String,
    enum: ['S', 'M', 'L']
  }
});

const Product = mongoose.model('Product', productSchema);

const bike = new Product({ name: "Mountain", price: 399, categories: ['Cycling', 'Adult'] });
bike.save()
  .then(data => {
    console.log("Added new bike");
    console.log(data);
  })
  .catch(err => {
    connsole.log("Error adding bike");
    console.log(err);
  });

productSchema.methods.greet = function () {
  console.log(`Hello - from ${this.name}`);
}

productSchema.methods.toggleOnSale = function () {
  this.onSale = !this.onSale;
  return this.save();
}

const findProduct = async () => {
  const foundProduct = await Product.findOne({ name: 'Mountain' })
  console.log(foundProduct);
  await foundProduct.toggleOnSale();
  console.log(foundProduct);
}

// static method
productSchema.statics.fireSale = function () {
  return this.updateMany({}, { onSale: true, price: 0 });
}

Product.fireSale().then(res => console.log(res));