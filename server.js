const express = require('express');
const path = require('path');
const api = require('./routes/apiRoutes.js');

const PORT = process.env.port || 3001;;

const app = express();

// middle wear
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// any get starting with /api will get sent to route
app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);