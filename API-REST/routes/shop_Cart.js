const dbconfig = require('../dbconfig');
const dbUsersConfig = dbconfig.dbUsers;
const dbElbarrio = dbconfig.dbElbarrio;
const express = require('express');
const router = express.Router();
const sql = require('mssql');


//añadir productos al carrito

router.post('/addProduct', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let product =  await poolEB.request()
            .query(`INSERT INTO SHOP_CART (id_item,id_customer,quantity)
            VALUES (${req.body.id_item},${req.body.id_customer},${req.body.quantity})`);
        
        res.json({
            code : 1,
            msg : 'Su producto fue añadido exitosamente.',
            data : {}
        });
        
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo añadir el producto.',
            data : error
        });
    }
})


//Select para ver los productos del carrito ()

router.post('/showShopCart', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let carrito =  await poolEB.request()
            .query(`SELECT s.id_shopCart, s.id_item, s.id_customer, s.quantity, i.name, i.price, i.image
            FROM SHOP_CART s inner join ITEM i on s.id_item=i.id_item
            WHERE s.id_customer = ${req.body.id_customer}`);
        
        res.json({
            code : 1,
            msg : '',
            data : carrito.recordsets[0]
        });
        
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo mostrar el carrito.',
            data : error
        });
    }
})

//Delete de un producto del carrito

router.post('/deleteProduct', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let product =  await poolEB.request()
            .query(`DELETE FROM SHOP_CART
            WHERE id_shopCart = ${req.body.id_shopCart}`);
        
        res.json({
            code : 1,
            msg : 'Su producto fue eliminado exitosamente.',
            data : {}
        });
        
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo eliminar el producto.',
            data : error
        });
    }
})


//Obtener la cantidad de productos del carrito

router.post('/getCartItemCount', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let count =  await poolEB.request()
            .query(`SELECT COUNT(*) AS count FROM SHOP_CART
            WHERE id_customer = ${req.body.id_customer}`);
        
        res.json({
            code : 1,
            msg : '',
            data : count.recordsets[0]
        });
        
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo eliminar el producto.',
            data : error
        });
    }
})

module.exports = router