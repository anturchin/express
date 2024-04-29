const { getFortune } = require('./fortune');


const newsletterSignup = (req, res) => {
    res.render('newsletter-signup', { csrf: 'CSRF token goes here' });
}

const newsletterSignupProcess = (req, res) => {
    console.log('CSRF token (from hidden form field): ' + req.body._csrf);
    console.log('Name (from visible form field): ' + req.body.name);
    console.log('Email (from visible form field): ' + req.body.email);
    res.redirect(303, '/newsletter-signup/thank-you');
}

const newsletterSignupThankYou = (req, res) => res.render('newsletter-signup-thank-you');

const home = (req, res) => res.render('home');
const about = (req, res) => res.render('about', { fortune: getFortune() });
const notFound = (req, res) => res.render('404');
const serverError = (err, req, res, next) => res.render('500');

module.exports = {
    newsletterSignup,
    newsletterSignupProcess,
    newsletterSignupThankYou,
    home,
    about,
    notFound,
    serverError,
}