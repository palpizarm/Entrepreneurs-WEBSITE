const dbconfig = require('../dbconfig');
const dbUsersConfig = dbconfig.dbUsers;
const dbElbarrio = dbconfig.dbElbarrio;
const express = require('express');
const router = express.Router();
const sql = require('mssql');

//Registrar consultas al administrador

router.post('/registerQuestion', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let question =  await poolEB.request()
            .query(`INSERT INTO QUESTION (id_customer,question)
            VALUES (${req.body.id_customer},'${req.body.question}')`);
        
        res.json({
            code : 1,
            msg : 'Su pregunta fue entregada al administrador correctamente. Espere pronto una respuesta.',
            data : {}
        });
        
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo entregar la pregunta.',
            data : error
        });
    }
})

//Select de consultas que le hacen al administrador

router.post('/showQuestions', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let question =  await poolEB.request()
            .query(`SELECT q.id_question, q.id_customer, q.question, u.name, u.image
            FROM QUESTION q inner join CUSTOMERS c on q.id_customer = c.id_customer inner join
            USERS u on c.id_customer = u.id_user
            WHERE q.answer IS NULL`);
        
        res.json({
            code : 1,
            msg : '',
            data : question.recordsets[0]
        });
        
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo mostrar las preguntas.',
            data : error
        });
    }
})

//Responder una consulta (update para el campo de respuesta)

router.post('/updateQuestion', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let question =  await poolEB.request()
            .query(`Update QUESTION Set answer='${req.body.answer}' Where id_question = ${req.body.id_question}`);
        
        res.json({
            code : 1,
            msg : 'La pregunta fue contestada correctamente.',
            data : {}
        });
        
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo contestar la pregunta.',
            data : error
        });
    }
})

//Mostrar sus preguntas con o sin respuesta al Consumidor

router.post('/showQuestionsConsumer', async(req,res) => {
    try {
        let poolEB = await sql.connect(dbElbarrio);
        
        let question =  await poolEB.request()
            .query(`SELECT * FROM QUESTION
            WHERE id_customer = ${req.body.id_customer}`);
        
        res.json({
            code : 1,
            msg : '',
            data : question.recordsets[0]
        });
        
        
    }
    catch (error) {
        res.json({
            code : -8,
            msg : 'Intentelo nuevamente, no se pudo mostrar las preguntas.',
            data : error
        });
    }
})



module.exports = router