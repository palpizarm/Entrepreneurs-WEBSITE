const dbconfig = require('../dbconfig');
const dbUsersConfig = dbconfig.dbUsers;
const dbElbarrio = dbconfig.dbElbarrio;
const express = require('express');
const router = express.Router();
const sql = require('mssql');

//Top(6) de categorias para Tendencias

router.post('/getTopCategories', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let categories =  await poolEB.request()
            .query(`SELECT TOP(6) id_category,name FROM CATEGORY`);
        
        res.json({
            code : 1,
             msg : '',
            data : categories.recordsets[0]
        });
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo mostrar las tendencias.',
            data : error
        });
    }
})

// Get all items if the category
router.post('/getItemsByCategory', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let categories =  await poolEB.request()
            .query(`select i.id_item, i.id_category, i.id_shop, i.name, i.description, i.price, c.name as category_name from ITEM i 
            inner join CATEGORY c on i.id_category = c.id_category
            WHERE c.id_category = ${req.body.id_category} AND i.status = 1`);
        
        res.json({
            code : 1,
             msg : '',
            data : categories.recordsets[0]
        });
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo mostrar las tendencias.',
            data : error
        });
    }
})


//categorias para el dropdown

router.post('/getCategories', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let categories =  await poolEB.request()
            .query(`SELECT * FROM CATEGORY`);
        
        res.json({
            code : 1,
             msg : '',
            data : categories.recordsets[0]
        });
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente',
            data : error
        });
    }
})







module.exports = router