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

//Historial de compras de un usuario

router.post('/getBuyHistory', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let products =  await poolEB.request()
            .query(`SELECT o.id_order, o.date, o.state, ol.id_order_line, ol.id_item, ol.quantity, ol.unit_price,
            ol.total, i.id_shop, i.name AS itemName, i.image AS itemImage, s.name AS shopName
            FROM CUSTOMERS c inner join "ORDER" o ON c.id_customer = o.id_customer 
            inner join "ORDER_LINE" ol ON o.id_order = ol.id_order
            inner join ITEM i ON ol.id_item = i.id_item
            inner join SHOP s ON i.id_shop = s.id_shop 
            WHERE c.id_customer = ${req.body.id_customer}`);
        
        res.json({
            code : 1,
             msg : '',
            data : products.recordsets[0]
        });
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo mostrar el historial de compra.',
            data : error
        });
    }
})

//Historial de venta

router.post('/getSentHistory', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let products =  await poolEB.request()
            .query(`SELECT u.id_user, u.name AS userName, u.email, u.phone, o.id_order, o.date, o.state, ol.id_order_line, ol.id_item, ol.quantity, ol.unit_price,
            ol.total, i.id_shop, i.name AS itemName, i.image AS itemImage
            FROM USERS u inner join CUSTOMERS c ON u.id_user = c.id_customer inner join "ORDER" o ON c.id_customer = o.id_customer 
            inner join "ORDER_LINE" ol ON o.id_order = ol.id_order
            inner join ITEM i ON ol.id_item = i.id_item
            inner join SHOP s ON i.id_shop = s.id_shop 
            WHERE i.id_shop = ${req.body.id_shop}`);
        
        res.json({
            code : 1,
             msg : '',
            data : products.recordsets[0]
        });
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo mostrar el historial de ventas.',
            data : error
        });
    }
})


module.exports = router