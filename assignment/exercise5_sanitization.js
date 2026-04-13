const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

const setupSanitization = (app) => {
    app.use(xss());
    app.use(mongoSanitize());
};

module.exports = setupSanitization;
