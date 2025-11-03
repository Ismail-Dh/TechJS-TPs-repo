const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.send(' Utilisateur enregistré avec succès !');
    } catch (err) {
        res.status(400).send(' Erreur : ' + err.message);
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send(' Utilisateur non trouvé.');

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).send(' Mot de passe incorrect.');

        req.session.userId = user._id;
        res.send(' Connecté avec succès !');
    } catch (err) {
        res.status(500).send('Erreur serveur : ' + err.message);
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('👋 Déconnecté avec succès.');
});

module.exports = router;
