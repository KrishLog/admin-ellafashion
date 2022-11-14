const config = require('../../config/app.config');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const sql = require('../../config/db.config');
const table = 'ejsoundstudios.ELLA_USER';

function login(req, res) {
  const { userName, password } = req.body;
  if (userName && password) {
    sql.query(`SELECT ID, ROLE, FIRSTNAME, LASTNAME, USERNAME, MOBILE, EMAIL  FROM ${table} WHERE USERNAME =? AND PASSWORDHASH=?`, [userName, password], function (err, rows) {
      if (err) throw err;
      if (rows.length > 0) {
        const accessToken = jwt.sign({ userName: rows[0].USERNAME, id: rows[0].id, role: rows[0].ROLE }, config.JWT_SECRET, {
          expiresIn: '24h',
        });

        res.json({
          accessToken,
          user: rows[0],
        });
      } else {
        res.json({ error: 'Username or password incorrect' });
      }
    });
  } else {
    res.json({ error: 'Username or password required' });
  }
}

router.post('/login', login);

module.exports = router;
