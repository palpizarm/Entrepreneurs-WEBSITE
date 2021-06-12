const dbconfig = require('../dbconfig');
const dbUsersConfig = dbconfig.dbUsers;
const dbElbarrio = dbconfig.dbElbarrio;
const express = require('express');
const router = express.Router();
const sql = require('mssql');

//top(6) de productos para Tendencias

router.post('/getTopCategories', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let categories =  await poolEB.request()
            .query(`SELECT TOP(6) name FROM CATEGORY`);
        
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




module.exports = router