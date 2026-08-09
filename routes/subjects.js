const express = require('express');
const methodoverride = require('method-override');
const db = require('../config/db.js');
const router = express.Router();

router.delete('/:id', (req, res) => {
    const subjectId = req.params.id;

    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('DELETE FROM subjects WHERE id = ?', [subjectId], (err, results) => {
                if (err) {
                    res.send('Error executing query!' + err);
                } else {
                    res.redirect('/subjects');
                }
            });
        }
    });
});


router.get('/', (req, res) => {
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('SELECT * FROM subjects order by id  desc limit 10 ', (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                } else {
                    console.log(results);
                    res.render('subjects/index', { title: 'Subjects Page', message: 'Welcome to the subjects page!', subjects: results });
                }
            });
        }
    });

});


router.get('/:id/show', (req, res) => {
    const subjectId = req.params.id;
    if (!subjectId) {
        res.status(400).send('Subject ID is required');
        return;
    }
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('SELECT * FROM subjects WHERE id = ?', [subjectId], (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                }
                else if (results.length === 0) {
                    res.status(404).render('subjects/not_found', { title: 'Subject not found', message: 'The requested subject was not found.' });
                }
                else {
                    console.log(results);
                    res.render('subjects/show', { title: 'Subject show Page', message: `Welcome to the subject page for subject ID: ${subjectId}`, subject: results[0] });
                }
            });
        }
    });
});


router.get('/:id/edit', (req, res) => {
    const subjectId = req.params.id;

    if (!subjectId) {
        res.status(400).send('Subject ID is required');
        return;
    }

    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('SELECT * FROM subjects WHERE id = ?', [subjectId], (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                } else if (results.length === 0) {
                    res.status(404).render('subjects/not_found', { title: 'Subject not found', message: 'The requested subject was not found.' });
                } else {
                    res.render('subjects/edit', { title: 'Edit Subject ' + results[0].subject_name, subject: results[0] });
                }
            });
        }
    });
});


router.put('/:id', (req, res) => {
    const subjectId = req.params.id;
    const { subject_name, subject_index, subject_order, subject_number, colour } = req.body;

    if (!subject_name || !subject_index || !subject_order || !subject_number || !colour) {
        res.status(400).send('All fields are required');
        return;
    }

    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('UPDATE subjects SET subject_name = ?, subject_index = ?, subject_order = ?, subject_number = ?, colour = ? WHERE id = ?', [subject_name, subject_index, subject_order, subject_number, colour, subjectId], (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                } else {
                    res.redirect('/subjects');
                }
            });
        }
    });
});


router.get('/create', (req, res) => {
    res.render('subjects/create', { title: 'Subject Create Page', message: 'Welcome to the subject create page!' });
});

router.post('/', (req, res) => {
    // res.send('Received data: ' + JSON.stringify(req.body));
    const { subject_name, subject_index, subject_order, subject_number, colour } = req.body;

    // res.send(`Received data: Subject Name - ${subject_name}, Subject Index - ${subject_index}, Subject Order - ${subject_order}, Subject Number - ${subject_number}, Colour - ${colour}`);
    if (!subject_name || !subject_index || !subject_order || !subject_number || !colour) {
        res.status(400).send('All fields are required');
        return;
    }


    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {

            db.query('INSERT INTO subjects (subject_name, subject_index, subject_order, subject_number, colour) VALUES (?, ?, ?, ?, ?)', [subject_name, subject_index, subject_order, subject_number, colour], (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                } else {
                    res.redirect('/subjects');
                }
            });
        }
    });
});


module.exports = router;