const express = require('express');
const { engine: expressHandlebars } = require('express-handlebars');

const app = express();

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;


app.get('/', (req, res) => res.render('home'));
app.get('/about', (req, res) => res.render('about'));

app.use((req, res) => {
    res.status(404);
    res.render('404');
})

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500);
    res.render('500');
})

app.listen(port, () => console.log(`server express is running on port ${port}...`));