const express = require('express');
const { engine: expressHandlebars } = require('express-handlebars');
const bodyParser = require('body-parser');
const {
    newsletterSignup,
    newsletterSignupProcess,
    newsletterSignupThankYou,
    home,
    about,
    notFound,
    serverError } = require('./lib/handlers');

const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
    helpers: {
        section: function (name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null
        },
    },
}))

app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));

app.get('/', home);

app.get('/newsletter-signup', newsletterSignup);
app.post('/newsletter-signup/process', newsletterSignupProcess);
app.get('/newsletter-signup/thank-you', newsletterSignupThankYou);

app.get('/about', about);
app.use(notFound);
app.use(serverError);

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Express started on http://localhost:${port}` +
            '; press Ctrl-C to terminate.')
    })
} else {
    module.exports = app
}