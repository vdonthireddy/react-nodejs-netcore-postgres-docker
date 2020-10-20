const { Pool, Client } = require('pg')
class NotesService {
    constructor(pg_pool, pg_client){
        if (pg_pool)
            this.pool = pg_pool;
        else
            this.pool = new Pool({
                user: process.env.POSTGRES_USER,
                host: process.env.POSTGRES_HOST,
                database: process.env.POSTGRES_DB,
                password: process.env.POSTGRES_PASSWORD,
                port: process.env.POSTGRES_PORT,
            })
        
        if (pg_client)
            this.client = pg_client;
        else {
            this.client = new Client({
                user: process.env.POSTGRES_USER,
                host: process.env.POSTGRES_HOST,
                database: process.env.POSTGRES_NEWDB,
                password: process.env.POSTGRES_PASSWORD,
                port: process.env.POSTGRES_PORT,
            })
            this.client.connect();
        }
    }
    getnotes(cb){
        console.log('Notes Serviec Get Called', this.client);
        this.client.query('SELECT * FROM notes;', (error, results) => {
            cb(error, results);
        });
    }
    add(notes_desc, cb) {
        console.log(`Notes Serviec add Called ${notes_desc}`, this.client);
        this.client.query(`insert into notes(notes_desc) values('${notes_desc}');`, (error, results) => {
            cb(error, results);
        });
    }
    delete(id, cb) {
        console.log(`Notes Serviec delete Called ${id}`, this.client);
        this.client.query(`delete from notes where id='${id}';`, (error, results)=>{
            cb(error, results);
        });
    }
}

module.exports = NotesService;