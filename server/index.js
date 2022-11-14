const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/welcome', (req, res) => {
  res.json({ message: 'Hello from Ella Fashion!' });
});

app.use('/user', require('./guard/auth-guard'), require('./service/user/user'));

app.use('/auth', require('./service/auth/auth'));
app.use('/product', require('./guard/auth-guard'), require('./service/product/product'));
app.use('/brand', require('./guard/auth-guard'), require('./service/brand/brand'));
app.use('/size', require('./guard/auth-guard'), require('./service/size/size'));
app.use('/item', require('./guard/auth-guard'), require('./service/item/item'));

app.listen(3030, function () {
  console.log('Ella fashion API');
});
