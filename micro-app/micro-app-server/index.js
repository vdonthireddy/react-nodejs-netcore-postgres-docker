var express = require('express');
var path = require('path');
const { Pool, Client } = require('pg')
const axios = require('axios');

//Postgres
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  })

//Postgres
const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_NEWDB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
})

//Create the database and Table(s)
createDbSchema = () => {
    pool.query(`SELECT 1 FROM pg_database WHERE datname='${process.env.POSTGRES_NEWDB}'`, (error, results)=>{
        if (error) {
            console.log('error', error);
        } else {
            if (results.rows.length==0) {
                pool.query(`create database ${process.env.POSTGRES_NEWDB};`, (error, results) => {
                    if (error) {
                        console.log(error);
                    } else {
                        client.connect();
                        console.log(`DB ${process.env.POSTGRES_NEWDB} Created and Connected`);
                    }    
                });
            } else {
                console.log(`Database ${process.env.POSTGRES_NEWDB} already exists.`);
            }
        }
    });
}

createTable = () => {
    client.query('create table IF NOT EXISTS notes(id INT GENERATED ALWAYS AS IDENTITY, notes_desc VARCHAR(255));', (error, results) => {
        if (error) {
            console.log(error);
        } else {
            console.log('create table', results);
        }
    });
}

//Insert data into postgres table
insertData = (notes)=> {
    client.query("insert into notes(notes_desc) values('" + notes + "');", (error, results) => {
        if (error) {
            console.log(error);
        } else {
            console.log(results.rows);
        }
    });
}

//Delete data
deleteData = (id)=>{
    client.query(`delete from notes where id='${id}'`, (error, results)=>{
        if (error) {
            console.log(error);
        } else {
            console.log(results.rows);
        }
    });
}

var app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use('/', express.static(__dirname + '/'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/create-schema', function(req, res) {
    (async ()=>{
        await createDbSchema();
        await createTable();
    })();
    res.send('DB and Table are created.');
});

app.get("/notes", (req, res) => {
    console.log('Database query is executed from NodeJs');
    try {
        client.query('SELECT * FROM notes;', (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.send(results.rows);
            }    
        });
    } catch (err) {
        console.log(err);
    }
});

app.post('/notes', (req, res) => { 
    insertData(req.body.notes.desc);
    console.log("Inserting data: ", req.body.notes.desc) 
    res.end();
});

app.delete('/notes/:id', (req, res) => { 
    deleteData(req.params.id);
    console.log("Deleting data: ", req.params.id) 
    res.end();
});

app.get('/api/notes', (req, res)=>{
    console.log('Database query is executed from /api/notes');
    axios.get(process.env.API_SERVER_URL).then((response) => {
        res.send(response.data);
    });
});

app.post('/api/notes', (req, res) => { 
    const data = {
        notes_desc:req.body.notes.desc
    };
    axios.post(process.env.API_SERVER_URL, data)
        .then((response) => {
            console.log(`Status: ${response.status}`);
            console.log('Body: ', response.data);
        }).catch((err) => {
            console.error(err);
        }).then(()=>{
            res.end();
        });   
});

app.delete('/api/notes/:id', (req, res)=>{
    console.log('Database query is executed from /api/notes');
    axios.delete(process.env.API_SERVER_URL+'/'+req.params.id).then((response) => {
        res.send(response.data);
    });
});

app.listen(8080, '0.0.0.0', ()=>{
    console.log('server listenting at http://localhost:8080/');
});