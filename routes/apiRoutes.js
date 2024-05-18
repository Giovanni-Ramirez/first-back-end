const notes = require('express').Router();
const fs = require('fs');
const db = require('../db/db.json');

notes.get('/notes', (req, res) => {
    res.json(db)
});

notes.post('/notes', (req, res) => {

})





module.exports = notes;