const express = require('express');
const path = require('path');
const api = require('./routes/apiRoutes.js');

const PORT = process.env.port || 3001;

const app = express();

// middle wear
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// any get starting with /api will get sent to route
app.use('/api', api);

// on load will route to the main index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});
// On the click of button will take to this html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// listen for any call on this port
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);