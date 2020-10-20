class ItemService {
    get(cb){
        console.log('Items Serviec Get Called', globals.pg_client);
        globals.pg_client.query('SELECT * FROM item;', (error, results) => {
            cb(error, results);
        });
    }
    add(item_desc, cb) {
        console.log(`Items Serviec add Called ${item_desc}`, globals.pg_client);
        globals.pg_client.query(`insert into item(item_desc) values('${item_desc}');`, (error, results) => {
            cb(error, results);
        });
    }
    delete(id, cb) {
        console.log(`Items Serviec delete Called ${id}`, globals.pg_client);
        globals.pg_client.query(`delete from item where id='${id}';`, (error, results)=>{
            cb(error, results);
        });
    }
}

module.exports = ItemService;