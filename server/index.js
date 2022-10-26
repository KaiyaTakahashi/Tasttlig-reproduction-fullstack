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
    const username = req.body.username;
    const password = req.body.password;
    const sqlInsert = "INSERT INTO users (username, password) VALUES ($1, $2)"
    pool.query(sqlInsert, [username, password], (err, result) => {
        if (err) {
            console.log(err)
        };
        res.send(result);
    });
});

app.get('/api/register', (req, res) => {
    const sqlSelect = "SELECT * FROM users"
    pool.query(sqlSelect, (err, result) => {
        res.send(result);
    })
});

app.post('/api/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // const sqlSelect = "SELECT * FROM users WHERE username = $1 AND password = $2";
    const sqlSelect = "SELECT * FROM users";
    pool.query(sqlSelect, (err, result) => {
        // if (reuslt["rows"].length > 0) {
        //     res.send(result);
        // } else {
        //     res.send({ message: "Wrong username/password combination"});
        // }
        // if (err) {
        //     res.send({ err: err });
        // }

        var index = -1;
        for (let i = 0; i < result["rows"].length; i++) {
            if (result["rows"][i]["username"] === username && result["rows"][i]["password"] === password) {
                index = i
            }
        }
        const indexStr = index.toString();
        if (index !== -1) {
            res.send({ message: index.toString() })
        } else {
            res.send({ message: "Wrong username/password combination"});
        }
    });
});

// app.get('/api/login', (req, res) => {
//     const sqlSelect = "SELECT * FROM users";
//     pool.query(sqlSelect, (err, result) => {
//         res.send(result["rows"]);
//     })
// })

app.listen(3001, () => {
    console.log("running server");
})