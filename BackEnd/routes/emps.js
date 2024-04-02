const express = require('express');
const mysql = require('mysql');
const config = require('config');
const app = express.Router();

const connectionDetails = {
                            host: config.get("server"),
                            database: config.get("db"),
                            user : config.get("user"),
                            password: config.get("pwd")
                          }

app.get("/", (request, response)=>{
    var connection = 
        mysql.createConnection(connectionDetails);

    var statement = `select * from Emp`;

    connection.query(statement, (error, result)=>{
        if(error==null)
        {
         response.setHeader("Content-Type",
                            "application/json")
         response.write(JSON.stringify(result));
         connection.end();
         response.end();
        }
        else
        {
         response.setHeader("Content-Type",
                            "application/json")
         response.write(JSON.stringify(error));
         connection.end();
         response.end();
        }
    });
})

app.post("/", (request, response)=>{

    //console.log(request.body);

    var connection = 
        mysql.createConnection(connectionDetails);

    var No = parseInt(request.body.No);
    var Name = request.body.Name;
    var Address = request.body.Address;     
    
    var statement = `insert into Emp values(${No},'${Name}', '${Address}')`;

    console.log(statement);

    connection.query(statement, (error, result)=>{
        if(error==null)
        {
         response.setHeader("Content-Type",
                            "application/json")
         response.write(JSON.stringify(result));
         connection.end();
         response.end();
        }
        else
        {
         response.setHeader("Content-Type",
                            "application/json")
         response.write(JSON.stringify(error));
         connection.end();
         response.end();
        }
    });
})

app.put("/:No", (request, response)=>{
    var connection = 
        mysql.createConnection(connectionDetails);

    var No = parseInt(request.params.No);
    var Name = request.body.Name;
    var Address = request.body.Address;     
    
    var statement = `update Emp set Name = '${Name}', Address= '${Address}' where No = ${No}`;

    console.log(statement);

    connection.query(statement, (error, result)=>{
        if(error==null)
        {
         response.setHeader("Content-Type",
                            "application/json")
         response.write(JSON.stringify(result));
         connection.end();
         response.end();
        }
        else
        {
         response.setHeader("Content-Type",
                            "application/json")
         response.write(JSON.stringify(error));
         connection.end();
         response.end();
        }
    });
})

app.delete("/:No", (request, response)=>{
    var connection = 
        mysql.createConnection(connectionDetails);

    var No = parseInt(request.params.No);

    var statement = `delete from Emp where No = ${No}`;

    console.log(statement);

    connection.query(statement, (error, result)=>{
        if(error==null)
        {
         response.setHeader("Content-Type",
                            "application/json")
         response.write(JSON.stringify(result));
         connection.end();
         response.end();
        }
        else
        {
         response.setHeader("Content-Type",
                            "application/json")
         response.write(JSON.stringify(error));
         connection.end();
         response.end();
        }
    });
})

module.exports = app;