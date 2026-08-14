const express = require('express');
const layout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const db = require('./config/db.js');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(layout);
app.set('layout', 'layouts/main');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride("_method"));

app.use('/student', require('./routes/student.js'));
app.use('/grade', require('./routes/grade.js'));
app.use('/teachers', require('./routes/teachers.js'));
app.use('/subjects', require('./routes/subjects.js'));
app.use('/houses', require('./routes/houses.js'));
app.use('/families', require('./routes/families.js'));

app.get('/', (req, res) => {
    res.render('index', { title: 'home', message: 'Hello there!' });
});











// Grade routes



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});