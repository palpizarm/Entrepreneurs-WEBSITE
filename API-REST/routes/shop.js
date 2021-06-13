const dbconfig = require('../dbconfig');
const dbUsersConfig = dbconfig.dbUsers;
const dbElbarrio = dbconfig.dbElbarrio;
const express = require('express');
const router = express.Router();
const sql = require('mssql');


//Mostrar todas las tiendas

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






module.exports = router