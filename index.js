const express = require('express');
const logger = require('morgan');

const app = express();
const uid = require('uuid');

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(logger('dev'));

let products = [];

app.get('/products', function (req, res) {
  res.send(products);
});

app.post('/product', function (req, res) {
  const productDetails = req.body;
  const id = uid.v4();
  products.push({
    id,
    name: productDetails.name,
    price: productDetails.price,
  });
  res.send('product added succesfully');
});

app.get('/product/:id', function (req, res) {
  const productId = req.params.id;
  const productDetails = products.find((product) => product.id == productId);

  res.send(productDetails);
});

app.put('/product/:id', (req, res) => {
  const updateProductDetails = req.body;
  const productId = req.params.id;

  for (let i = 0; i < products.length; i++) {
    if (products[i].id == productId) {
      products[i].name = updateProductDetails.name;
      products[i].price = updateProductDetails.price;
    }
  }
  res.send('product updated successfully');
});
app.delete('/product/:id', (req, res) => {
  const productId = req.params.id;
  products = products.filter((product) => product.id != productId);
  res.send('product deleted');
});

app.listen(3001, function () {
  console.log('server is up');
});
