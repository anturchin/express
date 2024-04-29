const express = require('express');
const { engine: expressHandlebars } = require('express-handlebars');
const { home, about, notFound, serverError } = require('./lib/handlers');

const app = express();

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', home);
app.get('/about', about);
app.use(notFound);
app.use(serverError);

app.listen(port, () => console.log(`server express is running on port ${port}...`));