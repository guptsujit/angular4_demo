const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {

    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-control-allow-Headers", "Origin,X-Requestet-With, Content-Type, Accept,Authorization");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,DELETE,PATCH,OPTIONS");
    next();
})

app.use('/api/getpost', (req, res, next) => {
    //console.log(req.headers.authorization);
    /*try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "This should be a longer string");
       // next();
    } catch (error) {
        res.status(401).json({ message: 'Auth failed' });
    }*/
    let post = { post: "This is first post", date: new Date() };
    res.status(200).json(post);
 
})
app.post('/api/savepost', (req, res, next) => {
    const data = req.body;
    let successObj = { message: "Data saved successfully" };
    res.status(200).json(data);
})

app.post('/api/user/login', (req, res, next) => {
    const data = req.body;
    // for now lets assume password is matched from the database
    if (true) {
        const token = jwt.sign({ email: data.email }, "This should be a longer string", { expiresIn: 50})
        res.status(200).json({ token: token,expiresIn:50 });
    }

})
module.exports = app;