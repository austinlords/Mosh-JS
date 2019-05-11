const config = require('config');
const Joi = require('@hapi/joi');
const express = require('express');
const debug = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const app = express();
const log = require('./middleware/logger');
const authenticate = require('./authenticator');
const helmet = require('helmet');
const morgan = require('morgan');
const courses = require('./routes/courses');
const home = require('./routes/home');

app.set('view engine', 'pug');
app.set('views', './views'); // default

app.use(express.json());
app.use(express.urlencoded( { extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled...');
}

app.use(log);
app.use(authenticate);


// PORT environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));