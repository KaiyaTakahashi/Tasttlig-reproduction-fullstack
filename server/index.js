const express = require("express");
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key: "userId",
    secret: "sercret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    }
}))

const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "first_tasttlig_project_db"
});

app.post("/api/questions", async(req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const interest = req.body.interest;
        const other = req.body.other;
        const sqlInsert = "INSERT INTO question_form (name, email, phone, interest, other) VALUES ($1, $2, $3, $4, $5)"
        pool.query(sqlInsert, [name, email, phone, interest, other], (err, reuslt) => {
            if (err) {
                console.log(err)
            }
            res.send(reuslt);
        });
    } catch (err) {
        console.log("restful apl err")
        console.log(err.message);
    }
})

app.get("/api/get", (req, res) => {
    const sqlSelect = 'SELECT * FROM question_form';
    pool.query(sqlSelect, (err, result)=> {
        res.send(result["rows"]);
    })
})

app.post('/api/register', (req, res) => {
    const nameRegister = req.body.username;
    const passwordRegister = req.body.password;
    const sqlInsert = "INSERT INTO users (username, password) VALUES ($1, $2)"
    bcrypt.hash(passwordRegister, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
        pool.query(sqlInsert, [nameRegister, hash], (err, result) => {
            if (err) {
                console.log(err)
            };
            res.send(result);
        });
    });
});

app.get('/api/register', (req, res) => {
    const sqlSelect = "SELECT * FROM users"
    pool.query(sqlSelect, (err, result) => {
        res.send(result);
    })
});

app.post('/api/login', (req, res) => {
    const usernameLog = req.body.username;
    const passwordLog = req.body.password;
    const query = {
        name: 'users',
        text: 'SELECT * FROM users WHERE username = $1',
        values: [usernameLog],
    }
    pool.query(query, (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result.rows.length > 0) {
            bcrypt.compare(passwordLog, result["rows"][0]["password"], (err, bcryptRes) => {
                if (bcryptRes) {
                    const id = result.rows[0].id;
                    const accessToken = jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: 60,
                    });
                    const refreshToken = jwt.sign({id}, process.env.REFRESH_TOKEN_SECRET);
                    
                    req.session.user = result
                    res.json({ auth: true, accessToken: accessToken, refreshToken: refreshToken, result: result })
                } else {
                    res.json({ auth: false, message: "Wrong username/password combination!"});
                }
            })
        } else {
            res.send({ auth: false, message: "User doesn't exist" });
        }
    })
});

const authenticateToken = (req, res, next) => {
    const token = req.header("x-access-token");
    if (!token) {
        res.send({ message: "you don't have a token"});
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: "invalid token" })
            } else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}

app.get('/api/authentication', authenticateToken, (req, res) => {
    const query = {
        name: 'users',
        text: 'SELECT * FROM users WHERE id = $1',
        values: [req.userId],
    }
    pool.query(query, (err, result) => {
        if (err) {
            res.send({ message: "error occurs"})
        } else {
            res.send({ auth: true, message: "Hello " + result.rows[0].username + ". you are authenticated" })
        }
    })
});

app.listen(3001, () => {
    console.log("running server");
})