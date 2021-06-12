const dbconfig = require('../dbconfig');
const dbUsersConfig = dbconfig.dbUsers;
const dbElbarrio = dbconfig.dbElbarrio;
const express = require('express');
const router = express.Router();
const sql = require('mssql');

//registrar consumidor

router.post('/registerConsumidor', async(req,res) => {
    try {
        //BD_USERS
        let pool = await sql.connect(dbUsersConfig);
        let users =  await pool.request()
            .query(`SELECT user_name FROM USERS 
                    WHERE user_name = '${req.body.username}'`);

        
        if (Object.keys(users.recordsets[0]).length == 0){
            
            let registerU =  await pool.request()
            .query(`INSERT INTO USERS (user_name,password,user_type)
            VALUES ('${req.body.username}','${req.body.password}',${1})`);
            
            //BD_ELBARRIO
            sql.close();
            let poolEB = await sql.connect(dbElbarrio);
            
            //USERS
            let registerBdUsers = await poolEB.request()
            .query(`INSERT INTO USERS (name,email,phone,cedula)
            VALUES ('${req.body.name}','${req.body.email}','${req.body.phone}','${req.body.cedula}')`);

            //ADDRESS
            let registerBdAddress = await poolEB.request()
            .query(`INSERT INTO ADDRESS (state,city,address_opt)
            VALUES ('${req.body.state}','${req.body.city}','${req.body.address_opt}')`);
            
            //CUSTOMERS
            let registerBdCustomers = await poolEB.request()
            .query(`INSERT INTO CUSTOMERS (id_customer,address)
            VALUES((SELECT TOP(1) id_user FROM USERS
            Order By id_user DESC), 
            (SELECT TOP(1) id_address FROM ADDRESS
            Order By id_address DESC))`);

            //respuesta
            let resBd = await poolEB.request()
            .query(`SELECT TOP(1) u.name, u.email, u.phone, u.cedula, a.state, a.city, a.address_opt
            FROM USERS u inner join CUSTOMERS c ON u.id_user = c.id_customer 
            inner join ADDRESS a on c.address = a.id_address
            ORDER BY u.id_user DESC`);

            res.json({
                code : 1,
                msg : '',
                data : resBd.recordsets[0]
            });
        } else{
            res.json({
                code : -1,
                msg : 'El nombre de usuario ya existe dentro del sistema.',
                data : users.recordsets[0]
            });

        }
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo registrar el usuario.',
            data : error
        });
    }
})


//registrar emprendedor

router.post('/registerEmprendedor', async(req,res) => {
    try {
        //BD_USERS
        let pool = await sql.connect(dbUsersConfig);
        let users =  await pool.request()
            .query(`SELECT user_name FROM USERS 
                    WHERE user_name = '${req.body.username}'`);

        
        if (Object.keys(users.recordsets[0]).length == 0){
            
            let registerU =  await pool.request()
            .query(`INSERT INTO USERS (user_name,password,user_type)
            VALUES ('${req.body.username}','${req.body.password}',${3})`);
            
            //BD_ELBARRIO
            sql.close();
            let poolEB = await sql.connect(dbElbarrio);
            
            //USERS
            let registerBdUsers = await poolEB.request()
            .query(`INSERT INTO USERS (name,email,phone,cedula)
            VALUES ('${req.body.name}','${req.body.email}','${req.body.phone}','${req.body.cedula}')`);

            //ADDRESS
            let registerBdAddress = await poolEB.request()
            .query(`INSERT INTO ADDRESS (state,city,address_opt)
            VALUES ('${req.body.state}','${req.body.city}','${req.body.address_opt}')`);
            
            //ENTREPRENEUR
            let registerBdEntrepreneur = await poolEB.request()
            .query(`INSERT INTO ENTREPRENEUR (id_entrepreneur,address)
            VALUES((SELECT TOP(1) id_user FROM USERS
            Order By id_user DESC), 
            (SELECT TOP(1) id_address FROM ADDRESS
            Order By id_address DESC))`);

            //SHOP
            let registerBdShop = await poolEB.request()
            .query(`INSERT INTO SHOP (id_entrepreneur,id_shop_status,name,description)
            VALUES((SELECT TOP(1) id_entrepreneur FROM ENTREPRENEUR
            Order By id_entrepreneur DESC), 
            ${2},'${req.body.nombreTienda}','${req.body.descripcion}')`);


            res.json({
                code : 1,
                msg : 'Su usuario y Tienda fueron registrados correctamente. La Tienda esta en espera de ser aprobada.',
                data : {}
            });
        } else{
            res.json({
                code : -1,
                msg : 'El nombre de usuario ya existe dentro del sistema.',
                data : users.recordsets[0]
            });

        }
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo registrar el usuario.',
            data : error
        });
    }
})

module.exports = router