const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-control-allow-Headers", "Origin,X-Requestet-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,DELETE,PATCH,OPTIONS");
    next();
})

app.use('/api/getpost', (req, res, next) => {
    let post = { post: "This is first post", date: new Date() };
    res.status(200).json(post);
})
app.post('/api/savepost',(req,res,next)=>{
    const data = req.body;
    let successObj = { message: "Data saved successfully"};
    res.status(200).json(data);
})
module.exports = app;