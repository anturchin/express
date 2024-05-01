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

const newsletter = (req, res) => res.render('newsletter', { csrf: 'CSRF token goes here' });

const apiNewsletterSignup = (req, res) => {
    console.log('CSRF token (from hidden form field): ' + req.body._csrf);
    console.log('Name (from visible form field): ' + req.body.name);
    console.log('Email (from visible form field): ' + req.body.email);
    res.send({ result: 'success' });
}

const vacationPhotoContest = (req, res) => {
    const now = new Date();
    res.render('contest/vacation-photo', { year: now.getFullYear(), month: now.getMonth() });
}

const vacationPhotoContestAjax = (req, res) => {
    const now = new Date();
    res.render('contest/vacation-photo-ajax', { year: now.getFullYear(), month: now.getMonth() });
}

const vacationPhotoContestProcess = (req, res, fields, files) => {
    console.log('field data: ', fields);
    console.log('files: ', files);
    res.redirect(303, '/contest/vacation-photo-thank-you');
}

const vacationPhotoContestProcessError = (req, res, fields, files) => {
    res.redirect(303, '/contest/vacation-photo-error');
}

const vacationPhotoContestProcessThankYou = (req, res) => {
    res.render('contest/vacation-photo-thank-you');
}

const apiVacationPhotoContest = (req, res, fields, files) => {
    console.log('field data: ', fields);
    console.log('files: ', files);
    res.send({ result: 'success' });
}

const apiVacationPhotoContestError = (req, res, message) => {
    res.send({ result: 'error', error: message });
}

const home = (req, res) => res.render('home');
const about = (req, res) => res.render('about', { fortune: getFortune() });
const notFound = (req, res) => res.render('404');
const serverError = (err, req, res, next) => res.render('500');

module.exports = {
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
    serverError,
}