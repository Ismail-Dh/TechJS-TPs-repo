const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


mongoose.connect('mongodb://127.0.0.1:27017/booksApp')
    .then(() => console.log(' Connecté à MongoDB'))
    .catch(err => console.error('Erreur MongoDB :', err));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
}));


const authRouter = require('./routes/auth');
const booksRouter = require('./routes/books');

app.use('/auth', authRouter);


function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).send(' Accès refusé. Vous devez être connecté.');
    }
}

app.use('/books', isAuthenticated, booksRouter);

app.listen(port, () => {
    console.log(` Serveur sur http://localhost:${port}`);
});
