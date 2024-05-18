const notes = require('express').Router();
const fs = require('fs');
const db = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

// This gets the notes list (db) then displays on the left
notes.get('/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(JSON.parse(data))
        }
    })
});
// This add a note to the note list (db)
notes.post('/notes', (req, res) => {
    
    const { title, text } = req.body;
    const id = uuidv4();
    if(title&&text&&id) {
    const newTask = {
        id,
        title,
        text,
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
// This deletes a note from the db and updates the db
notes.delete('/notes/:id', (req, res) => {
    //The id we are looking for
    const noteId = req.params.id;
    
    fs.readFile('db/db.json', 'utf-8', (err, data) => {
        console.log('starting fs.readfile');//testing
        if (err) {
            console.log(err);
        } else {
            //The parsed db in an array
            const parsedTasks = JSON.parse(data);

            //looping throught an array to find the matching id
            for (let i = 0; i < parsedTasks.length; i++) {
                if(parsedTasks[i].id == noteId) {
                    //deleteing the element with the same id
                    parsedTasks.splice(i, 1);
                    //overwriting the file location with updated parsedTask array
                    fs.writeFile(
                        'db/db.json',
                        JSON.stringify(parsedTasks, null, 2),
                        (writeErr) =>
                            writeErr
                              ? console.error(writeErr)
                              : console.info('Successfully updated tasks db')
                    );
                }
            }
        }
    });

    const response = 'Deleted note and updated the notes list!'

    console.log(response);
    res.status(201).json(response);
});



module.exports = notes;