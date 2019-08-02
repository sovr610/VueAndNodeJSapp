'use strict'


var express = require('express');
const path = require('path');
var swaggerJSDoc = require('swagger-jsdoc');
var pino = require('express-pino-logger');
const sql = require('./mysqlDB');
var util = require('./util');



const logger = pino({
    prettyPrint: {
        colorize: true,
    }
});
const app = express();
const port = 4444;


app.use(logger); //used for better logging


var swaggerDefinition = {
    info: {
        title: 'User node.js database app with mySQL',
        version: '1.0.0',
        description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: 'localhost:4444',
    basePath: '/',
};

// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: [path.resolve(__dirname, 'server.js')],
};


var swaggerSpec = swaggerJSDoc(options);

app.get('/docs', async(req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, 'redoc.html'));
    } catch (e) {
        req.log.error(e);
        next(e);
    }
});

app.get('/swagger.json', async(req, res, next) => {
    try {
        console.log(sql);
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    } catch (e) {
        req.log.error(e);
        next(e);
    }
});



/**
 * @swagger
 * /user:
 *   get:
 *     summary: List all the users
 *     description: Returns a list of all the users
 *     tags:
 *       - users
 *     parameters:
 *       - in: query
 *         name: id
 *         type: string
 *         required: false
 *     responses:
 *       200:
 *         description: List of animals
 *         schema:
 *           type: object
 *           properties:
 *             users:
 *               type: array
 *               description: all the users
 *               items:
 *                 type: object
 */
app.get("/user", async(req, res, next) => {

    req.log.info("-------------------------------GET /user --------------------------");
    try {

        req.log.debug(req.query);
        req.log.debug(req.headers);

        if (req.query.id == undefined) {
            sql.getAllRowsInTable({ tableName: "users" }, function(user_data) {
                req.log.info(user_data);
                res.json(user_data);
            }, function(err) {
                req.log.error(err);
                res.json(util.getErrorObject(err));
            });
        } else {
            sql.getRowsInTableWithWhere({ tableName: "users", where: 'id = ' + req.query.id }, function(users) {
                req.log.info(user_data);
                res.json(user_data);
            }, function(err) {
                req.log.error(err);
                res.json(util.getErrorObject(err));
            });
        }

    } catch (e) {
        req.log.error(e);
        next(e);
    }
    req.log.info("--------------------------------------------------------------------");
});

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Add more users
 *     description: Add user to the database
 *     tags:
 *       - users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 items:
 *                   firstname:
 *                     type: string
 *                   lastname:
 *                     type: string
 *                   age:
 *                     type: integer
 *     responses:
 *       200:
 *         description: Adds the users in body
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               default: 'Added'
 */
app.post("/user", async(req, res, next) => {
    try {
        req.log.debug(req.params);
        req.log.debug(req.headers);
        req.log.debug(req.body);

        var fname = req.body.firstname;
        var lname = req.body.lastname;
        var age = req.body.age;
        var id = req.body.id;

        var values = [];
        values.push({ columnName: 'user_id', value: id });
        values.push({ columnName: 'firstname', value: fname });
        values.push({ columnName: 'lastname', value: lname });
        values.push({ columnName: 'age', value: age });

        sql.insertIntoTable({ tableName: "users", values: values }).then(function(j) {
            console.log(j);
        }, function(err) {
            console.log(err);
        });
    } catch (e) {
        req.log.error(e);
        next(e);
    }
});


app.put("/user", async(req, res, next) => {
    try {
        req.log.debug(req.params);
        req.log.debug(req.headers);
        req.log.debug(req.body);
        var id = req.params.id;
        sql.updateTable({ tableName: "users", where: "id = " + id, }, )

    } catch (e) {
        req.log.error(e);
        next(e);
    }
});


app.delete('/user', async(req, res, next) => {
    try {
        req.log.debug(req.params);
        req.log.debug(req.headers);
    } catch (e) {
        req.log.error(e);
        next(e);
    }
});

app.listen(port, () => {
    console.log('server is running on port ' + port);
    sql.connect('localhost', 'parker', 'Parkereli1', 'nodetest');
});

module.exports = app;