const express = require('express');
const route = express.Router();
const axios = require('axios');

route.get('/notes', (req, res)=>{
    console.log('Database query is executed from /api/notes');
    axios.get(process.env.API_SERVER_URL).then((response) => {
        res.send(response.data);
    });
});

route.post('/notes', (req, res) => { 
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

route.delete('/notes/:id', (req, res)=>{
    console.log('Database query is executed from /api/notes');
    axios.delete(process.env.API_SERVER_URL+'/'+req.params.id).then((response) => {
        res.send(response.data);
    });
});

module.exports = route;