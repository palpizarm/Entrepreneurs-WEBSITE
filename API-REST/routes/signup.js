const dbconfig = require('../dbconfig');
const dbUsersConfig = dbconfig.dbUsers;
const dbElbarrio = dbconfig.dbElbarrio;
const express = require('express');
const router = express.Router();
const sql = require('mssql');

//registrar consumidor

router.post('/registerConsumidor', async(req,res) => {
    try {
        console.log("0");
        //BD_USERS
        sql.close();
        let pool = await sql.connect(dbUsersConfig);
        let users =  await pool.request()
            .query(`SELECT * FROM USERS 
                    WHERE username = '${req.body.email}'`);

        if (Object.keys(users.recordsets[0]).length == 0){
            let registerU =  await pool.request()
            .query(`INSERT INTO USERS (username,pass,user_type)
            VALUES ('${req.body.email}','${req.body.password}',${1})`);
    
            //BD_ELBARRIO
            sql.close();
            let poolEB = await sql.connect(dbElbarrio);

            //USERS
            let registerBdUsers = await poolEB.request()
            .query(`INSERT INTO USERS (name,email,phone,cedula,image)
            VALUES ('${req.body.name}','${req.body.email}','${req.body.phone}','${req.body.cedula}','${req.body.image}')`);
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
            .query(`SELECT *
            FROM USERS u inner join CUSTOMERS c ON u.id_user = c.id_customer 
            inner join ADDRESS a on c.address = a.id_address
            WHERE u.email = '${req.body.email}'
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
                data : {}
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
        sql.close();
        let pool = await sql.connect(dbUsersConfig);
        let users =  await pool.request()
            .query(`SELECT * FROM USERS 
                    WHERE username = '${req.body.email}'`);

        
        if (Object.keys(users.recordsets[0]).length == 0){
            console.log('1');
            let registerU =  await pool.request()
            .query(`INSERT INTO USERS (username,pass,user_type)
            VALUES ('${req.body.email}','${req.body.password}',3)`);
            console.log('2');
            //BD_ELBARRIO
            sql.close();
            let poolEB = await sql.connect(dbElbarrio);
            console.log('3');
            //USERS
            let registerBdUsers = await poolEB.request()
            .query(`INSERT INTO USERS (name,email,phone,cedula,image)
            VALUES ('${req.body.name}','${req.body.email}','${req.body.phone}','${req.body.cedula}','${req.body.imageUser}')`);
            console.log('4');
            //ADDRESS
            let registerBdAddress = await poolEB.request()
            .query(`INSERT INTO ADDRESS (state,city,address_opt)
            VALUES ('${req.body.state}','${req.body.city}','${req.body.address_opt}')`);
            console.log('5');
            //ENTREPRENEUR
            let registerBdEntrepreneur = await poolEB.request()
            .query(`INSERT INTO ENTREPRENEUR (id_entrepreneur,address)
            VALUES((SELECT TOP(1) id_user FROM USERS
            Order By id_user DESC), 
            (SELECT TOP(1) id_address FROM ADDRESS
            Order By id_address DESC))`);

            //SHOP
            let registerBdShop = await poolEB.request()
            .query(`INSERT INTO SHOP (id_entrepreneur,id_shop_status,name,description,image)
            VALUES((SELECT TOP(1) id_entrepreneur FROM ENTREPRENEUR
            Order By id_entrepreneur DESC), 
            ${2},'${req.body.nombreTienda}','${req.body.descripcion}','${req.body.imageEntrepreneur}')`);


            res.json({
                code : 1,
                msg : 'Su usuario y Tienda fueron registrados correctamente. La Tienda esta en espera de ser aprobada.',
                data : {}
            });
        } else{
            res.json({
                code : -1,
                msg : 'El nombre de usuario ya existe dentro del sistema.',
                data : {}
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