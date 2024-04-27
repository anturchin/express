const express = require('express');

const app = express();

const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.type('text/plain');
    res.send('home page');
})

app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('about');
})

app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - not found');
})

app.use((err, req, res, next) => {
    console.error(err.message);
    res.type('text/plain');
    res.status(500);
    res.send('500 - error server');
})

app.listen(port, () => console.log(`server express is running on port ${port}...`));