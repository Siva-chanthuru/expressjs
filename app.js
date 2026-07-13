const express = require('express');
const path = require('path');
const methodoverride = require('method-override');
const app = express();
const port = 5000;
app.use(methodoverride('_method'));
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
app.get("/download", (req, res) => {

    res.download(path.join(__dirname, 'files', 'Doc.docx'), 'chanthuru.docx', (err) => {
        if (err) {
            console.log(err);
            res.status(404).send("Error downloading the file");
        } else {
            console.log("File downloaded successfully");
        res.end();      
        }   
    });
});
app.put('/submit', (req, res) => {
    let fname = req.body.fname || "Guest";
    let lname = req.body.lname || "unknown";
  
    res.send(`Form submitted successfully for ${fname} ${lname}`);
});



app.get('/student', (req, res) => {
 
// res.send("show student details");
});
app.get('/student', (req, res) => {
    res.send("show student details"); 
});
app.get('/student/:id', (req, res) => {
    let studentId = req.params.id;
    res.send(`show student details for student with ID: ${studentId}`);
});
app.post('/student', (req, res) => {
    res.send("create a new student");
});
app.put('/student/:id', (req, res) => {
    let studentId = req.params.id;
    res.send(`update student details for student with ID: ${studentId}`);
});
app.delete('/student/:id', (req, res) => {
    let studentId = req.params.id;
    res.send(`delete student with ID: ${studentId}`);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});