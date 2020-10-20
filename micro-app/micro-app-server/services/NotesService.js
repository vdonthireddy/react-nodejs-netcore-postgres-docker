class NotesService {
    getnotes(cb){
        console.log('Notes Serviec Get Called', globals.pg_client);
        globals.pg_client.query('SELECT * FROM notes;', (error, results) => {
            cb(error, results);
        });
    }
    add(notes_desc, cb) {
        console.log(`Notes Serviec add Called ${notes_desc}`, globals.pg_client);
        globals.pg_client.query(`insert into notes(notes_desc) values('${notes_desc}');`, (error, results) => {
            cb(error, results);
        });
    }
    delete(id, cb) {
        console.log(`Notes Serviec delete Called ${id}`, globals.pg_client);
        globals.pg_client.query(`delete from notes where id='${id}';`, (error, results)=>{
            cb(error, results);
        });
    }
}

module.exports = NotesService;