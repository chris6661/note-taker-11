const router = require('express').Router(); 
const { v4: uuidv4 } = require('uuid');  
const path = require('path'); 
const fs = require('fs'); 
const db = require('../db/db.json');

router.get('/api/notes', (req, res) => {
    res.json(db);
});

router.post('/api/notes', (req, res) => {
    req.body.id = id; 
    db.push(req.body); 
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json(db); 
});

router.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    db = db.filter(note => note.id != id);
    fs.writeFileSync('./db/db/json', JSON.stringify(db)); 
    res.json(); 
}); 

module.exports = router; 