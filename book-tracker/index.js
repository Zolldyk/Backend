require ('dotenv').config();
const express = require('express');
const path = require('path');
const bookRoutes = require('./routes/books');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/books', bookRoutes);
app.use(expressLayouts);

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');

// Routes
app.use('/books', bookRoutes);

app.get('/', async (req, res) => {
    console.log('Received request for homepage');
    const books = [{
        id: 1,
        title: "Test Book",
        author: "Test Author",
        isbn: "9780385533225",
        rating: 4,
        date_finished: "2024-01-01"
    }];
    
    try {
        console.log('Rendering books/index');
        res.render('books/index', { books });
    } catch (error) {
        console.error('Error rendering:', error);
        res.status(500).send('Error rendering page');
    }
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});