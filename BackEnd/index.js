const express = require('express');
const config = require('config');
const cors = require('cors');
const empsApp = require('./routes/emps');
const adminApp = require('./routes/admin');

const PORT = config.get("PORT");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/emps",empsApp);
app.use("/admin",adminApp);

app.listen(PORT, ()=>{console.log(`server started listening at ${PORT}`)})