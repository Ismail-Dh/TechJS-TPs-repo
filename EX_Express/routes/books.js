const express = require('express');
const router = express.Router();

let books = [
    { id: 1, title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry' },
];

router.get('/', (req, res) => {
    res.json(books);
});

router.post('/', (req, res) => {
    const { title, author } = req.body;
    const newBook = { id: books.length + 1, title, author };
    books.push(newBook);
    res.json({ message: ' Livre ajouté avec succès !', book: newBook });
});

module.exports = router;
