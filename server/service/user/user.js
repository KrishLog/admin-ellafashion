const router = require('express').Router();
const sql = require('../../config/db.config');
const table = 'ejsoundstudios.ELLA_USER';

function register(req, res) {
  const userDetails = req.body.user;
  const user = {
    FIRSTNAME: userDetails.firstName,
    LASTNAME: userDetails.lastName,
    PASSWORD: userDetails.password,
    USERNAME: userDetails.userName,
    MOBILE: userDetails.mobile,
    EMAIL: userDetails.email,
    ROLE: userDetails.role,
  };
  sql.query(`INSERT INTO ${table} SET ?`, user, function (err) {
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
  const userDetails = req.body.user;
  const user = {
    FIRSTNAME: userDetails.firstName,
    LASTNAME: userDetails.lastName,
    USERNAME: userDetails.userName,
    MOBILE: userDetails.mobile,
    EMAIL: userDetails.email,
    ROLE: userDetails.role,
    ID: userDetails.id,
  };
  sql.query(
    `UPDATE ${table} SET 
    FIRSTNAME='${user.FIRSTNAME}',
    LASTNAME='${user.LASTNAME}',  
    USERNAME='${user.USERNAME}',
    MOBILE='${user.MOBILE}',
    EMAIL='${user.EMAIL}',
    ROLE='${user.ROLE}',
    WHERE ID = ?`,
    user.ID,
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

function reset(req, res) {
  const userDetails = req.body.user;
  const user = {
    PASSWORD: userDetails.password,
    ID: userDetails.id,
  };
  sql.query(`UPDATE ${table} SET PASSWORD='${user.PASSWORD}' WHERE ID = ?`, user.ID, function (err) {
    if (err) {
      console.log(err);
      res.json({ error: 'Something went worng, try again.' });
    } else {
      res.json({
        success: 'Successfully Rest!',
      });
    }
  });
}

function getUser(req, res) {
  sql.query(`SELECT ID, FIRSTNAME, LASTNAME, USERNAME, MOBILE, EMAIL, ROLE FROM ${table}`, function (err, rows) {
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

function getUserById(req, res) {
  const id = req.params.id;
  if (id && id > 0) {
    sql.query(`SELECT ID,FIRSTNAME, LASTNAME, USERNAME, MOBILE, EMAIL, ROLE FROM ${table} WHERE ID =?`, id, function (err, rows) {
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
router.get('/', getUser);

module.exports = router;
