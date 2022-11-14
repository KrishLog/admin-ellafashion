const router = require('express').Router();
const sql = require('../../config/db.config');
const table = 'ejsoundstudios.ELLA_BRAND';

function add(req, res) {
  const brandDetails = req.body.brand;
  const brand = {
    TITLE: brandDetails.name,
    SUMMARY: brandDetails.description,
  };
  sql.query(`INSERT INTO ${table} SET ?`, brand, function (err) {
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
  const brandDetails = req.body.brand;
  const brand = {
    TITLE: brandDetails.name,
    SUMMARY: brandDetails.description,
    ID: brandDetails.id,
  };
  sql.query(
    `UPDATE ${table} SET 
      TITLE='${brand.TITLE}',
      SUMMARY='${brand.SUMMARY}',
      WHERE ID = ?`,
    brand.ID,
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

function getBrand(req, res) {
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

function getBrandById(req, res) {
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
router.get('/', getBrand);

module.exports = router;
