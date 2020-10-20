const express = require('express');
const route = express.Router();
const NotesService = require('../services/NotesService.js');

route.get("/", (req, res) => {
    console.log('Database query is executed from NodeJs - notes.js route.get(/)');
    try {
        let notesService = new NotesService();
        notesService.getnotes((error, data)=>{
            if (error){
                console.log(error);
                res.status(500).send('Error');
            } else {
                console.log('Notes get', data.rows);
                res.status(200).send(data.rows);
            }
        });
    } catch (err) {
        console.log(err);
    }
});

route.post('/', (req, res) => { 
    console.log('Database query is executed from NodeJs - notes.js route.post(/)');
    let notesService = new NotesService();
    notesService.add(req.body.notes.desc, (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            console.log("Inserted data: ", req.body.notes.desc);
            res.send(results);
        }
    });
});

route.delete('/:id', (req, res) => { 
    console.log('Database query is executed from NodeJs - notes.js route.delete(/)');
    let notesService = new NotesService();
    notesService.delete(req.params.id, (error, results)=>{
        if (error) {
            res.status(500).send(error);
        }
        else {
            console.log("Deleted data: ", req.params.id);
            res.send(results);
        }
    });
});

module.exports = route;