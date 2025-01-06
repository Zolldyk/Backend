const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

//Books list route
router.get('/', (req, res) => {
    const books = []; //Temporar until database is connected
    res.render ('books/index', {books});
})

//Add new book form route
router.get('/new', (req, res) => {
    res.render('books/new');
})

router.get('/cover/:isbn', bookController.getBookCover);

module.exports = router;