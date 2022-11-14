const router = require('express').Router();
const sql = require('../../config/db.config');
const table = 'ejsoundstudios.ELLA_SIZE';

function add(req, res) {
  const sizeDetails = req.body.size;
  const size = {
    TITLE: sizeDetails.name,
    SUMMARY: sizeDetails.description,
  };
  sql.query(`INSERT INTO ${table} SET ?`, size, function (err) {
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
  const sizeDetails = req.body.size;
  const size = {
    TITLE: sizeDetails.name,
    SUMMARY: sizeDetails.description,
    ID: sizeDetails.id,
  };
  sql.query(
    `UPDATE ${table} SET 
      TITLE='${size.TITLE}',
      SUMMARY='${size.SUMMARY}',
      WHERE ID = ?`,
    size.ID,
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

function getSize(req, res) {
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

function getSizeById(req, res) {
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
router.get('/', getSize);

module.exports = router;
