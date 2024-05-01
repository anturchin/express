const express = require('express');
const { engine: expressHandlebars } = require('express-handlebars');
const bodyParser = require('body-parser');
const { Form } = require('multiparty');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const {
    vacationPhotoContest,
    vacationPhotoContestAjax,
    vacationPhotoContestProcessThankYou,
    apiVacationPhotoContest,
    apiVacationPhotoContestError,
    vacationPhotoContestProcess,
    vacationPhotoContestProcessError,
    apiNewsletterSignup,
    newsletter,
    newsletterSignup,
    newsletterSignupProcess,
    newsletterSignupThankYou,
    home,
    about,
    notFound,
    serverError } = require('./lib/handlers');
const { credentials } = require('./config');
const flashMiddleware = require('./lib/middleware/flash');

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

app.use(cookieParser(credentials.cookieSecret));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
}));

app.use(express.static(__dirname + '/public'));

app.use(flashMiddleware);

app.get('/', home);

app.get('/newsletter-signup', newsletterSignup);
app.post('/newsletter-signup/process', newsletterSignupProcess);
app.get('/newsletter-signup/thank-you', newsletterSignupThankYou);

app.get('/newsletter', newsletter);
app.post('/api/newsletter-signup', apiNewsletterSignup);


app.get('/contest/vacation-photo', vacationPhotoContest);
app.get('/contest/vacation-photo-ajax', vacationPhotoContestAjax)
app.post('/contest/vacation-photo/:year/:month', (req, res) => {
    const form = new Form()
    form.parse(req, (err, fields, files) => {
        if (err) return vacationPhotoContestProcessError(req, res, err.message)
        vacationPhotoContestProcess(req, res, fields, files)
    })
});


app.get('/contest/vacation-photo-thank-you', vacationPhotoContestProcessThankYou)
app.post('/api/vacation-photo-contest/:year/:month', (req, res) => {
    const form = new Form()
    form.parse(req, (err, fields, files) => {
        if (err) return apiVacationPhotoContestError(req, res, err.message)
        apiVacationPhotoContest(req, res, fields, files)
    })
})


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