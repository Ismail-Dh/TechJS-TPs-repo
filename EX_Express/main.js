const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
}));

const authRouter = require('./routes/auth');
const booksRouter = require('./routes/books');

// Utilisation des routes
app.use('/auth', authRouter);

// Middleware d’authentification
function isAuthenticated(req, res, next) {
    if (req.session.user === 'admin') {
        next();
    } else {
        res.status(401).send(' Accès refusé. Vous devez être connecté.');
    }
}

app.use('/books', isAuthenticated, booksRouter);

app.listen(port, () => {
    console.log(` Serveur démarré sur http://localhost:${port}`);
});
