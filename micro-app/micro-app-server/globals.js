const { Pool, Client } = require('pg')

class Globals {
    constructor() {
        //Postgres
        this.pg_pool = new Pool({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            port: process.env.POSTGRES_PORT,
        })

        //Postgres
        this.pg_client = new Client({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_NEWDB,
            password: process.env.POSTGRES_PASSWORD,
            port: process.env.POSTGRES_PORT,
        })
    }
    //Create the database and Table(s)
    createDbSchema() {
        this.pg_pool.query(`SELECT 1 FROM pg_database WHERE datname='${process.env.POSTGRES_NEWDB}'`, (error, results)=>{
            if (error) {
                console.log('error', error);
            } else {
                if (results.rows.length==0) {
                    this.pg_pool.query(`create database ${process.env.POSTGRES_NEWDB};`, (error, results) => {
                        if (error) {
                            console.log(error);
                        } else {
                            this.pg_client.connect();
                            console.log(`DB ${process.env.POSTGRES_NEWDB} Created and Connected`);
                        }    
                    });
                } else {
                    console.log(`Database ${process.env.POSTGRES_NEWDB} already exists.`);
                }
            }
        });
    }

    createTable() {
        this.pg_client.query('create table IF NOT EXISTS notes(id INT GENERATED ALWAYS AS IDENTITY, notes_desc VARCHAR(255));', (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log('create table', results);
            }
        });
    }
}

module.exports = Globals;