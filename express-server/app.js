const express = require('express');
const { engine: expressHandlebars } = require('express-handlebars');

const app = express();

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;

const fortunes = [
    'рекам нужны истоки',
    'не бойся неведомого',
    'тебя ждет приятный сюрприз',
    'будь проще везде, где только можно',
];

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.render('home'));
app.get('/about', (req, res) => {
    const randomNumber = Math.floor(Math.random() * fortunes.length);
    const randomFortune = fortunes[randomNumber];
    res.render('about', { fortune:  randomFortune});
});

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