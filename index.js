const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
// const cors = require('cors');
const { req, res } = require('express');
bodyParser = require('body-parser')
cookieParser = require('cookie-parser')
cors = require('cors');


// For each request, provide wildcard Access-Control-* headers via OPTIONS call
app.use(cors());

// For each request, parse request body into a JavaScript object where header Content-Type is application/json
app.use(bodyParser.json());

// For each request, parse cookies
app.use(cookieParse());
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// app.use(cors())
// app.get('/con-cors', cors(), (req, res, next) => {
//     res.json({ msg: 'con cors 🔝 🎉' })
// })
app.get("/api", (req, res) => {
    res.json({
        mensaje: "Nodejs and JWT"
    });
});

app.post("/api/login", (req, res) => {
    const user = {
        usuario: "Rocio",
        password: "123"
    }

    jwt.sign({ user }, 'secretkey', { expiresIn: '32s' }, (err, token) => {
        res.json({
            token
        });
    });

});

app.post("/api/posts", verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if (error) {
            res.sendStatus(403);
        } else {
            res.json({
                mensaje: "Post fue creado",
                authData
            });
        }
    });
});

// Authorization: Bearer <token>
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}
app.listen(port, () => {
    console.log(`Api corriendo en el puerto ${port}`);
});