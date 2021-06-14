const dbconfig = require('../dbconfig');
const dbUsersConfig = dbconfig.dbUsers;
const dbElbarrioConfig = dbconfig.dbElbarrio;
const express = require('express');
const router = express.Router();
const sql = require('mssql');


// req.body {username,password}
router.post('/getSession', async (req, res) => {
    try {
        let pool = await sql.connect(dbUsersConfig);
        let users = await pool.request()
            .query(`SELECT * FROM USERS U 
                        WHERE U.[username] = \'${req.body.username}\' AND 
                        U.[pass] = \'${req.body.password}\';`);
        if ((users.recordsets[0]).length == 0) {
            res.json({
                code: -1,
                msg: 'El usuario o la contraseña es invalida',
                data: {}
            });
        } else {
            //BD_ELBARRIO
            sql.close();
            let poolEB = await sql.connect(dbElbarrioConfig);
            if (users.recordsets[0][0].user_type == 1) {
                var resBd = await poolEB.request()
                    .query(`SELECT *
                FROM USERS u inner join CUSTOMERS c ON u.id_user = c.id_customer 
                inner join ADDRESS a on c.address = a.id_address
                WHERE u.email = '${req.body.username}'`);
            } else {
                var resBd = await poolEB.request()
                .query(`SELECT *
                FROM USERS u inner join ENTREPRENEUR e ON u.id_user = e.id_entrepreneur 
                inner join ADDRESS a on e.address = a.id_address
                inner join SHOP s on s.id_entrepreneur = e.id_entrepreneur
                WHERE u.email = '${req.body.username}'`);
            }
            res.json({
                code: 1,
                msg: '',
                data: resBd.recordsets[0]
            });
        }
        sql.close();
    }
    catch (error) {
        res.json({
            code: -8,
            msg: 'Intentelo nuevamente, no se pudo iniciar sesión',
            data: error
        });
    }
})

module.exports = router