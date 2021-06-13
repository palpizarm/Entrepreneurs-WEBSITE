const dbconfig = require('../dbconfig');
const dbUsersConfig = dbconfig.dbUsers;
const dbElbarrio = dbconfig.dbElbarrio;
const express = require('express');
const router = express.Router();
const sql = require('mssql');

// insertar nuevo producto
router.post('/insertNewProduct', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let product =  await poolEB.request()
            .query(`INSERT INTO ITEM (id_category, id_shop, name, status, description, price)
            VALUES (${req.body.id_category},${req.body.id_shop},'${req.body.name}',${req.body.status},
            '${req.body.description}',${req.body.price})`);
        
        res.json({
            code : 1,
            msg : 'Su producto fue registrado correctamente. El producto esta en espera de ser aprobado.',
            data : {}
        });
        
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo registrar el producto',
            data : error
        });
    }
})




module.exports = router