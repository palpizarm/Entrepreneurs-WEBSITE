const dbconfig = require('../dbconfig');
const dbUsersConfig = dbconfig.dbUsers;
const express = require('express');
const router = express.Router();
const sql = require('mssql');


// req.body {username,password}
router.post('/getSession', async(req,res) => {
    try {
        let pool = await sql.connect(dbUsersConfig);
        let users =  await pool.request()
            .query(`SELECT * FROM USERS U 
                    INNER JOIN USER_TYPE T ON T.id = U.user_type
                    WHERE user_name = '${req.body.username}' AND password = '${req.body.password}'`);
        res.json({
            code : 1,
            msg : '',
            data : users.recordsets[0]
        });
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentolo nuevamente, no se pudo iniciar sesión',
            data : error
        });
    }
})

module.exports = router