const express = require('express');
const path = require('path');
const app = express();
const port = 5000;
app.use(express.static(path.join(__dirname, 'public')));
const mypage = (req, res) => {
    console.log(path.join(__dirname, 'pages', 'index.html'));
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
};
app.get('/', mypage);

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'about.html'))
});
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'contact.html'))
});
app.get('/profile', (req, res) => {
    let myname = req.query.name || "Guest";
    let myage = req.query.age || "unknown";
    res.sendFile(path.join(__dirname, 'pages', 'profile.html'))
});
app.get('/myinfo/:name/:age', (req, res) => {
    let myname = req.params.name || "Guest";
    let myage = req.params.age || "unknown";
    res.sendFile(path.join(__dirname, 'pages', 'myinfo.html'))
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});