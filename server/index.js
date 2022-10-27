const express = require("express");
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
        if (result["rows"].length > 0) {
            bcrypt.compare(passwordLog, result["rows"][0]["password"], (err, bcryptRes) => {
                if (bcryptRes) {
                    res.send(result);
                } else {
                    res.send({ message: "Wrong username/password combination!"});
                }
            })
        } else {
            res.send({ message: "User doesn't exist" });
        }
    })
});

app.listen(3001, () => {
    console.log("running server");
})