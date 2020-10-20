const express = require('express');
const route = express.Router();
const axios = require('axios');

route.get('/item', (req, res)=>{
    console.log('Database query is executed from /api/item');
    axios.get(process.env.API_SERVER_URL).then((response) => {
        res.send(response.data);
    });
});

route.post('/item', (req, res) => { 
    const data = {
        item_desc:req.body.item.desc
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

route.delete('/item/:id', (req, res)=>{
    console.log('Database query is executed from /api/item');
    axios.delete(process.env.API_SERVER_URL+'/'+req.params.id).then((response) => {
        res.send(response.data);
    });
});

module.exports = route;