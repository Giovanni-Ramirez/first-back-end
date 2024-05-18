const notes = require('express').Router();
const fs = require('fs');
const db = require('../db/db.json');

notes.get('/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(JSON.parse(data))
        }
    })
});

notes.post('/notes', (req, res) => {
    
   const { title, text } = req.body;

   if(title&&text) {
    const newTask = {
        title,
        text
    };

    fs.readFile('db/db.json', 'utf-8', (err, data) => {
        console.log('readfile was ran');
        if (err) {
            console.log(err);
        } else {
            const parsedTasks = JSON.parse(data);

            parsedTasks.push(newTask);

            fs.writeFile(
                'db/db.json',
                JSON.stringify(parsedTasks, null, 2),
                (writeErr) =>
                    writeErr
                      ? console.error(writeErr)
                      : console.info('Successfully updated tasks db')
            );

        }
    });

    const response = {
        status: 'success',
        body: newTask,
    };

    console.log(response);
    res.status(201).json(response);
   } else {
    res.status(500).json('Error in posting review');
  }
});





module.exports = notes;