const config = require('../dbconfig');
const express = require('express');
const router = express.Router();
const sql = require('mssql');


// req.body {username,password}
router.post('/getSession', async(req,res) => {
    try {
        let pool = await sql.connect(config);
        let users =  await pool.request().query(`SELECT * FROM dbo.USERS`);
        res.json({
            code : 1,
            msg : '',
            data : users.recordsets
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