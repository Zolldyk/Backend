const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
const port = 3000;

//setting up Middleware
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static("public\styles"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

//temporary database for storing posts in memory
let post = [];
let nextId = 1;

//Route definitions
//Home route
app.get("/", (req, res) => {
    res.render("index.ejs", {posts: post});
})

//Show new post route
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

//create new post route
app.post("/posts", (req, res) => {

    const { title, content } = req.body;
    
    // basic validation
    if (!title || title.length < 3) {
        return res.status(400).send('Title must be at least 3 characters long');
    }
    
    if (!content || content.length < 10) {
        return res.status(400).send('Content must be at least 10 characters long');
    }

    const post = {
        id: nextId++,
        title: req.body.title, 
        content: req.body.content,
        createdAt: newDate()
    };
    posts.unshift(post);
    res.redirect("/");
})

//route for editing a post
app.get('/posts/:id/edit', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    res.render('edit', { post: post });
});

//route for updating post
app.put('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post) {
        post.title = req.body.title;
        post.content = req.body.content;
    }
    res.redirect('/');
});

//route for deleting post
app.delete('/posts/:id', (req, res) => {
    const index = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        posts.splice(index, 1);
    }
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});