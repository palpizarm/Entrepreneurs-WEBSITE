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
            .query(`SELECT TOP(6) id_category,name,image FROM CATEGORY`);
        
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
            .query(`select i.id_item, i.id_category, i.id_shop, i.name, i.description, i.price, c.name as category_name, i.image as imageItem
            from ITEM i 
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

//Mostrar todas las categorias con todos sus productos

router.post('/showCategoriesItem', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let categories =  await poolEB.request()
            .query(`SELECT c.id_category, c.name AS nameCategory, c.image AS imageCategory, i.id_item,
            i.id_shop, i.name , i.status, i.description, i.price, i.image AS imageItem
            FROM
            CATEGORY c INNER JOIN ITEM i on c.id_category=i.id_category
            WHERE i.status = 1
            ORDER BY c.id_category`);
        
        res.json({
            code : 1,
             msg : '',
            data : categories.recordsets[0]
        });
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo mostrar las categorias.',
            data : error
        });
    }
})





module.exports = router