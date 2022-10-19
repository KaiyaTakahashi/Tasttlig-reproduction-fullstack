const express = require("express");
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'TasttligQuestionFormDataBase'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/api/insert", (req, res) => {

    const userName = req.body.userName
    const userEmail = req.body.userEmail
    const userPhoneNumber = req.body.userPhoneNumber
    const other = req.body.other
    const interest = req.body.interest

    const sqlInsert = 'INSERT INTO tasttlig_question_forms (userName, userEmail, userPhoneNumber, other, interest) VALUES (?, ?, ?, ?, ?)';
    db.query(sqlInsert, [userName, userEmail, userPhoneNumber, other, interest], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send("hello kaiya")
    });
});

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM tasttlig_question_forms";
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
})

app.listen(3001, () => {
    console.log("running server");
})