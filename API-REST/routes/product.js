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

//Top(8) productos destacados

router.post('/getTopProductosDest', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let products =  await poolEB.request()
            .query(`SELECT TOP(8) id_item,name,price FROM ITEM WHERE status = 1`);
        
        res.json({
            code : 1,
             msg : '',
            data : products.recordsets[0]
        });
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo mostrar los productos destacados.',
            data : error
        });
    }
})

//Top(8) productos nuevos

router.post('/getTopProductosNuevos', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let products =  await poolEB.request()
            .query(`SELECT TOP(8) id_item,name,price FROM ITEM WHERE status = 1
            ORDER BY id_item DESC`);
        
        res.json({
            code : 1,
             msg : '',
            data : products.recordsets[0]
        });
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo mostrar los productos nuevos.',
            data : error
        });
    }
})


//Mostrar productos de una Tienda
//Body = {"id_shop": //numero }

router.post('/shopShowProducts', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let products =  await poolEB.request()
            .query(`SELECT *
            FROM ITEM i INNER JOIN SHOP s ON i.id_shop = s.id_shop
            WHERE s.id_shop = ${req.body.id_shop} AND status = 1`);
        
        res.json({
            code : 1,
             msg : '',
            data : products.recordsets[0]
        });
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo mostrar los productos.',
            data : error
        });
    }
})


//Mostrar productos para el emprendedor de una Tienda 
//Body = {"id_shop": //numero }

router.post('/shopProducts', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let products =  await poolEB.request()
            .query(`SELECT i.id_item, 
                        i.id_category, 
                        i.id_shop, 
                        i.name, 
                        i.status, 
                        i.description, 
                        i.price, 
                        s.id_entrepreneur
                    FROM ITEM i
                    inner join SHOP s ON i.id_shop = s.id_shop
                    WHERE s.id_shop = ${req.body.id_shop}`);
        res.json({
            code : 1,
             msg : '',
            data : products.recordsets[0]
        });
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo mostrar los productos.',
            data : error
        });
    }
})


//mostrar products por barra de busqueda
//Body = {"name": //nombre de la busqueda }

router.post('/productSearchBar', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let products =  await poolEB.request()
            .query(`SELECT id_item, name, price
            FROM ITEM
            WHERE name LIKE '%${req.body.name}%' AND status = 1`);
        
        res.json({
            code : 1,
             msg : '',
            data : products.recordsets[0]
        });
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo mostrar los productos.',
            data : error
        });
    }
})


//mostrar los productos pendientes de aprobar

router.post('/getProductsToAprove', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let productsAp =  await poolEB.request()
            .query(`SELECT * 
            FROM ITEM
            WHERE status = 0`);
        
        res.json({
            code : 1,
             msg : '',
            data : productsAp.recordsets[0]
        });
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo mostrar los productos por aprobar.',
            data : error
        });
    }
})

//Update de estado de los productos

router.post('/ProductStateUpdate', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let productsAp =  await poolEB.request()
            .query(`Update ITEM Set status = ${req.body.status} Where id_item = ${req.body.id_item}`);
        
        res.json({
            code : 1,
             msg : 'El estado fue cambiado exitosamente.',
            data : {}
        });
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo actualizar el estado del producto.',
            data : error
        });
    }
})



module.exports = router