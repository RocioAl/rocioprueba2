const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
// const cors = require('cors');
const { req, res } = require('express');

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
        id: 1,
        nombre: "Henry",
        email: "henry@email.com"
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