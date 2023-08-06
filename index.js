require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Op } = require("sequelize");
const app = express()
const port = process.env.PORT
app.use(cors())



app.use('/', (req, res)=> {
    return res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`U are listening on this http://localhost${port}`);
})

