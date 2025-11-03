const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'password') {
        req.session.user = 'admin';
        res.send(' Authentification réussie !');
    } else {
        res.status(401).send(' Identifiants incorrects.');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.send(' Déconnecté avec succès.');
});

module.exports = router;
