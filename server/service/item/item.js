const router = require('express').Router();
const sql = require('../../config/db.config');
const table = 'ejsoundstudios.ELLA_ITEM';

function add(req, res) {
  const itemDetails = req.body.item;

  const item = {
    PRODUCTID: itemDetails.productId,
    BRANDID: itemDetails.brandId,
    SIZEID: itemDetails.sizeId,
    SKU: itemDetails.sku,
    MRP: parseFloat(itemDetails.mrp),
    DISCOUNT: parseFloat(itemDetails.discount),
    MAXDISCOUNT: parseFloat(itemDetails.maxDiscount),
    PRICE: parseFloat(itemDetails.price),
    QUANTITY: parseInt(itemDetails.quantity),
    SOLD: parseInt(itemDetails.sold),
    AVAILABLE: parseInt(itemDetails.available),
    DEFECTIVE: parseInt(itemDetails.defective),
    CREATEDBY: itemDetails.createdBy,
  };

  sql.query(`INSERT INTO ${table} SET ?`, item, function (err) {
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
  const itemDetails = req.body.category;
  const item = {
    PRODUCTID: itemDetails.productId,
    BRANDID: itemDetails.brandId,
    SIZEID: itemDetails.sizeId,
    SKU: itemDetails.sku,
    MRP: itemDetails.mrp,
    DISCOUNT: itemDetails.discount,
    MAXDISCOUNT: itemDetails.maxDiscount,
    PRICE: itemDetails.price,
    QUANTITY: itemDetails.quantity,
    SOLD: itemDetails.sold,
    AVAILABLE: itemDetails.available,
    DEFECTIVE: itemDetails.defective,
    UPDATEDBY: itemDetails.updatedBy,
    ID: itemDetails.id,
  };
  sql.query(
    `UPDATE ${table} SET 
    PRODUCTID='${category.PRODUCTID}',
    BRANDID='${category.BRANDID}',
    SIZEID='${category.SIZEID}',
    SKU='${category.SKU}',
    MRP='${category.MRP}',
    DISCOUNT='${category.DISCOUNT}',
    MAXDISCOUNT='${category.MAXDISCOUNT}',
    PRICE='${category.PRICE}',
    QUANTITY='${category.QUANTITY}',
    SOLD='${category.SOLD}',
    AVAILABLE='${category.AVAILABLE}',
    DEFECTIVE='${category.DEFECTIVE}',
    UPDATEDBY='${category.UPDATEDBY}',
    WHERE ID = ?`,
    item.ID,
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

function getItem(req, res) {
  sql.query(
    `SELECT i.ID, p.TITLE as PRODUCT, b.TITLE  as BRAND, s.TITLE as SIZE, i.SKU, i.MRP, i.DISCOUNT, i.MAXDISCOUNT, i.PRICE, i.QUANTITY, i.SOLD, i.AVAILABLE, i.DEFECTIVE, u.USERNAME as CREATEDBY, u.USERNAME  as UPDATEBY, i.CREATEDDATE, i.UPDATEDDATE
    FROM  ${table} as i
    LEFT JOIN ejsoundstudios.ELLA_PRODUCT as p  ON i.PRODUCTID  =p.ID 
    LEFT JOIN ejsoundstudios.ELLA_BRAND as b  ON i.BRANDID =b.ID 
    LEFT JOIN ejsoundstudios.ELLA_SIZE   as s  ON i.BRANDID =s.ID
    LEFT JOIN ejsoundstudios.ELLA_USER   as u  ON i.CREATEDBY = u.ID ;
  `,
    function (err, rows) {
      if (err) throw err;
      if (rows.length > 0) {
        res.json({
          data: rows,
        });
      } else {
        res.json({ success: 'No results found!' });
      }
    }
  );
}

function getItemById(req, res) {
  const id = req.params.id;
  if (id && id > 0) {
    sql.query(
      `SELECT i.ID, p.TITLE as PRODUCT, b.TITLE  as BRAND, s.TITLE as SIZE, i.SKU, i.MRP, i.DISCOUNT, i.MAXDISCOUNT, i.PRICE, i.QUANTITY, i.SOLD, i.AVAILABLE, i.DEFECTIVE, i.CREATEDBY, i.UPDATEBY, i.CREATEDDATE, i.UPDATEDDATE
    FROM  ${table} as i
    LEFT JOIN ejsoundstudios.ELLA_PRODUCT as p  ON i.PRODUCTID  =p.ID LEFT JOIN ejsoundstudios.ELLA_BRAND as b  ON i.BRANDID =b.ID LEFT JOIN ejsoundstudios.ELLA_SIZE   as s  ON i.BRANDID =s.ID WHERE i.ID =?`,
      id,
      function (err, rows) {
        if (err) throw err;
        if (rows.length > 0) {
          res.json({
            data: rows,
          });
        } else {
          res.json({ success: 'No results found!' });
        }
      }
    );
  } else {
    res.json({ success: 'No results found!' });
  }
}
router.get('/', getItem);
router.post('/add', add);

module.exports = router;
