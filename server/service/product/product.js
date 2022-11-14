const router = require('express').Router();
const sql = require('../../config/db.config');
const table = 'ejsoundstudios.ELLA_PRODUCT';

function add(req, res) {
  const productDetails = req.body.product;
  const product = {
    TITLE: productDetails.name,
    SUMMARY: productDetails.description,
  };
  sql.query(`INSERT INTO ${table} SET ?`, product, function (err) {
    if (err) {
      res.json({ error: 'Something went worng, try again.' });
    } else {
      res.json({
        success: 'Successfully Created!',
      });
    }
  });
}

function edit(req, res) {
  const productDetails = req.body.product;
  const product = {
    TITLE: productDetails.name,
    SUMMARY: productDetails.description,
    ID: productDetails.id,
  };
  sql.query(
    `UPDATE ${table} SET 
      TITLE='${product.TITLE}',
      SUMMARY='${product.SUMMARY}',
      WHERE ID = ?`,
    product.ID,
    function (err) {
      if (err) {
        res.json({ error: 'Something went worng, try again.' });
      } else {
        res.json({
          success: 'Successfully Updated!',
        });
      }
    }
  );
}

function getProduct(req, res) {
  sql.query(`SELECT ID, TITLE, SUMMARY FROM ${table}`, function (err, rows) {
    if (err) throw err;
    if (rows.length > 0) {
      res.json({
        data: rows,
      });
    } else {
      res.json({ success: 'No results found!' });
    }
  });
}

function getProductById(req, res) {
  const id = req.params.id;
  if (id && id > 0) {
    sql.query(`SELECT  ID, TITLE, SUMMARY  FROM ${table} WHERE ID =?`, id, function (err, rows) {
      if (err) throw err;
      if (rows.length > 0) {
        res.json({
          data: rows,
        });
      } else {
        res.json({ success: 'No results found!' });
      }
    });
  } else {
    res.json({ success: 'No results found!' });
  }
}
router.get('/', getProduct);

module.exports = router;
