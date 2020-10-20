const express = require('express');
const route = express.Router();
const ItemService = require('../services/ItemService.js');

route.get("/", (req, res) => {
    console.log('Database query is executed from NodeJs - item.js route.get(/)');
    try {
        let itemService = new ItemService();
        itemService.get((error, data)=>{
            if (error){
                console.log(error);
                res.status(500).send('Error');
            } else {
                console.log('Items get', data.rows);
                res.status(200).send(data.rows);
            }
        });
    } catch (err) {
        console.log(err);
    }
});

route.post('/', (req, res) => { 
    console.log('Database query is executed from NodeJs - item.js route.post(/)');
    let itemService = new ItemService();
    itemService.add(req.body.item.desc, (error, results) => {
        if (error) {
            res.status(500).send(error);
        } else {
            console.log("Inserted data: ", req.body.item.desc);
            res.send(results);
        }
    });
});

route.delete('/:id', (req, res) => { 
    console.log('Database query is executed from NodeJs - item.js route.delete(/)');
    let itemService = new ItemService();
    itemService.delete(req.params.id, (error, results)=>{
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