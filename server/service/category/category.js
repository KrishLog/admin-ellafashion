const router = require('express').Router();
const sql = require('../../config/db.config');
const table = 'ejsoundstudios.ELLA_CATEGORY';

function add(req, res) {
  const categoryDetails = req.body.category;
  const category = {
    TITLE: categoryDetails.name,
    SUMMARY: categoryDetails.description,
  };
  sql.query(`INSERT INTO ${table} SET ?`, category, function (err) {
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
  const categoryDetails = req.body.category;
  const category = {
    TITLE: categoryDetails.name,
    SUMMARY: categoryDetails.description,
    ID: categoryDetails.id,
  };
  sql.query(
    `UPDATE ${table} SET 
      TITLE='${category.TITLE}',
      SUMMARY='${category.SUMMARY}',
      WHERE ID = ?`,
    category.ID,
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

function getCategory(req, res) {
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

function getCategoryById(req, res) {
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
router.get('/', getCategory);

module.exports = router;
