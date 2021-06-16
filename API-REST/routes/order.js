const dbconfig = require('../dbconfig');
const dbUsersConfig = dbconfig.dbUsers;
const dbElbarrio = dbconfig.dbElbarrio;
const express = require('express');
const router = express.Router();
const sql = require('mssql');


//registrar ordenes
router.post('/insertOrder', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let order =  await poolEB.request()
            .query(`INSERT INTO "ORDER" (id_customer, date, state)
            VALUES (${req.body.id_customer},(SELECT CONVERT(VARCHAR(10), GETDATE(), 23)),${0})`);

        let order_line =  await poolEB.request()
            .query(`INSERT INTO "ORDER_LINE" (id_order, id_item, quantity, unit_price, total)
            VALUES ((SELECT TOP(1) id_order FROM "ORDER" Order By id_order DESC),${req.body.id_item},
            ${req.body.quantity},${req.body.unit_price},${req.body.total})`);
        
        let shop_cart =  await poolEB.request()
            .query(`DELETE FROM SHOP_CART
            WHERE id_shopCart = ${req.body.id_shopCart}`);
        
        res.json({
            code : 1,
            msg : 'Su compra fue realizada correctamente.',
            data : {}
        });
        
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo procesar la compra.',
            data : error
        });
    }
})



module.exports = router