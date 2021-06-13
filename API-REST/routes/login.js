const dbconfig = require('../dbconfig');
const dbUsersConfig = dbconfig.dbUsers;
const express = require('express');
const router = express.Router();
const sql = require('mssql');


// req.body {username,password}
router.post('/getSession', async (req, res) => {
    try {
        let pool = await sql.connect(dbUsersConfig);
        let users = await pool.request()
            .query(`SELECT * FROM USERS U 
                    INNER JOIN USER_TYPE T ON T.id = U.user_type
                    WHERE user_name = '${req.body.username}' AND password = '${req.body.password}'`);

        if (Object.keys(users.recordsets[0]).length == 0) {


            //BD_ELBARRIO
            sql.close();
            let poolEB = await sql.connect(dbElbarrio);
            let resBd = await poolEB.request()
                .query(`SELECT TOP(1) *
            FROM USERS u inner join CUSTOMERS c ON u.id_user = c.id_customer 
            inner join ADDRESS a on c.address = a.id_address
            ORDER BY u.id_user DESC`);

            res.json({
                code: -1,
                msg: 'El usuario o la contraseña invalido',
                data: resBd.recordsets[0]
            });
            sql.close();
        } else {
            res.json({
                code: 1,
                msg: '',
                data: users.recordsets[0]
            });
        }
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