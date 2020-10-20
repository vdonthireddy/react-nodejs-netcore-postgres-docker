const express = require('express');
const path = require('path');
const Globals = require('./globals.js');

const item = require('./routes/item.js');
const api = require('./routes/api.js');

const app = express();

global.globals = new Globals();

app.use(express.urlencoded());
app.use(express.json());
app.use('/', express.static(__dirname + '/'));
app.use('/item', item);
app.use('/api', api);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/create-schema', function(req, res) {
    (async ()=>{
        await globals.createDbSchema();
        await globals.createTable();
    })();
    res.send('DB and Table are created.');
});``

app.listen(8080, '0.0.0.0', ()=>{
    console.log('server listenting at http://localhost:8080/');
});