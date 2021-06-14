const dbconfig = require('../dbconfig');
const dbUsersConfig = dbconfig.dbUsers;
const dbElbarrio = dbconfig.dbElbarrio;
const express = require('express');
const router = express.Router();
const sql = require('mssql');

//Registrar las review de los productos

router.post('/registerReview', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let review =  await poolEB.request()
            .query(`INSERT INTO REVIEW (id_customer,id_item,id_rating,annotation)
            VALUES (${req.body.id_customer},${req.body.id_item},${req.body.id_rating},'${req.body.annotation}')`);
        
        res.json({
            code : 1,
            msg : 'Su review al producto fue registrada correctamente.',
            data : {}
        });
        
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo entregar la review.',
            data : error
        });
    }
})

//Mostrar las review de los productos por producto

router.post('/showReviews', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let review =  await poolEB.request()
            .query(`SELECT r.id_review, r.id_customer, r.id_item, r.id_rating, r.annotation, u.name
            FROM REVIEW r inner join CUSTOMERS c on r.id_customer=c.id_customer
            inner join USERS u on c.id_customer=u.id_user`);
        
        res.json({
            code : 1,
            msg : '',
            data : review.recordsets[0]
        });
        
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo mostrar las review.',
            data : error
        });
    }
})

module.exports = router