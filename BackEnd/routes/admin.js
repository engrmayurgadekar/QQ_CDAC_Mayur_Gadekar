const express = require('express');

const app = express.Router();

app.get("/", (request,response)=>{ 
    //code
    response.send("GET FOR ADMIN PROCESSED");
})

app.post("/", (request,response)=>{ 
    //code
    response.send("POST FOR ADMIN PROCESSED");
})

app.put("/", (request,response)=>{ 
    //code
    response.send("PUT FOR ADMIN PROCESSED");
})

app.delete("/", (request,response)=>{ 
    //code
    response.send("DELETE FOR ADMIN PROCESSED");
})

module.exports = app;