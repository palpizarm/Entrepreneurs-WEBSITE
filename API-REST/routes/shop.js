const dbconfig = require('../dbconfig');
const dbUsersConfig = dbconfig.dbUsers;
const dbElbarrio = dbconfig.dbElbarrio;
const express = require('express');
const router = express.Router();
const sql = require('mssql');


//Mostrar todas las tiendas a las personas

router.post('/getShops', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let shops =  await poolEB.request()
            .query(`SELECT * 
            FROM SHOP
            WHERE id_shop_status = 1`);
        
        res.json({
            code : 1,
             msg : '',
            data : shops.recordsets[0]
        });
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo mostrar las tiendas.',
            data : error
        });
    }
})

//Mostrar todas las tiendas pero al Admin

router.post('/getShopsAdmin', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let shops =  await poolEB.request()
            .query(`SELECT * 
            FROM SHOP`);
        
        res.json({
            code : 1,
             msg : '',
            data : shops.recordsets[0]
        });
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo mostrar las tiendas.',
            data : error
        });
    }
})


//Mostrar Tiendas por aprobar

router.post('/getShopToAprove', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let shops =  await poolEB.request()
            .query(`SELECT * 
            FROM SHOP
            where id_shop_status = 2`);
        
        res.json({
            code : 1,
             msg : '',
            data : shops.recordsets[0]
        });
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo mostrar las tiendas por aprobar.',
            data : error
        });
    }
})

//Update de estado de tienda

router.post('/getShopUpdate', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let shops =  await poolEB.request()
            .query(`Update SHOP Set id_shop_status = ${req.body.id_shop_status} Where id_shop = ${req.body.id_shop}`);
        
        res.json({
            code : 1,
             msg : 'El estado fue cambiado exitosamente.',
            data : {}
        });
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo actualizar el estado de la tienda.',
            data : error
        });
    }
})




module.exports = router