const router = require('express').Router(); 
const id = require('uuid');  
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
    router.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../public', '/notes.html')));

});

router.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    db = db.filter(note => note.id != id);
    fs.writeFileSync('./db/db/json', JSON.stringify(db)); 
    res.json(db); 
}); 

module.exports = router; 